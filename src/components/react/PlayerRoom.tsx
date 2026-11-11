import React, { useState, useEffect, useRef } from 'react';
import { sound } from './SoundPlayer';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, CheckCircle2, XCircle, Clock, 
  Flame, Award, AlertCircle, Sparkles, Send, Radio 
} from 'lucide-react';

const AVATARS = ['🦊', '🐯', '🚀', '🐼', '👾', '🦄', '⚡', '🥑', '🦁', '🦉'];

const REACTION_EMOJIS = ['❤️', '🔥', '🎉', '👏', '😱', '🚀'];

const OPTION_THEMES = [
  { bg: 'bg-red-500', active: 'active:bg-red-600', ring: 'ring-red-400', shape: '▲', label: 'Merah' },
  { bg: 'bg-blue-500', active: 'active:bg-blue-600', ring: 'ring-blue-400', shape: '◆', label: 'Biru' },
  { bg: 'bg-amber-500', active: 'active:bg-amber-600', ring: 'ring-amber-400', shape: '●', label: 'Kuning' },
  { bg: 'bg-emerald-500', active: 'active:bg-emerald-600', ring: 'ring-emerald-400', shape: '■', label: 'Hijau' },
];

interface FloatingReaction {
  id: string;
  emoji: string;
  senderName: string;
  senderAvatar: string;
  left: number;
}

