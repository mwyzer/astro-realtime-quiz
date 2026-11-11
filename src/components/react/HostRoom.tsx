import React, { useState, useEffect, useRef } from 'react';
import type { PlayerSummary, QuizQuestion, AnswerStats } from '../../types/quiz';
import { DEFAULT_QUIZZES } from '../../data/default-quizzes';
import { sound } from './SoundPlayer';
import confetti from 'canvas-confetti';
import { 
  Users, Play, ArrowRight, Trophy, RotateCcw, 
  Copy, Check, Clock, Sparkles, Volume2, VolumeX, ShieldAlert,
  Radio, CheckCircle2
} from 'lucide-react';

const OPTION_THEMES = [
  { bg: 'bg-red-500', hover: 'hover:bg-red-600', ring: 'ring-red-400', shape: '▲', label: 'Merah' },
  { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', ring: 'ring-blue-400', shape: '◆', label: 'Biru' },
  { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', ring: 'ring-amber-400', shape: '●', label: 'Kuning' },
  { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', ring: 'ring-emerald-400', shape: '■', label: 'Hijau' },
];

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
  
  // Pre-fill available quizzes with DEFAULT_QUIZZES so cards are visible immediately
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
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);

  const wsRef = useRef<WebSocket | null>(null);

  // Connect to WS server & load quizzes
  useEffect(() => {
    // 1. Fetch latest quizzes from REST API
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

    // 2. Connect WebSocket
    const wsProtocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = (import.meta as any).env?.PUBLIC_WS_URL || (
      isDevPort 
        ? `ws://${window.location.hostname}:3001` 
        : `${wsProtocol}//${window.location.host}`
    );

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      setErrorMsg(null);
      // Ask for quiz list
      ws.send(JSON.stringify({ type: 'GET_QUIZZES' }));
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    ws.onerror = () => {
      setErrorMsg('Gagal terhubung ke server WebSocket di port 3001. Pastikan server websocket aktif!');
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        handleServerMessage(msg);
      } catch (err) {
        console.error('Error parsing WS message:', err);
      }
    };

    return () => {
      ws.close();
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
        setPhase('LOBBY');
        break;

      case 'PLAYER_LIST_UPDATE':
        setPlayers(msg.players || []);
        sound.playPop();
        break;

      case 'PLAYER_ANSWERED_UPDATE':
        setAnsweredCount(msg.answeredCount || 0);
        sound.playPop();
        break;

      case 'COUNTDOWN_TICK':
        setPhase('COUNTDOWN');
        setCountdownNum(msg.count);
        sound.playCountdownTick();
        break;

      case 'QUESTION_START':
        setPhase('QUESTION');
        setAnsweredCount(0);
        setAnswerStats(null);
        setCurrentQuestion({
          ...msg.question,
          questionIndex: msg.questionIndex,
          totalQuestions: msg.totalQuestions,
        });
        setTimeLeft(msg.question.timeLimit || 15);
        break;

      case 'TIME_TICK':
        setTimeLeft(msg.timeLeft);
        if (msg.timeLeft <= 5 && msg.timeLeft > 0) {
          sound.playCountdownTick();
        }
        break;

      case 'QUESTION_END':
        setPhase('REVIEW');
        setAnswerStats(msg.stats);
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

      case 'ERROR':
        setErrorMsg(msg.message);
        break;
    }
  };

  const createRoom = (quizId: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'CREATE_ROOM', quizId }));
    }
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
              <span className="text-4xl md:text-5xl filter drop-shadow-lg">
                {r.emoji}
              </span>
              <span className="mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900/80 text-white border border-white/20 shadow-lg backdrop-blur whitespace-nowrap">
                {r.senderAvatar} {r.senderName}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };

  // 1. Connection Error
  if (!wsConnected && errorMsg) {
    return (
      <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-8 max-w-xl mx-auto text-center mt-12 backdrop-blur">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Koneksi WebSocket Terputus</h3>
        <p className="text-red-200 text-sm mb-6">{errorMsg}</p>
        <p className="text-xs text-gray-400">Jalankan <code className="bg-black/50 px-2 py-1 rounded text-purple-300">npm run dev</code> untuk menyalakan frontend Astro dan backend WS bersamaan.</p>
      </div>
    );
  }

  // 2. Select Quiz Phase
  if (phase === 'SELECT') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Host Mode Setup
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              wsConnected 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse'
            }`}>
              <Radio className="w-3 h-3" />
              {wsConnected ? 'Realtime Server Aktif' : 'Menghubungkan Server...'}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Pilih Paket Kuis</h2>
          <p className="text-gray-400 text-sm mt-2">Pilih paket soal yang ingin kamu sajikan untuk para peserta di layar ini.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {availableQuizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className="bg-slate-800/60 border border-slate-700 hover:border-purple-500/60 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">
                    {quiz.questionCount} Soal
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {quiz.description}
                </p>
              </div>

              <button
                onClick={() => createRoom(quiz.id)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Buka Room Kuis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Lobby Phase
  if (phase === 'LOBBY') {
    return (
      <>
        {renderFloatingReactions()}
        <div className="max-w-5xl mx-auto py-6 px-4">
          {/* Top Header Card with PIN */}
          <div className="bg-gradient-to-r from-purple-900/60 via-slate-800/80 to-indigo-900/60 border border-purple-500/30 rounded-3xl p-8 backdrop-blur shadow-2xl mb-8 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-gray-300 rounded-lg border border-slate-600 text-xs"
                title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-purple-300 text-xs font-semibold tracking-wider uppercase mb-2">
              Masuk ke halaman <span className="text-white font-mono bg-black/40 px-2 py-0.5 rounded">/play</span> dan masukkan PIN:
            </p>

            <div className="inline-flex items-center gap-4 my-2">
              <span className="text-6xl md:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-300 font-mono drop-shadow-md">
                {roomCode}
              </span>
              <button
                onClick={copyPin}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/20"
                title="Salin PIN"
              >
                {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300">
              <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
                📖 Kuis: <strong className="text-white">{quizMeta.title}</strong>
              </span>
              <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
                ❓ Total: <strong className="text-white">{quizMeta.count} Pertanyaan</strong>
              </span>
            </div>
          </div>

          {/* Players Area */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur mb-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/20 text-purple-300 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Peserta di Lobby ({players.length})</h3>
                  <p className="text-xs text-gray-400">Menunggu pemain lain bergabung melalui perangkat mereka...</p>
                </div>
              </div>

              <button
                onClick={startGame}
                disabled={players.length === 0}
                className={`px-8 py-3.5 rounded-xl font-bold text-white shadow-xl flex items-center gap-2 transition-all ${
                  players.length > 0 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 cursor-pointer shadow-emerald-500/20'
                    : 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Mulai Kuis</span>
              </button>
            </div>

            {players.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Users className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400 font-medium text-sm">Belum ada peserta yang bergabung.</p>
                <p className="text-gray-500 text-xs mt-1">Buka tab baru di browser dan akses <code className="text-purple-400 font-mono">/play</code> untuk mencoba join!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {players.map((p) => (
                  <div 
                    key={p.id}
                    className="bg-slate-800/80 border border-purple-500/20 rounded-2xl p-4 text-center transform hover:scale-105 transition-all shadow-md animate-bounce-short"
                  >
                    <span className="text-4xl block mb-2">{p.avatar}</span>
                    <p className="font-bold text-white text-sm truncate">{p.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // 4. Countdown Phase
  if (phase === 'COUNTDOWN') {
    return (
      <>
        {renderFloatingReactions()}
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-4">Bersiaplah!</p>
          <div className="w-40 h-40 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-8xl font-black text-white shadow-2xl shadow-purple-500/40 animate-pulse">
            {countdownNum}
          </div>
          <p className="text-gray-400 text-sm mt-6">Kuis akan dimulai dalam hitungan detik...</p>
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
        <div className="max-w-5xl mx-auto py-4 px-4">
          {/* Top bar with Question tracker, Timer, and Answer Count */}
          <div className="flex items-center justify-between mb-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="bg-purple-600/30 text-purple-300 font-bold px-3 py-1 rounded-xl text-sm border border-purple-500/30">
                Soal {currentQuestion.questionIndex + 1} dari {currentQuestion.totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  Terjawab: <strong className="text-white font-mono text-base">{answeredCount}</strong> / {players.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`} />
                <span className={`text-2xl font-mono font-black ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>

          {/* Timer progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
            <div 
              className={`h-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-indigo-400'
              }`}
              style={{ width: `${percentTime}%` }}
            />
          </div>

          {/* Big Question Card */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 mb-6 shadow-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-relaxed">
              {currentQuestion.text}
            </h2>
            {isReview && currentQuestion.explanation && (
              <div className="mt-4 p-3 bg-purple-900/30 border border-purple-500/30 rounded-xl text-xs text-purple-200 text-left max-w-2xl mx-auto">
                💡 <strong>Penjelasan:</strong> {currentQuestion.explanation}
              </div>
            )}
          </div>

          {/* 4 Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQuestion.options.map((opt, idx) => {
              const theme = OPTION_THEMES[idx];
              const isCorrect = isReview && idx === currentQuestion.correctIndex;
              const isIncorrect = isReview && idx !== currentQuestion.correctIndex;
              const count = answerStats?.optionCounts?.[idx] || 0;

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl flex items-center justify-between text-white font-bold transition-all ${theme.bg} ${
                    isReview 
                      ? isCorrect
                        ? 'ring-4 ring-white shadow-2xl scale-[1.02] opacity-100'
                        : 'opacity-40 grayscale-[40%]'
                      : 'shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-xl font-mono">
                      {theme.shape}
                    </span>
                    <span className="text-lg md:text-xl font-medium">{opt}</span>
                  </div>

                  {isReview && (
                    <div className="bg-black/30 px-3 py-1 rounded-xl text-sm font-mono flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{count}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Review Action Footer */}
          {isReview && (
            <div className="flex justify-end mt-4">
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 text-base"
              >
                <span>{currentQuestion.questionIndex + 1 >= currentQuestion.totalQuestions ? 'Lihat Papan Skor Akhir' : 'Soal Berikutnya'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
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
        <div className="max-w-4xl mx-auto py-8 px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 mb-3">
            <Trophy className="w-4 h-4" /> Game Over
          </span>
          <h2 className="text-4xl font-extrabold text-white mb-2">Papan Skor Juara!</h2>
          <p className="text-gray-400 text-sm mb-12">Selamat kepada para pemenang kuis kali ini!</p>

          {/* Podium Graphic */}
          <div className="flex items-end justify-center gap-4 mb-12 max-w-lg mx-auto">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex-1 flex flex-col items-center">
                <span className="text-4xl mb-2">{top3[1].avatar}</span>
                <p className="font-bold text-white text-sm truncate max-w-[100px]">{top3[1].name}</p>
                <p className="text-xs text-gray-400 mb-2 font-mono">{top3[1].score} pts</p>
                <div className="w-full h-32 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-2xl flex items-center justify-center text-3xl font-black text-slate-300 border-t-4 border-slate-400 shadow-xl">
                  2
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex-1 flex flex-col items-center">
                <span className="text-5xl mb-2 animate-bounce">👑 {top3[0].avatar}</span>
                <p className="font-extrabold text-yellow-300 text-base truncate max-w-[120px]">{top3[0].name}</p>
                <p className="text-xs text-yellow-400 font-bold mb-2 font-mono">{top3[0].score} pts</p>
                <div className="w-full h-44 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-2xl flex items-center justify-center text-5xl font-black text-white border-t-4 border-yellow-300 shadow-2xl">
                  1
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex-1 flex flex-col items-center">
                <span className="text-4xl mb-2">{top3[2].avatar}</span>
                <p className="font-bold text-white text-sm truncate max-w-[100px]">{top3[2].name}</p>
                <p className="text-xs text-gray-400 mb-2 font-mono">{top3[2].score} pts</p>
                <div className="w-full h-24 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-2xl flex items-center justify-center text-2xl font-black text-amber-300 border-t-4 border-amber-600 shadow-xl">
                  3
                </div>
              </div>
            )}
          </div>

          {/* Rest of Leaderboard */}
          {rest.length > 0 && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 max-w-md mx-auto mb-8 text-left">
              <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">Peringkat Lainnya</h4>
              <div className="space-y-2">
                {rest.map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between p-2.5 bg-slate-800/60 rounded-xl text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-gray-400 font-bold w-6">{idx + 4}.</span>
                      <span className="text-lg">{p.avatar}</span>
                      <span className="font-medium text-white">{p.name}</span>
                    </div>
                    <span className="font-mono font-bold text-purple-300">{p.score} pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={restartGame}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-xl transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Lagi di Room Ini</span>
          </button>
        </div>
      </>
    );
  }

  return null;
}
