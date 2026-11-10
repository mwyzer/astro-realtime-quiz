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

function getPlayerList(room) {
  const list = [];
  for (const p of room.players.values()) {
    list.push({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      score: p.score,
      streak: p.streak,
      answeredCurrent: p.currentAnswer !== null
    });
  }
  list.sort((a, b) => b.score - a.score);
  return list.map((p, idx) => ({ ...p, rank: idx + 1 }));
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

  for (const player of room.players.values()) {
    const isCorrect = player.currentAnswer === q.correctIndex;
    let earned = 0;

    if (isCorrect) {
      player.streak = (player.streak || 0) + 1;
      const timeLimitMs = (q.timeLimit || 15) * 1000;
      const timeSpent = Math.min(player.answerTimeMs || timeLimitMs, timeLimitMs);
      const speedRatio = Math.max(0, 1 - (timeSpent / timeLimitMs));
      earned = Math.round(500 + (500 * speedRatio) + (Math.min(player.streak, 5) * 50));
      player.score += earned;
    } else {
      player.streak = 0;
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
      correctIndex: q.correctIndex
    });
  }

  broadcastToRoom(room, {
    type: 'QUESTION_END',
    correctIndex: q.correctIndex,
    explanation: q.explanation || '',
    stats: {
      optionCounts,
      totalAnswers
    },
    leaderboard
  });
}

function startQuestion(room, index) {
  room.currentQuestionIndex = index;
  room.phase = 'QUESTION';

  const q = room.quiz.questions[index];
  const timeLimit = q.timeLimit || 15;
  room.timeLeft = timeLimit;
  room.questionStartTime = Date.now();

  for (const p of room.players.values()) {
    p.currentAnswer = null;
    p.answerTimeMs = null;
  }

  safeSend(room.hostWs, {
    type: 'QUESTION_START',
    questionIndex: index,
    totalQuestions: room.quiz.questions.length,
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
          
          const room = {
            code,
            hostWs: ws,
            quiz: selectedQuiz,
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
            quiz: {
              id: selectedQuiz.id,
              title: selectedQuiz.title,
              description: selectedQuiz.description,
              questionCount: selectedQuiz.questions.length
            }
          });
          console.log(`[WS] Room created: ${code} with quiz "${selectedQuiz.title}"`);
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
          const newPlayer = {
            id: playerId,
            name,
            avatar,
            ws,
            score: 0,
            streak: 0,
            currentAnswer: null,
            answerTimeMs: null
          };

          room.players.set(playerId, newPlayer);
          boundRoom = room;
          boundPlayerId = playerId;

          safeSend(ws, {
            type: 'ROOM_JOINED',
            playerId,
            code,
            name,
            quizTitle: room.quiz.title,
            questionCount: room.quiz.questions.length
          });

          const players = getPlayerList(room);
          broadcastToRoom(room, {
            type: 'PLAYER_LIST_UPDATE',
            players
          });

          console.log(`[WS] Player ${name} joined room ${code}`);
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
          if (!player || player.currentAnswer !== null) return;

          const answerIndex = Number(data.answerIndex);
          player.currentAnswer = answerIndex;
          player.answerTimeMs = Date.now() - room.questionStartTime;

          safeSend(ws, { type: 'ANSWER_ACK', answerIndex });

          const answeredCount = Array.from(room.players.values()).filter(p => p.currentAnswer !== null).length;
          safeSend(room.hostWs, {
            type: 'PLAYER_ANSWERED_UPDATE',
            answeredCount,
            totalPlayers: room.players.size
          });

          if (answeredCount >= room.players.size) {
            endCurrentQuestion(room);
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
            broadcastToRoom(room, {
              type: 'GAME_OVER',
              finalPodium: finalLeaderboard
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
            p.currentAnswer = null;
            p.answerTimeMs = null;
          }
          const players = getPlayerList(room);
          broadcastToRoom(room, {
            type: 'GAME_RESET',
            players
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
