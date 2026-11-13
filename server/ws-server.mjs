import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import sirv from 'sirv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'quizzes.json');
const DIST_DIR = path.join(__dirname, '..', 'dist');

const PORT = Number(process.env.PORT || process.env.WS_PORT || 3001);

// Static file handler for Astro production build
const staticHandler = fs.existsSync(DIST_DIR) 
  ? sirv(DIST_DIR, { dev: process.env.NODE_ENV !== 'production', single: true, etag: true })
  : null;

// Helper to read quizzes from disk
function loadQuizzes() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('[WS-SERVER] Error reading quizzes.json:', err);
  }
  return [];
}

// Helper to save quizzes to disk
function saveQuizzes(quizzes) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(quizzes, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[WS-SERVER] Error saving quizzes.json:', err);
    return false;
  }
}

// In-memory cache of quizzes synced with disk
let quizzes = loadQuizzes();

// HTTP server for REST API endpoints + CORS
const httpServer = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // GET /api/quizzes
  if (url.pathname === '/api/quizzes' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(quizzes));
    return;
  }

  // POST /api/quizzes (Create or Update)
  if (url.pathname === '/api/quizzes' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const quizData = JSON.parse(body);
        if (!quizData.title || !Array.isArray(quizData.questions)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Data kuis tidak valid: title dan questions diperlukan' }));
          return;
        }

        // If no ID or existing ID
        if (!quizData.id) {
          quizData.id = 'quiz_' + Date.now();
        }

        const existingIdx = quizzes.findIndex(q => q.id === quizData.id);
        if (existingIdx >= 0) {
          quizzes[existingIdx] = quizData;
        } else {
          quizzes.push(quizData);
        }

        saveQuizzes(quizzes);
        broadcastQuizListUpdate();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, quiz: quizData }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Format JSON tidak valid' }));
      }
    });
    return;
  }

  // DELETE /api/quizzes/:id
  if (url.pathname.startsWith('/api/quizzes/') && req.method === 'DELETE') {
    const id = url.pathname.replace('/api/quizzes/', '').trim();
    if (quizzes.length <= 1) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Tidak bisa menghapus kuis terakhir. Minimal harus ada 1 kuis tersisa.' }));
      return;
    }

    const beforeLength = quizzes.length;
    quizzes = quizzes.filter(q => q.id !== id);
    if (quizzes.length < beforeLength) {
      saveQuizzes(quizzes);
      broadcastQuizListUpdate();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Kuis berhasil dihapus' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Kuis tidak ditemukan' }));
    }
    return;
  }

  // Static file serving fallback for production (Render / single-server)
  if (staticHandler) {
    staticHandler(req, res);
    return;
  }

  // Default fallback if dist/ not built
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', server: 'AstroQuiz WS & HTTP API' }));
});

// Attach WebSocketServer to the same HTTP server
const wss = new WebSocketServer({ server: httpServer });

// Active Rooms
// code -> Room
const rooms = new Map();

function generateRoomCode() {
  let code = '';
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
  } while (rooms.has(code));
  return code;
}

function safeSend(ws, payload) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

function broadcastToRoom(room, payload, excludeWs = null) {
  if (room.hostWs && room.hostWs !== excludeWs) {
    safeSend(room.hostWs, payload);
  }
  for (const player of room.players.values()) {
    if (player.ws && player.ws !== excludeWs) {
      safeSend(player.ws, payload);
    }
  }
}

function broadcastQuizListUpdate() {
  const quizSummary = quizzes.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    category: q.category || 'Umum',
    questionCount: q.questions.length
  }));
  wss.clients.forEach(client => {
    safeSend(client, {
      type: 'QUIZ_LIST',
      quizzes: quizSummary
    });
  });
}

const TEAM_META = {
  red: { id: 'red', name: 'Skuad Naga Merah', icon: '🔥', colorHex: '#ef4444' },
  blue: { id: 'blue', name: 'Skuad Hiu Biru', icon: '🌊', colorHex: '#3b82f6' },
  green: { id: 'green', name: 'Skuad Rimba Hijau', icon: '🌿', colorHex: '#10b981' },
  gold: { id: 'gold', name: 'Skuad Petir Emas', icon: '⚡', colorHex: '#eab308' },
};

function pickBalancedTeam(room) {
  const counts = { red: 0, blue: 0, green: 0, gold: 0 };
  for (const p of room.players.values()) {
    if (p.teamId && counts[p.teamId] !== undefined) {
      counts[p.teamId]++;
    }
  }
  const sorted = Object.keys(counts).sort((a, b) => counts[a] - counts[b]);
  return sorted[0] || 'red';
}