export default function PlayerRoom() {
  const [wsConnected, setWsConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Join Inputs
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);

  // Player state
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [phase, setPhase] = useState<'JOIN' | 'LOBBY' | 'COUNTDOWN' | 'QUESTION' | 'SUBMITTED' | 'RESULT' | 'FINISHED'>('JOIN');

  // Floating reactions
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);

  // Power-Up Lifelines
  const [fiftyFiftyLeft, setFiftyFiftyLeft] = useState(true);
  const [doublePointsLeft, setDoublePointsLeft] = useState(true);
  const [activeDouble, setActiveDouble] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  // Question details
  const [questionData, setQuestionData] = useState<{
    text: string;
    options: string[];
    timeLimit: number;
    questionIndex: number;
    totalQuestions: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Result info
  const [resultData, setResultData] = useState<{
    isCorrect: boolean;
    pointsEarned: number;
    totalScore: number;
    streak: number;
    rank: number;
    correctIndex: number;
  } | null>(null);

  const [finalRank, setFinalRank] = useState<{ rank: number; score: number; totalPlayers: number } | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Check URL query parameters (e.g. ?pin=123456)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPin = params.get('pin');
      if (urlPin) setPin(urlPin);
    }
  }, []);

  // Connect to WS
  useEffect(() => {
    const isDevPort = typeof window !== 'undefined' && window.location.port === '4321';
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
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    ws.onerror = () => {
      setErrorMsg('Gagal terhubung ke server WebSocket di port 3001.');
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
      case 'ROOM_JOINED':
        setPlayerId(msg.playerId);
        setRoomCode(msg.code);
        setPhase('LOBBY');
        setErrorMsg(null);
        sound.playPop();
        break;

      case 'COUNTDOWN_TICK':
        setPhase('COUNTDOWN');
        sound.playCountdownTick();
        break;

      case 'QUESTION_START':
        setPhase('QUESTION');
        setSelectedOption(null);
        setResultData(null);
        setHiddenOptions([]);
        setActiveDouble(false);
        setQuestionData({
          text: msg.question.text,
          options: msg.question.options,
          timeLimit: msg.question.timeLimit || 15,
          questionIndex: msg.questionIndex,
          totalQuestions: msg.totalQuestions,
        });
        setTimeLeft(msg.question.timeLimit || 15);
        sound.playPop();
        break;

      case 'FIFTY_FIFTY_RESULT':
        setHiddenOptions(msg.hiddenIndices || []);
        setFiftyFiftyLeft(false);
        sound.playPop();
        break;

      case 'DOUBLE_POINTS_ACTIVE':
        setActiveDouble(true);
        setDoublePointsLeft(false);
        sound.playPop();
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

      case 'TIME_TICK':
        setTimeLeft(msg.timeLeft);
        if (msg.timeLeft <= 5 && msg.timeLeft > 0) {
          sound.playCountdownTick();
        }
        break;

      case 'ANSWER_ACK':
        setPhase('SUBMITTED');
        sound.playPop();
        break;

      case 'PLAYER_RESULT':
        setPhase('RESULT');
        setResultData({
          isCorrect: msg.isCorrect,
          pointsEarned: msg.pointsEarned,
          totalScore: msg.totalScore,
          streak: msg.streak,
          rank: msg.rank,
          correctIndex: msg.correctIndex,
        });
        if (msg.isCorrect) {
          sound.playCorrect();
        } else {
          sound.playIncorrect();
        }
        break;

      case 'GAME_OVER':
        setPhase('FINISHED');
        if (playerId) {
          const podium = msg.finalPodium || [];
          const myInfo = podium.find((p: any) => p.id === playerId);
          if (myInfo) {
            setFinalRank({
              rank: myInfo.rank || 1,
              score: myInfo.score || 0,
              totalPlayers: podium.length
            });
            if (myInfo.rank <= 3) {
              confetti({ particleCount: 100, spread: 70 });
            }
          }
        }
        break;

      case 'GAME_RESET':
        setPhase('LOBBY');
        setSelectedOption(null);
        setResultData(null);
        setFiftyFiftyLeft(true);
        setDoublePointsLeft(true);
        setActiveDouble(false);
        setHiddenOptions([]);
        break;

      case 'HOST_DISCONNECTED':
        setErrorMsg('Host telah keluar dari room.');
        setPhase('JOIN');
        break;

      case 'ERROR':
        setErrorMsg(msg.message);
        break;
    }
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim() || !name.trim()) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'JOIN_ROOM',
        code: pin.trim(),
        name: name.trim(),
        avatar
      }));
    } else {
      setErrorMsg('Koneksi belum siap. Silakan tunggu sebentar.');
    }
  };

  const submitAnswer = (optionIndex: number) => {
    if (phase !== 'QUESTION' || selectedOption !== null) return;
    setSelectedOption(optionIndex);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode && playerId) {
      wsRef.current.send(JSON.stringify({
        type: 'SUBMIT_ANSWER',
        code: roomCode,
        playerId,
        answerIndex: optionIndex
      }));
    }
  };

  const sendReaction = (emoji: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode && playerId) {
      wsRef.current.send(JSON.stringify({
        type: 'SEND_REACTION',
        emoji
      }));
      sound.playPop();
    }
  };

  const useFiftyFifty = () => {
    if (!fiftyFiftyLeft || phase !== 'QUESTION' || hiddenOptions.length > 0) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode && playerId) {
      wsRef.current.send(JSON.stringify({
        type: 'USE_FIFTY_FIFTY'
      }));
    }
  };

  const useDoublePoints = () => {
    if (!doublePointsLeft || phase !== 'QUESTION' || activeDouble) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode && playerId) {
      wsRef.current.send(JSON.stringify({
        type: 'USE_DOUBLE_POINTS'
      }));
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

  const renderReactionDock = () => {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 border border-purple-500/30 backdrop-blur-md px-3 py-2 rounded-2xl shadow-2xl flex items-center gap-1 sm:gap-2">
        <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider px-2 hidden sm:inline">
          Reaksi:
        </span>
        {REACTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => sendReaction(emoji)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800/80 hover:bg-purple-600/30 active:scale-90 transition-all flex items-center justify-center text-xl sm:text-2xl border border-white/10 hover:border-purple-400/50 shadow-sm cursor-pointer"
            title={`Kirim ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  };

  // 1. Join Room Phase
  if (phase === 'JOIN') {
    return (
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/20">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                wsConnected 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse'
              }`}>
                <Radio className="w-2.5 h-2.5" />
                {wsConnected ? 'Server Online' : 'Menghubungkan Server...'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Gabung Permainan</h2>
            <p className="text-gray-400 text-xs mt-1">Masukkan PIN kuis dari layar Host untuk bergabung</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={joinRoom} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                PIN Kuis (6 Digit)
              </label>
              <input
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full bg-slate-800 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-3 text-center text-2xl font-mono font-bold tracking-widest text-white outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Nama Panggilan
              </label>
              <input
                type="text"
                maxLength={12}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi, Sarah"
                className="w-full bg-slate-800 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-3 text-white font-medium outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Pilih Avatar
              </label>
              <div className="flex flex-wrap gap-2 justify-center bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
                {AVATARS.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setAvatar(emoji)}
                    className={`text-2xl p-2 rounded-xl transition-transform ${
                      avatar === emoji 
                        ? 'bg-purple-600 scale-110 shadow-lg shadow-purple-600/40 ring-2 ring-white' 
                        : 'hover:bg-slate-700'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!wsConnected}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-black py-3.5 px-4 rounded-xl shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Masuk Room</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Waiting in Lobby Phase
  if (phase === 'LOBBY') {
    return (
      <>
        {renderFloatingReactions()}
        <div className="max-w-md mx-auto py-12 px-4 pb-24 text-center">
          <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-8 backdrop-blur shadow-2xl">
            <div className="text-6xl mb-4 animate-bounce">{avatar}</div>
            <h2 className="text-2xl font-black text-white">{name}</h2>
            <p className="text-purple-300 text-xs font-mono mt-1 mb-6">Room PIN: {roomCode}</p>

            <div className="py-6 px-4 bg-slate-800/80 rounded-2xl border border-slate-700 mb-6">
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-white font-bold text-sm">Kamu sudah bergabung!</p>
              <p className="text-gray-400 text-xs mt-1">Perhatikan layar Host. Kuis akan segera dimulai...</p>
            </div>
          </div>
        </div>
        {renderReactionDock()}
      </>
    );
  }

  // 3. Countdown Phase
  if (phase === 'COUNTDOWN') {
    return (
      <>
        {renderFloatingReactions()}
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
          <span className="text-purple-300 text-xs uppercase tracking-widest font-bold mb-2">Bersiaplah</span>
          <h2 className="text-3xl font-extrabold text-white mb-6">Pertanyaan Segera Tiba!</h2>
          <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-5xl font-black text-white animate-ping">
            🚀
          </div>
        </div>
      </>
    );
  }

  // 4. Question Phase (Answering Screen)
  if (phase === 'QUESTION' && questionData) {
    return (
      <>
        {renderFloatingReactions()}
        <div className="max-w-lg mx-auto py-4 px-4 pb-24 flex flex-col min-h-[85vh] justify-between">
          {/* Top bar info */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs text-gray-300">
              <span className="font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                Soal {questionData.questionIndex + 1}/{questionData.totalQuestions}
              </span>
              <span className={`font-mono font-bold text-sm flex items-center gap-1 ${
                timeLeft <= 5 ? 'text-red-400 font-black animate-pulse' : 'text-yellow-400'
              }`}>
                <Clock className="w-4 h-4" /> {timeLeft}s
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl mb-4 text-center">
              <p className="text-lg font-bold text-white leading-snug">
                {questionData.text}
              </p>
            </div>

            {/* Power-Up Lifelines Bar */}
            <div className="bg-slate-900/80 border border-purple-500/30 p-3 rounded-2xl mb-4 backdrop-blur shadow-lg">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Power-Up Lifelines
                </span>
                {activeDouble && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    🔥 2x Poin Aktif!
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={useFiftyFifty}
                  disabled={!fiftyFiftyLeft || hiddenOptions.length > 0 || selectedOption !== null}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    fiftyFiftyLeft && hiddenOptions.length === 0 && selectedOption === null
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-blue-400/30 shadow cursor-pointer active:scale-95'
                      : 'bg-slate-800/80 text-gray-500 border-slate-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>✂️ 50:50</span>
                  <span className="text-[10px] opacity-80">{fiftyFiftyLeft ? '(Tersedia)' : '(Terpakai)'}</span>
                </button>

                <button
                  type="button"
                  onClick={useDoublePoints}
                  disabled={!doublePointsLeft || activeDouble || selectedOption !== null}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    doublePointsLeft && !activeDouble && selectedOption === null
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-amber-400/30 shadow cursor-pointer active:scale-95'
                      : activeDouble
                      ? 'bg-amber-500 text-black border-amber-300 font-extrabold animate-pulse'
                      : 'bg-slate-800/80 text-gray-500 border-slate-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>🚀 2x Poin</span>
                  <span className="text-[10px] opacity-80">{activeDouble ? 'AKTIF' : doublePointsLeft ? '(Tersedia)' : '(Terpakai)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Big Touch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
            {questionData.options.map((opt, idx) => {
              const theme = OPTION_THEMES[idx];
              const isHidden = hiddenOptions.includes(idx);

              return (
                <button
                  key={idx}
                  onClick={() => submitAnswer(idx)}
                  disabled={isHidden || selectedOption !== null}
                  className={`w-full py-6 px-4 rounded-2xl font-bold text-white shadow-xl flex items-center gap-3.5 transition-all transform ${
                    isHidden
                      ? 'opacity-20 pointer-events-none line-through grayscale cursor-not-allowed scale-95 bg-slate-800 border border-slate-700'
                      : `active:scale-95 cursor-pointer ${theme.bg} ${theme.active}`
                  }`}
                >
                  <span className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-2xl font-mono shrink-0">
                    {theme.shape}
                  </span>
                  <span className="text-left text-base sm:text-lg leading-tight font-semibold flex-1">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-500 mt-3 mb-2">
            Pilih salah satu jawaban secepat mungkin untuk poin lebih tinggi!
          </p>
        </div>
        {renderReactionDock()}
      </>
    );
  }

  // 5. Submitted State (Waiting for question time to expire)
  if (phase === 'SUBMITTED') {
    const chosenTheme = selectedOption !== null ? OPTION_THEMES[selectedOption] : null;

    return (
      <>
        {renderFloatingReactions()}
        <div className="max-w-md mx-auto py-16 px-4 pb-24 text-center">
          <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-8 backdrop-blur shadow-2xl">
            <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">Jawaban Terkirim!</h2>
            <p className="text-gray-400 text-xs mb-6">Menunggu pemain lain dan waktu soal selesai...</p>

            {chosenTheme && (
              <div className={`p-4 rounded-xl text-white font-bold ${chosenTheme.bg} inline-flex items-center gap-2 shadow-lg`}>
                <span>{chosenTheme.shape}</span>
                <span>Kamu memilih: {questionData?.options[selectedOption!]}</span>
              </div>
            )}
          </div>
        </div>
        {renderReactionDock()}
      </>
    );
  }

  // 6. Result Phase (Instant feedback after question ends)
  if (phase === 'RESULT' && resultData) {
    return (
      <>
        {renderFloatingReactions()}
        <div className="max-w-md mx-auto py-12 px-4 pb-24 text-center">
          <div className={`rounded-3xl p-8 backdrop-blur shadow-2xl border ${
            resultData.isCorrect 
              ? 'bg-emerald-950/60 border-emerald-500/50' 
              : 'bg-red-950/60 border-red-500/50'
          }`}>
            {resultData.isCorrect ? (
              <div>
                <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-black text-white">BENAR! 🎉</h2>
                <p className="text-emerald-300 font-mono text-2xl font-bold mt-2">
                  +{resultData.pointsEarned} pts
                </p>
                {resultData.streak > 1 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-bold mt-3">
                    <Flame className="w-4 h-4 fill-current" />
                    <span>{resultData.streak}x Beruntun!</span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white">KURANG TEPAT! ❌</h2>
                <p className="text-red-300 text-sm mt-2">
                  Jawaban benar: <strong>{questionData?.options[resultData.correctIndex]}</strong>
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-around text-center">
              <div>
                <span className="text-xs uppercase text-gray-400 font-bold block">Peringkatmu</span>
                <span className="text-2xl font-black text-white font-mono">#{resultData.rank}</span>
              </div>
              <div>
                <span className="text-xs uppercase text-gray-400 font-bold block">Total Skor</span>
                <span className="text-2xl font-black text-purple-300 font-mono">{resultData.totalScore}</span>
              </div>
            </div>
          </div>
        </div>
        {renderReactionDock()}
      </>
    );
  }

  // 7. Finished / Game Over Phase
  if (phase === 'FINISHED' && finalRank) {
    return (
      <>
        {renderFloatingReactions()}
        <div className="max-w-md mx-auto py-12 px-4 pb-24 text-center">
          <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-8 backdrop-blur shadow-2xl">
            <Award className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-black text-white">Permainan Selesai!</h2>
            <p className="text-gray-400 text-xs mt-1 mb-6">Hebat, kamu telah menyelesaikan seluruh pertanyaan!</p>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 mb-6">
              <span className="text-xs uppercase text-gray-400 font-bold">Peringkat Akhirmu</span>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 my-2 font-mono">
                #{finalRank.rank}
              </p>
              <p className="text-xs text-gray-400">
                dari total {finalRank.totalPlayers} peserta
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <span className="text-xs text-gray-400">Total Skor Akhir</span>
                <p className="text-2xl font-mono font-bold text-purple-300">{finalRank.score} pts</p>
              </div>
            </div>

            <button
              onClick={() => {
                setPhase('JOIN');
                setPin('');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all"
            >
              Main Lagi di Room Baru
            </button>
          </div>
        </div>
        {renderReactionDock()}
      </>
    );
  }

  return null;
}
