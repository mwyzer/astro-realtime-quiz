import React, { useState, useEffect, useRef } from 'react';
import type { PlayerSummary, QuizQuestion, AnswerStats, GameMode, WorldTheme } from '../../types/quiz';
import { DEFAULT_QUIZZES } from '../../data/default-quizzes';
import { sound } from './SoundPlayer';
import confetti from 'canvas-confetti';
import RobloxArena3D from './RobloxArena3D';
import { 
  Users, Play, ArrowRight, Trophy, RotateCcw, 
  Copy, Check, Clock, Volume2, VolumeX, ShieldAlert,
  Radio, Zap
} from 'lucide-react';

const OPTION_THEMES = [
  { bg: 'bg-[#ef4444]', text: 'text-white', shape: '▲', label: 'Merah' },
  { bg: 'bg-[#2563eb]', text: 'text-white', shape: '◆', label: 'Biru' },
  { bg: 'bg-[#eab308]', text: 'text-slate-950', shape: '●', label: 'Kuning' },
  { bg: 'bg-[#10b981]', text: 'text-slate-950', shape: '■', label: 'Hijau' },
];

const REACTION_EMOJIS = ['❤️', '🔥', '🎉', '👏', '😱', '🚀'];

const QUIZ_THEME_RECOMMENDATIONS: Record<string, { theme: WorldTheme; label: string; icon: string }> = {
  'history-ocean-mystery': { theme: 'pirate', label: 'Tema Bajak Laut Hiu', icon: '🏝️' },
  'general-science': { theme: 'space', label: 'Tema Antariksa Kosmik', icon: '🚀' },
  'brain-teasers-logic': { theme: 'castle', label: 'Tema Kastil Kuno', icon: '🏰' },
  'pop-culture-gaming': { theme: 'arcade', label: 'Tema Arcade Toybox', icon: '🕹️' },
  'web-dev-trivia': { theme: 'arcade', label: 'Tema Arcade Toybox', icon: '🕹️' },
};

interface FloatingReaction {
  id: string;
  emoji: string;
  senderName: string;
  senderAvatar: string;
  left: number;
}