function getTeamStandings(room) {
  const map = {
    red: { ...TEAM_META.red, totalScore: 0, avgScore: 0, memberCount: 0 },
    blue: { ...TEAM_META.blue, totalScore: 0, avgScore: 0, memberCount: 0 },
    green: { ...TEAM_META.green, totalScore: 0, avgScore: 0, memberCount: 0 },
    gold: { ...TEAM_META.gold, totalScore: 0, avgScore: 0, memberCount: 0 },
  };

  for (const p of room.players.values()) {
    const tid = p.teamId && map[p.teamId] ? p.teamId : 'red';
    map[tid].totalScore += p.score || 0;
    map[tid].memberCount += 1;
  }

  const arr = Object.values(map).map((t) => ({
    ...t,
    avgScore: t.memberCount > 0 ? Math.round(t.totalScore / t.memberCount) : 0,
  }));

  arr.sort((a, b) => b.totalScore - a.totalScore || b.memberCount - a.memberCount);
  return arr.map((t, idx) => ({ ...t, rank: idx + 1 }));
}

function getPlayerList(room) {
  const list = [];
  const totalQ = room.quiz && Array.isArray(room.quiz.questions) ? room.quiz.questions.length : 5;
  for (const p of room.players.values()) {
    const avgAnswerTimeMs = p.answeredQuestionsCount > 0
      ? Math.round(p.totalAnswerTimeMs / p.answeredQuestionsCount)
      : 0;
    list.push({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      teamId: p.teamId || 'red',
      score: p.score,
      streak: p.streak,
      maxStreak: p.maxStreak || p.streak || 0,
      correctCount: p.correctCount || 0,
      avgAnswerTimeMs,
      bombPasses: p.bombPasses || 0,
      survivedRounds: p.survivedRounds || 0,
      totalQuestions: totalQ,
      answeredCurrent: p.currentAnswer !== null,
      x: typeof p.x === 'number' ? p.x : 0,
      z: typeof p.z === 'number' ? p.z : 0,
      jumping: !!p.jumping,
      currentAnswer: p.currentAnswer
    });
  }
  list.sort((a, b) => b.score - a.score);
  return list.map((p, idx) => ({ ...p, rank: idx + 1 }));
}

function computePostGameAwards(room, leaderboard) {
  if (!Array.isArray(leaderboard) || leaderboard.length === 0) return [];
  const awards = [];
  const totalQ = room.quiz && Array.isArray(room.quiz.questions) ? room.quiz.questions.length : 5;

  // 1. Si Kilat (Fastest Responder among players with at least 1 correct answer, or lowest avg time)
  const withTime = leaderboard.filter(p => (p.avgAnswerTimeMs || 0) > 0 && (p.correctCount || 0) > 0);
  const fastestPool = withTime.length > 0 ? withTime : leaderboard.filter(p => (p.avgAnswerTimeMs || 0) > 0);
  if (fastestPool.length > 0) {
    const fastest = [...fastestPool].sort((a, b) => a.avgAnswerTimeMs - b.avgAnswerTimeMs)[0];
    const secStr = (fastest.avgAnswerTimeMs / 1000).toFixed(1) + ' detik';
    awards.push({
      id: 'speedster',
      title: 'Si Kilat Arena',
      icon: '⚡',
      playerId: fastest.id,
      playerName: fastest.name,
      playerAvatar: fastest.avatar,
      statLabel: `Rata-rata ${secStr}`,
      description: 'Refleks tercepat dalam mengunci petak jawaban!'
    });
  } else {
    const top = leaderboard[0];
    awards.push({
      id: 'speedster',
      title: 'Si Kilat Arena',
      icon: '⚡',
      playerId: top.id,
      playerName: top.name,
      playerAvatar: top.avatar,
      statLabel: `${top.score} pts`,
      description: 'Penguasa kecepatan dan ketepatan di arena!'
    });
  }

  // 2. Unstoppable Streak (Highest maxStreak)
  const streakSorted = [...leaderboard].sort((a, b) => (b.maxStreak || 0) - (a.maxStreak || 0) || b.score - a.score);
  const topStrept = streakSorted[0];
  awards.push({
    id: 'streak_king',
    title: 'Unstoppable Streak',
    icon: '🔥',
    playerId: topStrept.id,
    playerName: topStrept.name,
    playerAvatar: topStrept.avatar,
    statLabel: `${topStrept.maxStreak || 0}x Beruntun`,
    description: 'Rekor kombo jawaban benar berturut-turut terpanjang!'
  });

  // 3. Sniper Akurat (Highest Accuracy %)
  const accSorted = [...leaderboard].sort((a, b) => (b.correctCount || 0) - (a.correctCount || 0) || b.score - a.score);
  const topAcc = accSorted[0];
  const accPct = totalQ > 0 ? Math.round(((topAcc.correctCount || 0) / totalQ) * 100) : 100;
  awards.push({
    id: 'sniper',
    title: 'Sniper Akurat',
    icon: '🎯',
    playerId: topAcc.id,
    playerName: topAcc.name,
    playerAvatar: topAcc.avatar,
    statLabel: `${topAcc.correctCount || 0}/${totalQ} Benar (${accPct}%)`,
    description: 'Ketepatan memilih petak jawaban paling presisi!'
  });

  // 4. Penjinak Bom Terbaik (in bomb_tag) or Survivor Tangguh
  if (room.gameMode === 'bomb_tag') {
    const bombSorted = [...leaderboard].sort((a, b) => (b.bombPasses || 0) - (a.bombPasses || 0) || (b.survivedRounds || 0) - (a.survivedRounds || 0));
    const topBomb = bombSorted[0];
    awards.push({
      id: 'bomb_master',
      title: 'Penjinak Bom Terbaik',
      icon: '💣',
      playerId: topBomb.id,
      playerName: topBomb.name,
      playerAvatar: topBomb.avatar,
      statLabel: topBomb.bombPasses > 0 ? `${topBomb.bombPasses}x Oper Bom` : `${topBomb.survivedRounds || 0} Ronde Selamat`,
      description: 'Paling lincah mengoper bom dan selamat dari ledakan!'
    });
  } else {
    const survSorted = [...leaderboard].sort((a, b) => (b.survivedRounds || 0) - (a.survivedRounds || 0) || b.score - a.score);
    const topSurv = survSorted[0];
    awards.push({
      id: 'survivor',
      title: 'Survivor Tangguh',
      icon: '🛡️',
      playerId: topSurv.id,
      playerName: topSurv.name,
      playerAvatar: topSurv.avatar,
      statLabel: `${topSurv.survivedRounds || 0}/${totalQ} Ronde Selamat`,
      description: 'Bertahan paling kokoh tanpa jatuh dari arena 3D!'
    });
  }

  return awards;
}

function broadcastPlayersPositions(room) {
  const positions = [];
  for (const p of room.players.values()) {
    positions.push({
      id: p.id,
      x: typeof p.x === 'number' ? p.x : 0,
      z: typeof p.z === 'number' ? p.z : 0,
      jumping: !!p.jumping,
      currentAnswer: p.currentAnswer
    });
  }
  broadcastToRoom(room, {
    type: 'PLAYERS_POSITIONS',
    positions
  });
}

function passBombToNext(room, fromPlayer, reason) {
  let targetId = 'bot_target';
  let toName = '🤖 RoboTarget';

  const allOthers = Array.from(room.players.values()).filter(p => p.id !== fromPlayer.id);
  // In teamMode, prioritize passing the bomb to opposing team members!
  const enemyOthers = room.teamMode
    ? allOthers.filter(p => p.teamId !== fromPlayer.teamId)
    : allOthers;
  const otherPlayers = enemyOthers.length > 0 ? enemyOthers : allOthers;

  if (otherPlayers.length > 0) {
    const uncommitted = otherPlayers.filter(p => p.currentAnswer === null);
    const chosen = uncommitted.length > 0
      ? uncommitted[Math.floor(Math.random() * uncommitted.length)]
      : otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
    targetId = chosen.id;
    toName = chosen.name;
  }

  room.bombHolderId = targetId;
  room.lastBombPassTime = Date.now();
  fromPlayer.bombPasses = (fromPlayer.bombPasses || 0) + 1;

  broadcastToRoom(room, {
    type: 'BOMB_PASSED',
    bombHolderId: room.bombHolderId,
    fromName: fromPlayer.name,
    toName,
    reason
  });
  console.log(`[WS] Bomb passed in room ${room.code}: ${fromPlayer.name} -> ${toName} (${reason})`);
}

function endCurrentQuestion(room) {
  if (room.timer) {
    clearInterval(room.timer);
    room.timer = null;
  }
  room.phase = 'REVIEW';

  const q = room.quiz.questions[room.currentQuestionIndex];
  const optionCounts = [0, 0, 0, 0];
  let totalAnswers = 0;
  const isBombTag = room.gameMode === 'bomb_tag';

  for (const player of room.players.values()) {
    const isCorrect = player.currentAnswer === q.correctIndex;
    const isBombHolder = isBombTag && player.id === room.bombHolderId;
    let earned = 0;

    if (player.answerTimeMs !== null && typeof player.answerTimeMs === 'number') {
      player.totalAnswerTimeMs = (player.totalAnswerTimeMs || 0) + Math.max(100, player.answerTimeMs);
      player.answeredQuestionsCount = (player.answeredQuestionsCount || 0) + 1;
    }

    if (isBombHolder) {
      // KABOOM! Pemegang bom saat waktu habis meledak!
      earned = 0;
      player.streak = 0;
      player.lastExploded = true;
    } else if (isCorrect) {
      player.streak = (player.streak || 0) + 1;
      player.maxStreak = Math.max(player.maxStreak || 0, player.streak);
      player.correctCount = (player.correctCount || 0) + 1;
      player.survivedRounds = (player.survivedRounds || 0) + 1;
      const timeLimitMs = (q.timeLimit || 15) * 1000;
      const timeSpent = Math.min(player.answerTimeMs || timeLimitMs, timeLimitMs);
      const speedRatio = Math.max(0, 1 - (timeSpent / timeLimitMs));
      earned = Math.round(500 + (500 * speedRatio) + (Math.min(player.streak, 5) * 50));
      
      // Bomb Survivor Bonus jika selamat tanpa bom!
      if (isBombTag) {
        earned += 300;
      }

      if (player.activeDoublePoints) {
        earned = earned * 2;
      }
      player.score += earned;
      player.lastExploded = false;
    } else {
      player.streak = 0;
      player.lastExploded = false;
      if (isBombTag) {
        player.survivedRounds = (player.survivedRounds || 0) + 1;
      }
    }

    if (player.currentAnswer !== null && player.currentAnswer >= 0 && player.currentAnswer < 4) {
      optionCounts[player.currentAnswer]++;
      totalAnswers++;
    }

    player.lastEarned = earned;
    player.lastCorrect = isCorrect;
  }

  const leaderboard = getPlayerList(room);

  for (const player of room.players.values()) {
    const rankInfo = leaderboard.find(l => l.id === player.id);
    safeSend(player.ws, {
      type: 'PLAYER_RESULT',
      isCorrect: player.lastCorrect,
      pointsEarned: player.lastEarned,
      totalScore: player.score,
      streak: player.streak,
      rank: rankInfo ? rankInfo.rank : 1,
      correctIndex: q.correctIndex,
      exploded: !!player.lastExploded
    });
  }

  broadcastToRoom(room, {
    type: 'QUESTION_END',
    correctIndex: q.correctIndex,
    explanation: q.explanation || '',
    explodedPlayerId: isBombTag ? room.bombHolderId : null,
    stats: {
      optionCounts,
      totalAnswers
    },
    leaderboard,
    teamStandings: getTeamStandings(room)
  });
}