export default function HostRoom() {
  const [wsConnected, setWsConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Room config & phase
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [quizMeta, setQuizMeta] = useState<{ title: string; count: number }>({ title: '', count: 0 });
  const [phase, setPhase] = useState<'SELECT' | 'LOBBY' | 'COUNTDOWN' | 'QUESTION' | 'REVIEW' | 'FINISHED'>('SELECT');
  
  const [availableQuizzes, setAvailableQuizzes] = useState(
    DEFAULT_QUIZZES.map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      questionCount: q.questions.length
    }))
  );
  
  // Game state
  const [players, setPlayers] = useState<PlayerSummary[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [countdownNum, setCountdownNum] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState<(QuizQuestion & { questionIndex: number; totalQuestions: number }) | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answerStats, setAnswerStats] = useState<AnswerStats | null>(null);
  const [finalPodium, setFinalPodium] = useState<PlayerSummary[]>([]);
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>('bomb_tag');
  const [worldTheme, setWorldTheme] = useState<WorldTheme>('arcade');
  const [bombHolderId, setBombHolderId] = useState<string | null>(null);
  const [explodedPlayerId, setExplodedPlayerId] = useState<string | null>(null);
  const [bombToast, setBombToast] = useState<{ text: string; id: number } | null>(null);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const [powerupToast, setPowerupToast] = useState<{ text: string; id: number } | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const pendingCreateQuizIdRef = useRef<string | null>(null);

  const getWsUrl = () => {
    const isDevPort = typeof window !== 'undefined' && window.location.port === '4321';
    const wsProtocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return (import.meta as any).env?.PUBLIC_WS_URL || (
      isDevPort 
        ? `ws://${window.location.hostname}:3001` 
        : `${wsProtocol}//${window.location.host}`
    );
  };

  const connectWs = () => {
    if (typeof window === 'undefined') return null;
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return wsRef.current;
    }

    const ws = new WebSocket(getWsUrl());
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      setErrorMsg(null);
      ws.send(JSON.stringify({ type: 'GET_QUIZZES' }));
      if (pendingCreateQuizIdRef.current) {
        const pendingQuizId = pendingCreateQuizIdRef.current;
        pendingCreateQuizIdRef.current = null;
        let selectedTheme = worldTheme;
        if (worldTheme === 'arcade') {
          if (pendingQuizId === 'history-ocean-mystery') selectedTheme = 'pirate';
          else if (pendingQuizId === 'general-science') selectedTheme = 'space';
          else if (pendingQuizId === 'brain-teasers-logic') selectedTheme = 'castle';
        }
        ws.send(JSON.stringify({ type: 'CREATE_ROOM', quizId: pendingQuizId, gameMode, worldTheme: selectedTheme }));
      }
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    ws.onerror = () => {
      setWsConnected(false);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        handleServerMessage(msg);
      } catch (err) {
        console.error('Error parsing WS message:', err);
      }
    };

    return ws;
  };

  useEffect(() => {
    const isDevPort = typeof window !== 'undefined' && window.location.port === '4321';
    const apiUrl = isDevPort ? `http://${window.location.hostname}:3001/api/quizzes` : '/api/quizzes';

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAvailableQuizzes(data.map(q => ({
            id: q.id,
            title: q.title,
            description: q.description,
            questionCount: q.questions.length
          })));
        }
      })
      .catch(() => {});

    const ws = connectWs();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleServerMessage = (msg: any) => {
    switch (msg.type) {
      case 'QUIZ_LIST':
        setAvailableQuizzes(msg.quizzes || []);
        break;

      case 'ROOM_CREATED':
        setRoomCode(msg.code);
        setQuizMeta({ title: msg.quiz.title, count: msg.quiz.questionCount });
        if (msg.gameMode) setGameMode(msg.gameMode);
        if (msg.worldTheme) setWorldTheme(msg.worldTheme);
        setPhase('LOBBY');
        break;

      case 'GAME_MODE_UPDATED':
        if (msg.gameMode) setGameMode(msg.gameMode);
        sound.playPop();
        break;

      case 'WORLD_THEME_UPDATED':
        if (msg.worldTheme) setWorldTheme(msg.worldTheme);
        sound.playPop();
        break;

      case 'PLAYER_LIST_UPDATE':
        setPlayers(msg.players || []);
        sound.playPop();
        break;

      case 'PLAYER_ANSWERED_UPDATE':
        setAnsweredCount(msg.answeredCount || 0);
        sound.playPop();
        break;

      case 'PLAYERS_POSITIONS': {
        const posMap = new Map((msg.positions || []).map((p: any) => [p.id, p]));
        setPlayers(prev => prev.map(pl => {
          const pos = posMap.get(pl.id);
          if (pos) {
            return {
              ...pl,
              x: pos.x,
              z: pos.z,
              jumping: pos.jumping,
              currentAnswer: pos.currentAnswer
            };
          }
          return pl;
        }));
        break;
      }

      case 'COUNTDOWN_TICK':
        setPhase('COUNTDOWN');
        setCountdownNum(msg.count);
        sound.playCountdownTick();
        break;

      case 'QUESTION_START':
        setPhase('QUESTION');
        setAnsweredCount(0);
        setAnswerStats(null);
        setBombHolderId(msg.bombHolderId || null);
        setExplodedPlayerId(null);
        setCurrentQuestion({
          ...msg.question,
          questionIndex: msg.questionIndex,
          totalQuestions: msg.totalQuestions,
        });
        setTimeLeft(msg.question.timeLimit || 15);
        break;

      case 'BOMB_PASSED': {
        setBombHolderId(msg.bombHolderId);
        const reasonDesc = msg.reason === 'correct_answer' 
          ? 'jawaban benar' 
          : msg.reason === 'physical_tag' 
          ? 'tabrakan fisik' 
          : 'operan bot';
        setBombToast({
          text: `Estafet Bom: ${msg.fromName} ke ${msg.toName} (${reasonDesc})`,
          id: Date.now()
        });
        sound.playPop();
        setTimeout(() => setBombToast(null), 3500);
        break;
      }

      case 'TIME_TICK':
        setTimeLeft(msg.timeLeft);
        if (msg.timeLeft <= 5 && msg.timeLeft > 0) {
          sound.playCountdownTick();
        }
        break;

      case 'QUESTION_END':
        setPhase('REVIEW');
        setAnswerStats(msg.stats);
        if (msg.explodedPlayerId) setExplodedPlayerId(msg.explodedPlayerId);
        if (msg.leaderboard) setPlayers(msg.leaderboard);
        sound.playCorrect();
        break;

      case 'GAME_OVER':
        setPhase('FINISHED');
        setFinalPodium(msg.finalPodium || []);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        sound.playCorrect();
        break;

      case 'GAME_RESET':
        setPhase('LOBBY');
        setPlayers(msg.players || []);
        setAnswerStats(null);
        setCurrentQuestion(null);
        setBombHolderId(null);
        setExplodedPlayerId(null);
        break;

      case 'EMOJI_REACTION': {
        const reactionId = msg.id || ('rx_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now());
        const newReaction: FloatingReaction = {
          id: reactionId,
          emoji: msg.emoji,
          senderName: msg.senderName,
          senderAvatar: msg.senderAvatar,
          left: Math.floor(Math.random() * 80) + 10,
        };
        setFloatingReactions(prev => [...prev.slice(-24), newReaction]);
        sound.playPop();
        setTimeout(() => {
          setFloatingReactions(prev => prev.filter(r => r.id !== reactionId));
        }, 3500);
        break;
      }

      case 'POWERUP_USED': {
        setPowerupToast({
          text: `${msg.playerAvatar} ${msg.playerName} aktifkan ${msg.powerupName}!`,
          id: Date.now()
        });
        sound.playPop();
        setTimeout(() => {
          setPowerupToast(null), 3500;
        });
        break;
      }

      case 'ERROR':
        setErrorMsg(msg.message);
        break;
    }
  };

  const createRoom = (quizId: string) => {
    setErrorMsg(null);
    let selectedTheme = worldTheme;
    if (worldTheme === 'arcade') {
      if (quizId === 'history-ocean-mystery') selectedTheme = 'pirate';
      else if (quizId === 'general-science') selectedTheme = 'space';
      else if (quizId === 'brain-teasers-logic') selectedTheme = 'castle';
      setWorldTheme(selectedTheme);
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'CREATE_ROOM', quizId, gameMode, worldTheme: selectedTheme }));
    } else {
      pendingCreateQuizIdRef.current = quizId;
      connectWs();
    }
  };

  const changeGameMode = (newMode: GameMode) => {
    setGameMode(newMode);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode) {
      wsRef.current.send(JSON.stringify({ type: 'SET_GAME_MODE', gameMode: newMode }));
    }
  };

  const changeWorldTheme = (newTheme: WorldTheme) => {
    setWorldTheme(newTheme);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode) {
      wsRef.current.send(JSON.stringify({ type: 'SET_WORLD_THEME', worldTheme: newTheme }));
    }
  };

  const renderWorldThemeSelector = (compact = false) => {
    const themes: { id: WorldTheme; label: string; icon: string; desc: string; tag: string }[] = [
      { id: 'arcade', label: 'Arcade Toybox', icon: '🕹️', desc: 'Atmosfer neon cyber & lautan lava magma menyala', tag: 'Neon & Magma' },
      { id: 'pirate', label: 'Bajak Laut Hiu', icon: '🏝️', desc: 'Dek kayu kapal, samudra biru & 3 sirip hiu berputar', tag: 'Samudra & Hiu' },
      { id: 'space', label: 'Stasiun Antariksa', icon: '🚀', desc: 'Lantai pelat orbital, 350 bintang kosmik & cincin neon', tag: 'Kosmik & Cincin' },
      { id: 'castle', label: 'Kastil Kuno', icon: '🏰', desc: 'Lantai batu cobblestone, parit air lumut & 4 pilar obor api', tag: 'Benteng & Obor' },
    ];

    if (compact) {
      return (
        <div className="flex items-center gap-1 bg-[#0b0f19] border-2 border-black p-1 rounded-xl shadow-[2px_2px_0px_#000]">
          {themes.map(t => {
            const isSelected = worldTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => changeWorldTheme(t.id)}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-black shadow-[1px_1px_0px_#000]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800 border-transparent'
                }`}
                title={t.desc}
              >
                <span>{t.icon}</span>
                <span className="hidden lg:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="mb-8">
        <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>PILIH TEMA DUNIA 3D ARENA:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {themes.map(t => {
            const isSelected = worldTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setWorldTheme(t.id)}
                className={`p-4 rounded-xl border-2 border-black text-left transition-all cursor-pointer relative flex flex-col justify-between iso-tile ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-[6px_6px_0px_#000] scale-[1.02]'
                    : 'bg-[#151c2c] text-slate-200 hover:bg-[#1e293b] shadow-[4px_4px_0px_#000]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl p-1.5 rounded-lg bg-black/10 border border-black/20">{t.icon}</span>
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                    isSelected ? 'bg-black text-amber-400' : 'bg-[#0b0f19] text-slate-300 border border-black'
                  }`}>
                    {isSelected ? 'TEMA AKTIF' : t.tag}
                  </span>
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk',sans-serif] font-black text-sm mb-1">{t.label}</h4>
                  <p className="text-xs opacity-90 leading-snug">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderModeSelector = (compact = false) => {
    const modes: { id: GameMode; label: string; icon: string; desc: string }[] = [
      { id: 'bomb_tag', label: 'Estafet Bom 3D', icon: '💣', desc: 'Oper bom waktu sebelum meledak! Survivor bonus +300' },
      { id: 'glass_bridge', label: 'Jembatan Kaca 3D', icon: '🌉', desc: 'Jalur kaca transparan ke tebing piala finish' },
      { id: 'lava_tiles', label: 'Lantai Lava 3D', icon: '🌋', desc: '4 Kuadran lantai runtuh ke lautan lava' },
      { id: 'classic', label: 'Mode Klasik', icon: '📋', desc: 'Tampilan tombol kuis 2D minimalis' },
    ];

    if (compact) {
      return (
        <div className="flex items-center gap-1.5 bg-[#0b0f19] border-2 border-black p-1 rounded-xl shadow-[2px_2px_0px_#000]">
          {modes.map(m => {
            const isSelected = gameMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => changeGameMode(m.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-black shadow-[1px_1px_0px_#000]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800 border-transparent'
                }`}
                title={m.desc}
              >
                <span>{m.icon}</span>
                <span className="hidden md:inline">{m.label}</span>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="mb-8">
        <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>PILIH MODE PERMAINAN ARENA:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {modes.map(m => {
            const isSelected = gameMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setGameMode(m.id)}
                className={`p-4 rounded-xl border-2 border-black text-left transition-all cursor-pointer relative flex flex-col justify-between iso-tile ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-[6px_6px_0px_#000] scale-[1.02]'
                    : 'bg-[#151c2c] text-slate-200 hover:bg-[#1e293b] shadow-[4px_4px_0px_#000]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl p-1.5 rounded-lg bg-black/10 border border-black/20">{m.icon}</span>
                  {isSelected && (
                    <span className="text-[10px] bg-black text-amber-400 font-mono font-black px-2 py-0.5 rounded">
                      AKTIF
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk',sans-serif] font-black text-sm mb-1">{m.label}</h4>
                  <p className="text-xs opacity-90 leading-snug">{m.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const startGame = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'START_GAME' }));
    }
  };

  const nextQuestion = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'NEXT_QUESTION' }));
    }
  };

  const restartGame = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'RESTART_GAME' }));
    }
  };

  const skipTimer = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'SKIP_TIMER' }));
    }
  };

  const copyPin = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderFloatingReactions = () => {
    return (
      <>
        <style>{`
          @keyframes floatUpReaction {
            0% {
              opacity: 0;
              transform: translateY(100vh) scale(0.6);
            }
            12% {
              opacity: 1;
              transform: translateY(80vh) scale(1.15);
            }
            80% {
              opacity: 0.95;
              transform: translateY(15vh) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-8vh) scale(0.8);
            }
          }
        `}</style>
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {floatingReactions.map((r) => (
            <div
              key={r.id}
              className="absolute flex flex-col items-center select-none"
              style={{
                left: `${r.left}%`,
                bottom: 0,
                animation: 'floatUpReaction 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            >
              <span className="text-4xl md:text-5xl filter drop-shadow-md">
                {r.emoji}
              </span>
              <span className="mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold font-mono bg-slate-950 text-amber-400 border-2 border-black shadow-[2px_2px_0px_#000] whitespace-nowrap">
                {r.senderAvatar} {r.senderName}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const sendReaction = (emoji: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode) {
      wsRef.current.send(JSON.stringify({
        type: 'SEND_REACTION',
        emoji
      }));
      sound.playPop();
    }
  };

  const renderReactionDock = () => {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#111827] border-2 border-black px-3 py-2 rounded-xl shadow-[4px_4px_0px_#000] flex items-center gap-1.5 sm:gap-2">
        <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider px-2 hidden sm:inline">
          Host Reaction:
        </span>
        {REACTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => sendReaction(emoji)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#1e293b] hover:bg-amber-400 text-white hover:text-slate-950 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center text-xl sm:text-2xl cursor-pointer"
            title={`Kirim ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  };

  const renderPowerupToast = () => {
    return (
      <>
        {powerupToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-amber-400 text-slate-950 font-black text-sm px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2">
              <span>{powerupToast.text}</span>
            </div>
          </div>
        )}
        {bombToast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-red-600 text-white font-black text-sm px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2">
              <span>{bombToast.text}</span>
            </div>
          </div>
        )}
      </>
    );
  };

  // 1. Connection Error
  if (!wsConnected && errorMsg) {
    return (
      <div className="arcade-card bg-red-950/70 border-red-500 p-8 max-w-xl mx-auto text-center mt-12">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-white mb-2">Koneksi WebSocket Terputus</h3>
        <p className="text-red-200 text-sm mb-6">{errorMsg}</p>
        <p className="text-xs font-mono text-slate-400">Jalankan <code className="bg-black px-2 py-1 rounded text-amber-400">npm run dev</code> untuk menyalakan frontend Astro dan backend WS bersamaan.</p>
      </div>
    );
  }

  // 2. Select Quiz Phase
  if (phase === 'SELECT') {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] ${
              wsConnected ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
            }`}>
              <Radio className="w-3.5 h-3.5" />
              {wsConnected ? 'Server Online' : 'Menghubungkan Server...'}
            </span>
          </div>
          <h1 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-4xl font-black text-white">Pilih Paket Kuis</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Pilih mode arena 3D dan salah satu paket soal di bawah untuk membuka room kuis baru.</p>
        </div>

        {/* Mode Selector Neo-Brutalist */}
        {renderModeSelector(false)}

        {/* World Theme Selector Neo-Brutalist */}
        {renderWorldThemeSelector(false)}

        {/* Grid Paket Soal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableQuizzes.map((quiz) => {
            const rec = QUIZ_THEME_RECOMMENDATIONS[quiz.id];
            return (
              <div 
                key={quiz.id}
                className="iso-card p-6 flex flex-col justify-between bg-[#151c2c]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider bg-[#0b0f19] px-2 py-0.5 rounded border border-black">
                      PAKET KUIS
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300 bg-[#0b0f19] px-2 py-0.5 rounded border border-black">
                      {quiz.questionCount} SOAL
                    </span>
                  </div>
                  <h2 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-white mb-2">{quiz.title}</h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 font-medium">
                    {quiz.description}
                  </p>
                  {rec && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0b0f19] border border-black text-xs font-mono text-amber-300 shadow-[1px_1px_0px_#000]">
                      <span>{rec.icon}</span>
                      <span>Arena: <strong>{rec.label}</strong></span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => createRoom(quiz.id)}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 px-4 rounded-xl iso-btn flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Buka Room Kuis Ini</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Lobby Phase
  if (phase === 'LOBBY') {
    const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/play?pin=${roomCode}` : `/play?pin=${roomCode}`;

    return (
      <>
        {renderFloatingReactions()}
        {renderPowerupToast()}
        <div className="max-w-5xl mx-auto py-6 px-4 pb-24">
          {/* Top Header Card with PIN & QR Code */}
          <div className="iso-card p-6 sm:p-8 bg-[#151c2c] mb-8 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b-2 border-black">
              <p className="text-slate-300 text-xs font-mono font-bold uppercase tracking-wider">
                Buka di browser: <span className="text-amber-400 bg-[#0b0f19] px-2 py-0.5 rounded border border-black">/play</span> atau scan QR
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {renderModeSelector(true)}
                {renderWorldThemeSelector(true)}
                <button 
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 bg-[#1e293b] hover:bg-slate-700 text-slate-200 rounded-lg border-2 border-black text-xs shadow-[2px_2px_0px_#000] cursor-pointer"
                  title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Column: PIN & Info */}
              <div className="flex-1 text-center md:text-left">

                <div className="inline-flex items-center gap-3 my-2 bg-[#0b0f19] border-2 border-black p-3 sm:p-4 rounded-xl shadow-[3px_3px_0px_#000]">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-widest text-amber-400 font-mono tabular-nums">
                    {roomCode}
                  </span>
                  <button
                    onClick={copyPin}
                    className="p-3 bg-[#1e293b] hover:bg-slate-700 text-white rounded-lg border-2 border-black arcade-btn"
                    title="Salin PIN"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs text-slate-300 font-mono">
                  <span className="bg-[#0b0f19] px-3 py-1 rounded border border-black">
                    Kuis: <strong className="text-white">{quizMeta.title}</strong>
                  </span>
                  <span className="bg-[#0b0f19] px-3 py-1 rounded border border-black">
                    Total: <strong className="text-white">{quizMeta.count} Soal</strong>
                  </span>
                </div>

                <div className="mt-4">
                  <a
                    href={`/play?pin=${roomCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-amber-400 hover:bg-amber-300 text-slate-950 arcade-btn"
                  >
                    <span>Buka Tab Pemain (Auto-PIN)</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Dynamic QR Code */}
              <div className="bg-[#0b0f19] border-2 border-black p-4 rounded-xl flex flex-col items-center shadow-[3px_3px_0px_#000] shrink-0">
                <div className="bg-white p-2 rounded border-2 border-black">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(joinUrl)}`}
                    alt="QR Code Masuk Kuis"
                    className="w-28 h-28 sm:w-32 sm:h-32"
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-400 mt-2">SCAN QR UNTUK JOIN</span>
              </div>
            </div>
          </div>

          {/* Roblox 3D Arena Preview in Lobby */}
          {gameMode !== 'classic' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="font-['Space_Grotesk',sans-serif] text-sm font-black text-white flex items-center gap-1.5">
                    {gameMode === 'bomb_tag' ? '💣 Estafet Bom 3D (Lobby Preview)' : gameMode === 'glass_bridge' ? '🌉 Jembatan Kaca 3D (Lobby Preview)' : '🌋 Lantai Lava 3D (Lobby Preview)'}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-[#151c2c] px-2 py-0.5 rounded border border-black hidden sm:inline">
                    Gunakan WASD / Tombol Arah untuk bergerak
                  </span>
                </div>
              </div>
              <div className="border-2 border-black shadow-[4px_4px_0px_#000] rounded-2xl overflow-hidden">
                <RobloxArena3D
                  phase="LOBBY"
                  arenaMode={gameMode === 'classic' ? 'bomb_tag' : gameMode}
                  bombHolderId={bombHolderId}
                  explodedPlayerId={explodedPlayerId}
                  isHost={true}
                  players={players}
                  worldTheme={worldTheme}
                />
              </div>
            </div>
          )}

          {/* Players Area */}
          <div className="arcade-card p-6 sm:p-8 bg-[#151c2c] mb-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black rounded-lg border-2 border-black">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-black text-white">Peserta di Lobby ({players.length})</h3>
                  <p className="text-xs text-slate-400 font-medium">Menunggu peserta bergabung melalui HP atau tab browser lain...</p>
                </div>
              </div>

              <button
                onClick={startGame}
                disabled={players.length === 0}
                className={`px-8 py-3.5 rounded-xl font-black text-slate-950 shadow-[3px_3px_0px_#000] flex items-center gap-2 transition-all ${
                  players.length > 0 
                    ? 'bg-emerald-500 hover:bg-emerald-400 arcade-btn cursor-pointer'
                    : 'bg-slate-700 text-slate-400 border-2 border-black cursor-not-allowed'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Mulai Kuis</span>
              </button>
            </div>

            {players.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-black bg-[#0b0f19] rounded-xl">
                <div className="w-14 h-14 bg-[#151c2c] border-2 border-black rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-7 h-7 text-slate-500" />
                </div>
                <p className="text-slate-300 font-bold text-sm">Belum ada peserta yang bergabung.</p>
                <p className="text-slate-500 text-xs mt-1 font-mono">Buka tab baru dan akses <code className="text-amber-400">/play</code> dengan PIN di atas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {players.map((p) => (
                  <div 
                    key={p.id}
                    className="bg-[#1e293b] border-2 border-black p-3.5 text-center rounded-xl shadow-[2px_2px_0px_#000]"
                  >
                    <span className="text-3xl block mb-1">{p.avatar}</span>
                    <p className="font-bold text-white text-xs truncate">{p.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {renderReactionDock()}
      </>
    );
  }

  // 4. Countdown Phase
  if (phase === 'COUNTDOWN') {
    return (
      <>
        {renderFloatingReactions()}
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-amber-400 uppercase tracking-widest text-xs font-mono font-bold mb-4">BERSUMBU DAN BERSIAPLAH!</p>
          <div className="w-36 h-36 bg-amber-400 text-slate-950 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-center text-7xl font-black font-mono">
            {countdownNum}
          </div>
          <p className="text-slate-400 text-sm mt-6 font-medium">Soal pertama akan segera ditampilkan...</p>
        </div>
      </>
    );
  }

  // 5. Question & Review Phase
  if ((phase === 'QUESTION' || phase === 'REVIEW') && currentQuestion) {
    const isReview = phase === 'REVIEW';
    const percentTime = Math.max(0, (timeLeft / (currentQuestion.timeLimit || 15)) * 100);

    return (
      <>
        {renderFloatingReactions()}
        {renderPowerupToast()}
        <div className="max-w-5xl mx-auto py-4 px-4 pb-24">
          {/* Top Scoreboard Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 arcade-card p-3.5 bg-[#151c2c]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="bg-[#0b0f19] text-amber-400 font-mono font-bold px-3 py-1.5 rounded-lg text-xs sm:text-sm border-2 border-black shadow-[2px_2px_0px_#000]">
                SOAL {currentQuestion.questionIndex + 1}/{currentQuestion.totalQuestions}
              </span>
              {renderModeSelector(true)}
              {renderWorldThemeSelector(true)}
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              {!isReview && gameMode !== 'classic' && (
                <button
                  type="button"
                  onClick={skipTimer}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 arcade-btn"
                  title="Langsung akhiri waktu soal"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{gameMode === 'bomb_tag' ? 'Ledakkan Bom' : 'Akhiri Soal'}</span>
                </button>
              )}

              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-300 bg-[#0b0f19] px-2.5 py-1 rounded-lg border border-black">
                <Users className="w-4 h-4 text-slate-400" />
                <span>
                  <strong className="text-white font-mono tabular-nums">{answeredCount}</strong>/{players.length}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#0b0f19] px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]">
                <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-500' : 'text-amber-400'}`} />
                <span className={`text-xl sm:text-2xl font-mono font-black tabular-nums ${timeLeft <= 5 ? 'text-red-500' : 'text-amber-400'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#0b0f19] border-2 border-black h-3 rounded-full overflow-hidden mb-6 shadow-[2px_2px_0px_#000]">
            <div 
              className={`h-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-amber-400'
              }`}
              style={{ width: `${percentTime}%` }}
            />
          </div>

          {/* 3D Roblox Arena */}
          {gameMode !== 'classic' ? (
            <div className="mb-6 space-y-4">
              <div className="border-2 border-black shadow-[4px_4px_0px_#000] rounded-2xl overflow-hidden">
                <RobloxArena3D
                  phase={phase}
                  arenaMode={gameMode === 'classic' ? 'bomb_tag' : gameMode}
                  bombHolderId={bombHolderId}
                  explodedPlayerId={explodedPlayerId}
                  isHost={true}
                  players={players}
                  correctIndex={isReview ? currentQuestion.correctIndex : null}
                  options={currentQuestion.options}
                  questionText={currentQuestion.text}
                  timeLeft={timeLeft}
                  worldTheme={worldTheme}
                />
              </div>

              {/* 4 Opsi Jawaban Isometric Block Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentQuestion.options.map((opt, idx) => {
                  const theme = OPTION_THEMES[idx];
                  const isCorrect = isReview && idx === currentQuestion.correctIndex;
                  const count = answerStats?.optionCounts?.[idx] || 0;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl flex flex-col justify-between font-bold transition-all border-2 border-black iso-tile ${theme.bg} ${theme.text} ${
                        isReview 
                          ? isCorrect
                            ? 'ring-4 ring-white shadow-[6px_6px_0px_#000] scale-[1.03]'
                            : 'opacity-30 grayscale-[70%]'
                          : 'shadow-[4px_4px_0px_#000]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1 font-mono">
                        <span className="bg-black/30 px-2 py-0.5 rounded flex items-center gap-1 text-white">
                          <span>{theme.shape}</span>
                          <span>{theme.label}</span>
                        </span>
                        {isReview && (
                          <span className="bg-black/40 px-2 py-0.5 rounded text-[11px] text-white flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{count}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 mt-1">
                        {opt}
                      </p>
                    </div>
                  );
                })}
              </div>

              {isReview && currentQuestion.explanation && (
                <div className="p-3.5 bg-[#151c2c] border-2 border-black rounded-xl text-xs text-slate-200 font-medium">
                  <strong className="text-amber-400">Penjelasan:</strong> {currentQuestion.explanation}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Big Question Card Classic */}
              <div className="arcade-card p-8 mb-6 bg-[#151c2c] text-center">
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl md:text-3xl font-black text-white leading-relaxed">
                  {currentQuestion.text}
                </h2>
                {isReview && currentQuestion.explanation && (
                  <div className="mt-4 p-3 bg-[#0b0f19] border border-black rounded-lg text-xs text-slate-300 text-left max-w-2xl mx-auto font-medium">
                    <strong className="text-amber-400">Penjelasan:</strong> {currentQuestion.explanation}
                  </div>
                )}
              </div>

              {/* 4 Answer Options Classic Isometric Tiles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentQuestion.options.map((opt, idx) => {
                  const theme = OPTION_THEMES[idx];
                  const isCorrect = isReview && idx === currentQuestion.correctIndex;
                  const count = answerStats?.optionCounts?.[idx] || 0;

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-xl flex items-center justify-between font-bold border-2 border-black iso-tile ${theme.bg} ${theme.text} ${
                        isReview 
                          ? isCorrect
                            ? 'ring-4 ring-white shadow-[6px_6px_0px_#000] scale-[1.02] opacity-100'
                            : 'opacity-30 grayscale-[70%]'
                          : 'shadow-[5px_5px_0px_#000]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded bg-black/20 text-white flex items-center justify-center text-lg font-mono">
                          {theme.shape}
                        </span>
                        <span className="text-base sm:text-lg font-bold">{opt}</span>
                      </div>

                      {isReview && (
                        <div className="bg-black/30 text-white px-3 py-1 rounded text-sm font-mono flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{count}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Inter-Question Live Leaderboard */}
          {isReview && players.length > 0 && (
            <div className="arcade-card p-5 mb-6 bg-[#151c2c]">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-black">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="font-['Space_Grotesk',sans-serif] font-black text-white text-base">Klasemen Sementara (Live Leaderboard)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {players.slice(0, 6).map((p, idx) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 border-black ${
                      idx === 0 
                        ? 'bg-amber-400 text-slate-950 font-black shadow-[2px_2px_0px_#000]' 
                        : 'bg-[#1e293b] text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono font-black text-sm w-5 text-center">
                        #{idx + 1}
                      </span>
                      <span className="text-xl">{p.avatar}</span>
                      <div className="truncate">
                        <span className="font-bold text-sm truncate block">{p.name}</span>
                        {p.streak > 1 && (
                          <span className="text-[10px] font-mono font-bold block">
                            Streak: {p.streak}x
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-mono font-black text-sm ml-2 shrink-0">
                      {p.score} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          {isReview && (
            <div className="flex justify-end mt-4">
              <button
                onClick={nextQuestion}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 px-8 rounded-xl arcade-btn flex items-center gap-2 text-base"
              >
                <span>{currentQuestion.questionIndex + 1 >= currentQuestion.totalQuestions ? 'Lihat Papan Skor Akhir' : 'Soal Berikutnya'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        {renderReactionDock()}
      </>
    );
  }

  // 6. Finished / Podium Phase
  if (phase === 'FINISHED') {
    const top3 = finalPodium.slice(0, 3);
    const rest = finalPodium.slice(3);

    return (
      <>
        {renderFloatingReactions()}
        {renderPowerupToast()}
        <div className="max-w-4xl mx-auto py-8 px-4 pb-24 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold bg-amber-400 text-slate-950 border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
            GAME OVER
          </span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-black text-white mb-2">Papan Skor Juara</h2>
          <p className="text-slate-400 text-sm mb-12 font-medium">Selamat kepada seluruh peserta dan juara kuis!</p>

          {/* Podium Graphic Neo-Brutalist */}
          <div className="flex items-end justify-center gap-4 mb-12 max-w-lg mx-auto">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex-1 flex flex-col items-center">
                <span className="text-4xl mb-2">{top3[1].avatar}</span>
                <p className="font-bold text-white text-sm truncate max-w-[100px]">{top3[1].name}</p>
                <p className="text-xs text-slate-400 mb-2 font-mono">{top3[1].score} pts</p>
                <div className="w-full h-32 bg-[#1e293b] border-2 border-black rounded-t-xl flex items-center justify-center text-3xl font-black text-slate-300 shadow-[4px_4px_0px_#000]">
                  2
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex-1 flex flex-col items-center">
                <span className="text-5xl mb-2">👑 {top3[0].avatar}</span>
                <p className="font-black text-amber-400 text-base truncate max-w-[120px]">{top3[0].name}</p>
                <p className="text-xs text-amber-300 font-bold mb-2 font-mono">{top3[0].score} pts</p>
                <div className="w-full h-44 bg-amber-400 border-2 border-black rounded-t-xl flex items-center justify-center text-5xl font-black text-slate-950 shadow-[6px_6px_0px_#000]">
                  1
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex-1 flex flex-col items-center">
                <span className="text-4xl mb-2">{top3[2].avatar}</span>
                <p className="font-bold text-white text-sm truncate max-w-[100px]">{top3[2].name}</p>
                <p className="text-xs text-slate-400 mb-2 font-mono">{top3[2].score} pts</p>
                <div className="w-full h-24 bg-[#151c2c] border-2 border-black rounded-t-xl flex items-center justify-center text-2xl font-black text-amber-400 shadow-[4px_4px_0px_#000]">
                  3
                </div>
              </div>
            )}
          </div>

          {/* Rest of Leaderboard */}
          {rest.length > 0 && (
            <div className="arcade-card p-4 max-w-md mx-auto mb-8 text-left bg-[#151c2c]">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">Peringkat Lainnya:</h4>
              <div className="space-y-2">
                {rest.map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between p-2.5 bg-[#0b0f19] border border-black rounded-lg text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-400 font-bold w-6">#{idx + 4}</span>
                      <span className="text-lg">{p.avatar}</span>
                      <span className="font-bold text-white">{p.name}</span>
                    </div>
                    <span className="font-mono font-bold text-amber-400">{p.score} pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={restartGame}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-8 rounded-xl arcade-btn inline-flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Lagi di Room Ini</span>
          </button>
        </div>
        {renderReactionDock()}
      </>
    );
  }

  return null;
}