function startQuestion(room, index) {
  room.currentQuestionIndex = index;
  room.phase = 'QUESTION';

  const q = room.quiz.questions[index];
  const timeLimit = q.timeLimit || 15;
  room.timeLeft = timeLimit;
  room.questionStartTime = Date.now();

  // Initialize Bomb Holder for Bomb Tag Mode
  if (room.gameMode === 'bomb_tag') {
    const pArray = Array.from(room.players.values());
    if (pArray.length > 0) {
      const luckyPlayer = pArray[Math.floor(Math.random() * pArray.length)];
      room.bombHolderId = luckyPlayer.id;
    } else {
      room.bombHolderId = 'bot_target';
    }
    room.lastBombPassTime = Date.now();
  } else {
    room.bombHolderId = null;
  }

  for (const p of room.players.values()) {
    p.currentAnswer = null;
    p.answerTimeMs = null;
    p.activeDoublePoints = false;
    p.lastExploded = false;
    if (room.gameMode === 'glass_bridge') {
      p.x = (Math.random() - 0.5) * 4;
      p.z = 7.2;
    } else if (room.gameMode === 'bomb_tag') {
      p.x = (Math.random() - 0.5) * 6;
      p.z = (Math.random() - 0.5) * 6;
    } else {
      p.x = (Math.random() - 0.5) * 2;
      p.z = (Math.random() - 0.5) * 2;
    }
    p.jumping = false;
  }

  safeSend(room.hostWs, {
    type: 'QUESTION_START',
    questionIndex: index,
    totalQuestions: room.quiz.questions.length,
    bombHolderId: room.bombHolderId,
    question: {
      id: q.id,
      text: q.text,
      options: q.options,
      correctIndex: q.correctIndex,
      timeLimit
    }
  });

  for (const p of room.players.values()) {
    safeSend(p.ws, {
      type: 'QUESTION_START',
      questionIndex: index,
      totalQuestions: room.quiz.questions.length,
      bombHolderId: room.bombHolderId,
      question: {
        id: q.id,
        text: q.text,
        options: q.options,
        timeLimit
      }
    });
  }

  if (room.timer) clearInterval(room.timer);
  room.timer = setInterval(() => {
    room.timeLeft--;

    broadcastToRoom(room, {
      type: 'TIME_TICK',
      timeLeft: room.timeLeft
    });

    if (room.timeLeft <= 0) {
      endCurrentQuestion(room);
    }
  }, 1000);
}

wss.on('connection', (ws) => {
  let boundRoom = null;
  let boundPlayerId = null;
  let isHost = false;

  ws.on('message', (messageRaw) => {
    try {
      const data = JSON.parse(messageRaw.toString());

      switch (data.type) {
        case 'GET_QUIZZES': {
          safeSend(ws, {
            type: 'QUIZ_LIST',
            quizzes: quizzes.map(q => ({
              id: q.id,
              title: q.title,
              description: q.description,
              category: q.category || 'Umum',
              questionCount: q.questions.length
            }))
          });
          break;
        }

        case 'CREATE_ROOM': {
          // Find quiz in disk/memory quizzes
          const selectedQuiz = quizzes.find(q => q.id === data.quizId) || quizzes[0];
          const code = generateRoomCode();
          const gameMode = ['bomb_tag', 'glass_bridge', 'lava_tiles', 'classic'].includes(data.gameMode) ? data.gameMode : 'bomb_tag';
          const validThemes = ['arcade', 'pirate', 'space', 'castle'];
          const worldTheme = validThemes.includes(data.worldTheme) ? data.worldTheme : 'arcade';
          const teamMode = !!data.teamMode;
          
          const room = {
            code,
            hostWs: ws,
            quiz: selectedQuiz,
            gameMode,
            worldTheme,
            teamMode,
            bombHolderId: null,
            lastBombPassTime: 0,
            phase: 'LOBBY',
            currentQuestionIndex: 0,
            timer: null,
            timeLeft: 15,
            questionStartTime: 0,
            players: new Map()
          };

          rooms.set(code, room);
          boundRoom = room;
          isHost = true;

          safeSend(ws, {
            type: 'ROOM_CREATED',
            code,
            gameMode: room.gameMode,
            worldTheme: room.worldTheme,
            teamMode: room.teamMode,
            quiz: {
              id: selectedQuiz.id,
              title: selectedQuiz.title,
              description: selectedQuiz.description,
              questionCount: selectedQuiz.questions.length
            }
          });
          console.log(`[WS] Room created: ${code} (Mode: ${room.gameMode}, Theme: ${room.worldTheme}) with quiz "${selectedQuiz.title}"`);
          break;
        }

        case 'JOIN_ROOM': {
          const code = String(data.code || '').trim();
          const name = String(data.name || '').trim().slice(0, 15) || 'Pemain';
          const avatar = data.avatar || '🦊';

          const room = rooms.get(code);
          if (!room) {
            safeSend(ws, { type: 'ERROR', message: `Room dengan PIN ${code} tidak ditemukan.` });
            return;
          }

          if (room.phase !== 'LOBBY') {
            safeSend(ws, { type: 'ERROR', message: 'Permainan di room ini sudah dimulai!' });
            return;
          }

          const playerId = 'p_' + Math.random().toString(36).substring(2, 9);
          let spawnX = (Math.random() - 0.5) * 2;
          let spawnZ = (Math.random() - 0.5) * 2;
          if (room.gameMode === 'glass_bridge') {
            spawnX = (Math.random() - 0.5) * 4;
            spawnZ = 7.2;
          } else if (room.gameMode === 'bomb_tag') {
            spawnX = (Math.random() - 0.5) * 6;
            spawnZ = (Math.random() - 0.5) * 6;
          }

          const validTeamIds = ['red', 'blue', 'green', 'gold'];
          const chosenTeamId = validTeamIds.includes(data.teamId) ? data.teamId : pickBalancedTeam(room);

          const newPlayer = {
            id: playerId,
            name,
            avatar,
            teamId: chosenTeamId,
            ws,
            score: 0,
            streak: 0,
            maxStreak: 0,
            correctCount: 0,
            totalAnswerTimeMs: 0,
            answeredQuestionsCount: 0,
            bombPasses: 0,
            survivedRounds: 0,
            currentAnswer: null,
            answerTimeMs: null,
            lastReactionTime: 0,
            x: spawnX,
            z: spawnZ,
            jumping: false,
            powerups: { fiftyFifty: true, doublePoints: true },
            activeDoublePoints: false
          };

          room.players.set(playerId, newPlayer);
          boundRoom = room;
          boundPlayerId = playerId;

          safeSend(ws, {
            type: 'ROOM_JOINED',
            playerId,
            code,
            name,
            teamId: chosenTeamId,
            teamMode: !!room.teamMode,
            gameMode: room.gameMode,
            worldTheme: room.worldTheme,
            quizTitle: room.quiz.title,
            questionCount: room.quiz.questions.length
          });

          const players = getPlayerList(room);
          broadcastToRoom(room, {
            type: 'PLAYER_LIST_UPDATE',
            players,
            teamStandings: getTeamStandings(room)
          });

          console.log(`[WS] Player ${name} joined room ${code} (Mode: ${room.gameMode}, Theme: ${room.worldTheme})`);
          break;
        }

        case 'SET_GAME_MODE': {
          if (!isHost || !boundRoom) return;
          const mode = data.gameMode;
          if (['bomb_tag', 'glass_bridge', 'lava_tiles', 'classic'].includes(mode)) {
            boundRoom.gameMode = mode;
            // Reposition players in lobby according to selected mode
            for (const p of boundRoom.players.values()) {
              if (mode === 'glass_bridge') {
                p.x = (Math.random() - 0.5) * 4;
                p.z = 7.2;
              } else if (mode === 'bomb_tag') {
                p.x = (Math.random() - 0.5) * 6;
                p.z = (Math.random() - 0.5) * 6;
              } else {
                p.x = (Math.random() - 0.5) * 2;
                p.z = (Math.random() - 0.5) * 2;
              }
            }
            broadcastToRoom(boundRoom, {
              type: 'GAME_MODE_UPDATED',
              gameMode: boundRoom.gameMode
            });
            broadcastPlayersPositions(boundRoom);
            console.log(`[WS] Room ${boundRoom.code} gameMode changed to ${mode}`);
          }
          break;
        }

        case 'SET_WORLD_THEME': {
          if (!isHost || !boundRoom) return;
          const theme = data.worldTheme;
          if (['arcade', 'pirate', 'space', 'castle'].includes(theme)) {
            boundRoom.worldTheme = theme;
            broadcastToRoom(boundRoom, {
              type: 'WORLD_THEME_UPDATED',
              worldTheme: boundRoom.worldTheme
            });
            console.log(`[WS] Room ${boundRoom.code} worldTheme changed to ${theme}`);
          }
          break;
        }

        case 'SET_TEAM_MODE': {
          if (!isHost || !boundRoom) return;
          boundRoom.teamMode = !!data.teamMode;
          broadcastToRoom(boundRoom, {
            type: 'TEAM_MODE_UPDATED',
            teamMode: boundRoom.teamMode,
            players: getPlayerList(boundRoom),
            teamStandings: getTeamStandings(boundRoom)
          });
          console.log(`[WS] Room ${boundRoom.code} teamMode changed to ${boundRoom.teamMode}`);
          break;
        }

        case 'CHANGE_TEAM': {
          if (!boundRoom || !boundPlayerId) return;
          const validTeamIds = ['red', 'blue', 'green', 'gold'];
          if (!validTeamIds.includes(data.teamId)) return;
          const player = boundRoom.players.get(boundPlayerId);
          if (!player) return;
          player.teamId = data.teamId;
          broadcastToRoom(boundRoom, {
            type: 'PLAYER_LIST_UPDATE',
            players: getPlayerList(boundRoom),
            teamStandings: getTeamStandings(boundRoom)
          });
          break;
        }

        case 'START_GAME': {
          if (!isHost || !boundRoom) return;
          const room = boundRoom;
          if (room.phase !== 'LOBBY') return;

          room.phase = 'COUNTDOWN';
          let count = 3;

          broadcastToRoom(room, {
            type: 'COUNTDOWN_TICK',
            count
          });

          const countTimer = setInterval(() => {
            count--;
            if (count > 0) {
              broadcastToRoom(room, {
                type: 'COUNTDOWN_TICK',
                count
              });
            } else {
              clearInterval(countTimer);
              startQuestion(room, 0);
            }
          }, 1000);

          break;
        }

        case 'SUBMIT_ANSWER': {
          if (!boundRoom || !boundPlayerId) return;
          const room = boundRoom;
          if (room.phase !== 'QUESTION') return;

          const player = room.players.get(boundPlayerId);
          if (!player) return;

          const answerIndex = Number(data.answerIndex);
          player.currentAnswer = answerIndex;
          player.answerTimeMs = Date.now() - room.questionStartTime;

          if (room.gameMode === 'glass_bridge') {
            // Map answer index to 4 glass bridge lanes at z = 0
            const glassLanes = [-7.2, -2.4, 2.4, 7.2];
            if (glassLanes[answerIndex] !== undefined) {
              player.x = glassLanes[answerIndex] + (Math.random() - 0.5) * 0.8;
              player.z = 0 + (Math.random() - 0.5) * 0.8;
            }
          } else if (room.gameMode === 'bomb_tag') {
            // Map answer index to 4 corner pads:
            // 0: ▲ Merah (-7.5, -7.5)
            // 1: ◆ Biru (7.5, -7.5)
            // 2: ● Kuning (-7.5, 7.5)
            // 3: ■ Hijau (7.5, 7.5)
            const bombPads = [
              { x: -7.5, z: -7.5 },
              { x: 7.5, z: -7.5 },
              { x: -7.5, z: 7.5 },
              { x: 7.5, z: 7.5 }
            ];
            if (bombPads[answerIndex]) {
              player.x = bombPads[answerIndex].x + (Math.random() - 0.5) * 1.5;
              player.z = bombPads[answerIndex].z + (Math.random() - 0.5) * 1.5;
            }
            // Check if player is holding the bomb and answered correctly!
            const q = room.quiz.questions[room.currentQuestionIndex];
            if (player.id === room.bombHolderId && answerIndex === q.correctIndex) {
              passBombToNext(room, player, 'correct_answer');
            }
          } else {
            // Map answer index to Roblox 3D color quadrant coords (lava tiles)
            const quadrantCenters = [
              { x: -6, z: -6 }, // 0: ▲ Merah
              { x: 6, z: -6 },  // 1: ◆ Biru
              { x: -6, z: 6 },  // 2: ● Kuning
              { x: 6, z: 6 }    // 3: ■ Hijau
            ];
            if (quadrantCenters[answerIndex]) {
              player.x = quadrantCenters[answerIndex].x + (Math.random() - 0.5) * 3;
              player.z = quadrantCenters[answerIndex].z + (Math.random() - 0.5) * 3;
            }
          }

          safeSend(ws, { type: 'ANSWER_ACK', answerIndex });

          const answeredCount = Array.from(room.players.values()).filter(p => p.currentAnswer !== null).length;
          safeSend(room.hostWs, {
            type: 'PLAYER_ANSWERED_UPDATE',
            answeredCount,
            totalPlayers: room.players.size
          });

          broadcastPlayersPositions(room);
          break;
        }

        case 'EXPLODE_BOMB_NOW':
        case 'FORCE_END_QUESTION':
        case 'SKIP_TIMER': {
          if (!isHost || !boundRoom) return;
          const room = boundRoom;
          if (room.phase === 'QUESTION') {
            endCurrentQuestion(room);
          }
          break;
        }

        case 'PLAYER_MOVE': {
          if (!boundRoom || !boundPlayerId) return;
          const room = boundRoom;
          const player = room.players.get(boundPlayerId);
          if (!player) return;

          const now = Date.now();
          if (typeof data.x === 'number') player.x = data.x;
          if (typeof data.z === 'number') player.z = data.z;
          if (typeof data.jumping === 'boolean') player.jumping = data.jumping;

          // If answerIndex is passed from walking into a color quadrant / corner pad
          if (room.phase === 'QUESTION') {
            if (typeof data.answerIndex === 'number' && data.answerIndex >= 0 && data.answerIndex <= 3) {
              if (player.currentAnswer !== data.answerIndex) {
                player.currentAnswer = data.answerIndex;
                player.answerTimeMs = Date.now() - room.questionStartTime;
                safeSend(ws, { type: 'ANSWER_ACK', answerIndex: data.answerIndex });

                const answeredCount = Array.from(room.players.values()).filter(p => p.currentAnswer !== null).length;
                safeSend(room.hostWs, {
                  type: 'PLAYER_ANSWERED_UPDATE',
                  answeredCount,
                  totalPlayers: room.players.size
                });

                if (room.gameMode === 'bomb_tag') {
                  const q = room.quiz.questions[room.currentQuestionIndex];
                  if (player.id === room.bombHolderId && data.answerIndex === q.correctIndex) {
                    passBombToNext(room, player, 'correct_answer');
                  }
                }
              }
            } else if (data.answerIndex === null && player.currentAnswer !== null) {
              // Stepped back to center pad
              player.currentAnswer = null;
              const answeredCount = Array.from(room.players.values()).filter(p => p.currentAnswer !== null).length;
              safeSend(room.hostWs, {
                type: 'PLAYER_ANSWERED_UPDATE',
                answeredCount,
                totalPlayers: room.players.size
              });
            }
          }

          // Bomb tag physical collision check
          if (room.gameMode === 'bomb_tag' && room.phase === 'QUESTION') {
            const timeSinceLastPass = now - (room.lastBombPassTime || 0);
            const qTime = (now - room.questionStartTime) / 1000;
            const botX = Math.sin(qTime * 1.5) * 3.5;
            const botZ = Math.cos(qTime * 1.5) * 3.5;

            if (timeSinceLastPass > 1800) {
              if (room.bombHolderId === player.id) {
                // Current player holds the bomb - check if touching another player or bot
                let passed = false;
                const allOthers = Array.from(room.players.values()).filter(o => o.id !== player.id);
                const hasEnemyInRoom = room.teamMode && allOthers.some(o => o.teamId !== player.teamId);

                for (const other of allOthers) {
                  // Protect teammates from accidental bomb tag if enemies exist in the room!
                  if (hasEnemyInRoom && other.teamId === player.teamId) continue;
                  const dist = Math.hypot(player.x - other.x, player.z - other.z);
                  if (dist < 1.8) {
                    passBombToNext(room, player, 'physical_tag');
                    passed = true;
                    break;
                  }
                }
                if (!passed) {
                  // Check distance to bot
                  const distToBot = Math.hypot(player.x - botX, player.z - botZ);
                  if (distToBot < 2.0) {
                    room.bombHolderId = 'bot_target';
                    room.lastBombPassTime = now;
                    player.bombPasses = (player.bombPasses || 0) + 1;
                    broadcastToRoom(room, {
                      type: 'BOMB_PASSED',
                      bombHolderId: 'bot_target',
                      fromName: player.name,
                      toName: '🤖 RoboTarget',
                      reason: 'physical_tag'
                    });
                    console.log(`[WS] Bomb tagged to RoboTarget in room ${room.code} by ${player.name}`);
                  }
                }
              } else if (room.bombHolderId === 'bot_target') {
                // Bot holds bomb - if player gets close to bot, bot tags player!
                const distToBot = Math.hypot(player.x - botX, player.z - botZ);
                if (distToBot < 2.0) {
                  room.bombHolderId = player.id;
                  room.lastBombPassTime = now;
                  broadcastToRoom(room, {
                    type: 'BOMB_PASSED',
                    bombHolderId: player.id,
                    fromName: '🤖 RoboTarget',
                    toName: player.name,
                    reason: 'bot_tag'
                  });
                  console.log(`[WS] RoboTarget tagged bomb to ${player.name} in room ${room.code}`);
                }
              }
            }
          }

          if (now - (player.lastMoveBroadcast || 0) >= 50) {
            player.lastMoveBroadcast = now;
            broadcastPlayersPositions(room);
          }
          break;
        }

        case 'NEXT_QUESTION': {
          if (!isHost || !boundRoom) return;
          const room = boundRoom;
          const nextIndex = room.currentQuestionIndex + 1;

          if (nextIndex < room.quiz.questions.length) {
            startQuestion(room, nextIndex);
          } else {
            room.phase = 'FINISHED';
            const finalLeaderboard = getPlayerList(room);
            const awards = computePostGameAwards(room, finalLeaderboard);
            broadcastToRoom(room, {
              type: 'GAME_OVER',
              finalPodium: finalLeaderboard,
              awards,
              teamStandings: getTeamStandings(room)
            });
          }
          break;
        }

        case 'RESTART_GAME': {
          if (!isHost || !boundRoom) return;
          const room = boundRoom;
          room.phase = 'LOBBY';
          room.currentQuestionIndex = 0;
          for (const p of room.players.values()) {
            p.score = 0;
            p.streak = 0;
            p.maxStreak = 0;
            p.correctCount = 0;
            p.totalAnswerTimeMs = 0;
            p.answeredQuestionsCount = 0;
            p.bombPasses = 0;
            p.survivedRounds = 0;
            p.currentAnswer = null;
            p.answerTimeMs = null;
            if (room.gameMode === 'glass_bridge') {
              p.x = (Math.random() - 0.5) * 4;
              p.z = 7.2;
            } else if (room.gameMode === 'bomb_tag') {
              p.x = (Math.random() - 0.5) * 6;
              p.z = (Math.random() - 0.5) * 6;
            } else {
              p.x = (Math.random() - 0.5) * 2;
              p.z = (Math.random() - 0.5) * 2;
            }
            p.jumping = false;
            p.powerups = { fiftyFifty: true, doublePoints: true };
            p.activeDoublePoints = false;
          }
          const players = getPlayerList(room);
          broadcastToRoom(room, {
            type: 'GAME_RESET',
            players,
            teamStandings: getTeamStandings(room)
          });
          break;
        }

        case 'SEND_REACTION': {
          if (!boundRoom) return;
          const room = boundRoom;

          let senderName = '';
          let senderAvatar = '';
          let lastTime = 0;

          if (isHost) {
            senderName = 'Host 🎯';
            senderAvatar = '👑';
            lastTime = room.lastHostReactionTime || 0;
          } else {
            if (!boundPlayerId) return;
            const player = room.players.get(boundPlayerId);
            if (!player) return;
            senderName = player.name;
            senderAvatar = player.avatar;
            lastTime = player.lastReactionTime || 0;
          }

          const allowedEmojis = ['❤️', '🔥', '🎉', '👏', '😱', '🚀'];
          const emoji = data.emoji;
          if (!emoji || !allowedEmojis.includes(emoji)) return;

          const now = Date.now();
          if (now - lastTime < 200) {
            return;
          }

          if (isHost) {
            room.lastHostReactionTime = now;
          } else {
            const player = room.players.get(boundPlayerId);
            if (player) player.lastReactionTime = now;
          }

          const reactionPayload = {
            type: 'EMOJI_REACTION',
            id: 'rx_' + Math.random().toString(36).substring(2, 9) + '_' + now,
            emoji,
            senderName,
            senderAvatar
          };

          broadcastToRoom(boundRoom, reactionPayload);
          break;
        }

        case 'USE_FIFTY_FIFTY': {
          if (!boundRoom || !boundPlayerId) return;
          const room = boundRoom;
          if (room.phase !== 'QUESTION') return;

          const player = room.players.get(boundPlayerId);
          if (!player || !player.powerups || !player.powerups.fiftyFifty) return;

          player.powerups.fiftyFifty = false;
          const q = room.quiz.questions[room.currentQuestionIndex];
          const correctIndex = q.correctIndex;
          const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);
          const shuffled = wrongIndices.sort(() => 0.5 - Math.random());
          const hiddenIndices = shuffled.slice(0, 2);

          safeSend(ws, {
            type: 'FIFTY_FIFTY_RESULT',
            hiddenIndices
          });

          broadcastToRoom(room, {
            type: 'POWERUP_USED',
            playerName: player.name,
            playerAvatar: player.avatar,
            powerupName: '50:50 ✂️'
          });
          break;
        }

        case 'USE_DOUBLE_POINTS': {
          if (!boundRoom || !boundPlayerId) return;
          const room = boundRoom;
          if (room.phase !== 'QUESTION') return;

          const player = room.players.get(boundPlayerId);
          if (!player || !player.powerups || !player.powerups.doublePoints) return;

          player.powerups.doublePoints = false;
          player.activeDoublePoints = true;

          safeSend(ws, {
            type: 'DOUBLE_POINTS_ACTIVE'
          });

          broadcastToRoom(room, {
            type: 'POWERUP_USED',
            playerName: player.name,
            playerAvatar: player.avatar,
            powerupName: '2x Points 🚀'
          });
          break;
        }
      }
    } catch (err) {
      console.error('[WS] Error processing message:', err);
    }
  });

  ws.on('close', () => {
    if (isHost && boundRoom) {
      console.log(`[WS] Host disconnected from room ${boundRoom.code}`);
      broadcastToRoom(boundRoom, {
        type: 'HOST_DISCONNECTED',
        message: 'Host kuis telah keluar dari permainan.'
      }, ws);
      if (boundRoom.timer) clearInterval(boundRoom.timer);
      rooms.delete(boundRoom.code);
    } else if (boundPlayerId && boundRoom) {
      const p = boundRoom.players.get(boundPlayerId);
      if (p) {
        console.log(`[WS] Player ${p.name} disconnected from room ${boundRoom.code}`);
        boundRoom.players.delete(boundPlayerId);
        broadcastToRoom(boundRoom, {
          type: 'PLAYER_LIST_UPDATE',
          players: getPlayerList(boundRoom)
        });
      }
    }
  });
});

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[WS-SERVER] Quiz Server (HTTP, WebSocket & Static) running on port ${PORT}`);
});
