import React, { useState, useEffect, useRef } from 'react';
import { TEAM_CONFIGS, type GameMode, type WorldTheme, type PlayerSummary, type PostGameAward, type TeamId, type TeamSummary } from '../../types/quiz';
import { sound } from './SoundPlayer';
import confetti from 'canvas-confetti';
import RobloxArena3D, { type Player3DData } from './RobloxArena3D';
import PodiumArena3D from './PodiumArena3D';
import { 
  Gamepad2, CheckCircle2, XCircle, Clock, 
  Flame, Award, AlertCircle, Sparkles, Send, Radio,
  Volume2, VolumeX
} from 'lucide-react';

const AVATARS = ['🦊', '🐯', '🚀', '🐼', '👾', '🦄', '⚡', '🥑', '🦁', '🦉'];

const REACTION_EMOJIS = ['❤️', '🔥', '🎉', '👏', '😱', '🚀'];

const OPTION_THEMES = [
  { bg: 'bg-[#ef4444]', text: 'text-white', shape: '▲', label: 'Merah' },
  { bg: 'bg-[#2563eb]', text: 'text-white', shape: '◆', label: 'Biru' },
  { bg: 'bg-[#eab308]', text: 'text-slate-950', shape: '●', label: 'Kuning' },
  { bg: 'bg-[#10b981]', text: 'text-slate-950', shape: '■', label: 'Hijau' },
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
  const [teamId, setTeamId] = useState<TeamId>('red');
  const [teamMode, setTeamMode] = useState(false);
  const [teamStandings, setTeamStandings] = useState<TeamSummary[]>([]);

  // Player state
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [phase, setPhase] = useState<'JOIN' | 'LOBBY' | 'COUNTDOWN' | 'QUESTION' | 'SUBMITTED' | 'RESULT' | 'FINISHED'>('JOIN');

  // Floating reactions
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);

  // Game Mode & 3D Arena Players
  const [gameMode, setGameMode] = useState<GameMode>('bomb_tag');
  const [worldTheme, setWorldTheme] = useState<WorldTheme>('arcade');
  const [audioState, setAudioState] = useState(() => sound.getState());
  const [bombHolderId, setBombHolderId] = useState<string | null>(null);
  const [explodedPlayerId, setExplodedPlayerId] = useState<string | null>(null);
  const [bombToast, setBombToast] = useState<{ text: string; id: number } | null>(null);
  const [arenaPlayers, setArenaPlayers] = useState<Player3DData[]>([]);

  useEffect(() => {
    return sound.subscribe((st) => setAudioState(st));
  }, []);

  useEffect(() => {
    sound.setTheme(worldTheme);
  }, [worldTheme]);

  useEffect(() => {
    sound.setUrgentMode(phase === 'QUESTION' && timeLeft <= 5 && timeLeft > 0);
  }, [phase, timeLeft]);

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
    exploded?: boolean;
  } | null>(null);

  const [finalRank, setFinalRank] = useState<{ rank: number; score: number; totalPlayers: number } | null>(null);
  const [finalPodium, setFinalPodium] = useState<PlayerSummary[]>([]);
  const [postGameAwards, setPostGameAwards] = useState<PostGameAward[]>([]);
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
        if (msg.gameMode) setGameMode(msg.gameMode);
        if (msg.worldTheme) setWorldTheme(msg.worldTheme);
        if (msg.teamId) setTeamId(msg.teamId);
        if (typeof msg.teamMode === 'boolean') setTeamMode(msg.teamMode);
        if (msg.bombHolderId) setBombHolderId(msg.bombHolderId);
        setPhase('LOBBY');
        setErrorMsg(null);
        setArenaPlayers([{
          id: msg.playerId,
          name: name.trim() || 'Pemain',
          avatar,
          teamId: msg.teamId || teamId,
          x: 0,
          z: msg.gameMode === 'glass_bridge' ? 7.2 : 0,
          jumping: false,
          currentAnswer: null
        }]);
        sound.playPop();
        break;

      case 'GAME_MODE_UPDATED':
        if (msg.gameMode) setGameMode(msg.gameMode);
        sound.playPop();
        break;

      case 'WORLD_THEME_UPDATED':
        if (msg.worldTheme) setWorldTheme(msg.worldTheme);
        sound.playPop();
        break;

      case 'TEAM_MODE_UPDATED':
        if (typeof msg.teamMode === 'boolean') setTeamMode(msg.teamMode);
        if (msg.teamStandings) setTeamStandings(msg.teamStandings);
        sound.playPop();
        break;

      case 'PLAYER_LIST_UPDATE': {
        if (msg.teamStandings) setTeamStandings(msg.teamStandings);
        if (msg.players && Array.isArray(msg.players)) {
          setArenaPlayers(prev => {
            const oldMap = new Map(prev.map(p => [p.id, p]));
            return msg.players.map((p: any) => {
              const existing = oldMap.get(p.id);
              return {
                id: p.id,
                name: p.name,
                avatar: p.avatar,
                teamId: p.teamId ?? existing?.teamId ?? 'red',
                x: existing?.x ?? p.x ?? 0,
                z: existing?.z ?? p.z ?? 0,
                jumping: existing?.jumping ?? p.jumping ?? false,
                currentAnswer: existing?.currentAnswer ?? p.currentAnswer ?? null
              };
            });
          });
        }
        break;
      }

      case 'PLAYERS_POSITIONS': {
        const posMap = new Map<string, any>((msg.positions || []).map((p: any) => [p.id, p]));
        setArenaPlayers(prev => {
          if (prev.length === 0 && msg.positions) {
            return msg.positions.map((p: any) => ({
              id: p.id,
              name: p.id === playerId ? (name || 'Pemain') : 'Peserta',
              avatar: p.id === playerId ? avatar : '👾',
              x: p.x,
              z: p.z,
              jumping: p.jumping,
              currentAnswer: p.currentAnswer
            }));
          }
          return prev.map(pl => {
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
          });
        });
        break;
      }

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
        setBombHolderId(msg.bombHolderId || null);
        setExplodedPlayerId(null);
        setQuestionData({
          text: msg.question.text,
          options: msg.question.options,
          timeLimit: msg.question.timeLimit || 15,
          questionIndex: msg.questionIndex,
          totalQuestions: msg.totalQuestions,
        });
        setTimeLeft(msg.question.timeLimit || 15);
        sound.playQuestionStart();
        break;

      case 'BOMB_PASSED': {
        setBombHolderId(msg.bombHolderId);
        const isMe = msg.bombHolderId === playerId;
        const wasMe = msg.fromName === name;
        const reasonDesc = msg.reason === 'correct_answer' 
          ? 'jawaban benar' 
          : msg.reason === 'physical_tag' 
          ? 'tabrakan fisik' 
          : 'operan bot';
        setBombToast({
          text: isMe 
            ? `AWAS! Kamu menerima BOM dari ${msg.fromName}!` 
            : wasMe 
            ? `Sukses mengoper bom ke ${msg.toName}!` 
            : `Estafet Bom: ${msg.fromName} ke ${msg.toName} (${reasonDesc})`,
          id: Date.now()
        });
        sound.playBombPass();
        setTimeout(() => setBombToast(null), 3500);
        break;
      }

      case 'FIFTY_FIFTY_RESULT':
        setHiddenOptions(msg.hiddenIndices || []);
        setFiftyFiftyLeft(false);
        sound.playPowerup();
        break;

      case 'DOUBLE_POINTS_ACTIVE':
        setActiveDouble(true);
        setDoublePointsLeft(false);
        sound.playPowerup();
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
          sound.playCountdownTick(msg.timeLeft <= 3);
        }
        break;

      case 'ANSWER_ACK':
        setPhase('SUBMITTED');
        sound.playPop();
        break;

      case 'PLAYER_RESULT':
        setPhase('RESULT');
        if (msg.exploded) {
          setExplodedPlayerId(playerId);
        }
        setResultData({
          isCorrect: msg.isCorrect,
          pointsEarned: msg.pointsEarned,
          totalScore: msg.totalScore,
          streak: msg.streak,
          rank: msg.rank,
          correctIndex: msg.correctIndex,
          exploded: !!msg.exploded,
        });
        if (msg.exploded) {
          sound.playExplosion();
        } else if (msg.isCorrect) {
          sound.playCorrect();
        } else if (gameMode === 'glass_bridge') {
          sound.playGlassShatter();
        } else {
          sound.playIncorrect();
        }
        break;

      case 'GAME_OVER': {
        setPhase('FINISHED');
        sound.playFanfare();
        const podium = msg.finalPodium || [];
        setFinalPodium(podium);
        setPostGameAwards(msg.awards || []);
        if (msg.teamStandings) setTeamStandings(msg.teamStandings);
        const myInfo = playerId ? podium.find((p: any) => p.id === playerId) : podium[0];
        if (myInfo) {
          setFinalRank({
            rank: myInfo.rank || 1,
            score: myInfo.score || 0,
            totalPlayers: podium.length
          });
          if (myInfo.rank <= 3) {
            confetti({ particleCount: 100, spread: 70 });
          }
        } else {
          setFinalRank({
            rank: 1,
            score: resultData?.totalScore || 0,
            totalPlayers: Math.max(1, podium.length)
          });
        }
        break;
      }

      case 'GAME_RESET':
        setPhase('LOBBY');
        setSelectedOption(null);
        setResultData(null);
        setFinalPodium([]);
        setPostGameAwards([]);
        setBombHolderId(null);
        setExplodedPlayerId(null);
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
        avatar,
        teamId
      }));
    } else {
      setErrorMsg('Tidak terhubung ke server.');
    }
  };

  const changePlayerTeam = (newTeam: TeamId) => {
    setTeamId(newTeam);
    sound.playPop();
    setArenaPlayers(prev => prev.map(p => p.id === playerId ? { ...p, teamId: newTeam } : p));
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && roomCode) {
      wsRef.current.send(JSON.stringify({
        type: 'CHANGE_TEAM',
        teamId: newTeam
      }));
    }
  };

  const submitAnswer = (index: number) => {
    if (selectedOption !== null && phase === 'SUBMITTED' && gameMode === 'classic') return;
    setSelectedOption(index);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'SUBMIT_ANSWER',
        answerIndex: index
      }));
    }
    sound.playPop();
  };

  const handlePlayerMove = (x: number, z: number, jumping: boolean, zoneIndex: number | null) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PLAYER_MOVE',
        x,
        z,
        jumping,
        answerIndex: zoneIndex
      }));
    }
    if (zoneIndex !== null && zoneIndex !== selectedOption) {
      setSelectedOption(zoneIndex);
    }
  };

  const useFiftyFifty = () => {
    if (!fiftyFiftyLeft || hiddenOptions.length > 0) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'USE_FIFTY_FIFTY' }));
    }
  };

  const useDoublePoints = () => {
    if (!doublePointsLeft || activeDouble) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'USE_DOUBLE_POINTS' }));
    }
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

  const renderReactionDock = () => {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#111827] border-2 border-black px-3 py-2 rounded-xl shadow-[4px_4px_0px_#000] flex items-center gap-1.5 sm:gap-2">
        <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider px-2 hidden sm:inline">
          Reaksi:
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

  const renderBombToast = () => {
    if (!bombToast) return null;
    return (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-red-600 text-white font-black text-xs sm:text-sm px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2">
          <span>{bombToast.text}</span>
        </div>
      </div>
    );
  };

  const renderPlayerModeSwitcher = () => {
    const modes: { id: GameMode; label: string; icon: string }[] = [
      { id: 'bomb_tag', label: 'Estafet Bom', icon: '💣' },
      { id: 'glass_bridge', label: 'Jembatan Kaca', icon: '🌉' },
      { id: 'lava_tiles', label: 'Lantai Lava', icon: '🌋' },
      { id: 'classic', label: 'Klasik', icon: '📋' },
    ];

    return (
      <div className="flex items-center gap-1 bg-[#0b0f19] border-2 border-black p-1 rounded-xl shadow-[2px_2px_0px_#000]">
        {modes.map(m => {
          const isSelected = gameMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setGameMode(m.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 border-black shadow-[1px_1px_0px_#000]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border-transparent'
              }`}
            >
              <span>{m.icon}</span>
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderAudioControls = () => (
    <div className="inline-flex items-center gap-1 bg-[#0b0f19] border-2 border-black p-1 rounded-xl shadow-[2px_2px_0px_#000]">
      <button
        type="button"
        onClick={() => sound.toggleSfx()}
        className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer border ${
          audioState.sfxEnabled
            ? 'bg-emerald-500 text-slate-950 border-black'
            : 'text-slate-400 hover:text-white hover:bg-slate-800 border-transparent'
        }`}
        title={audioState.sfxEnabled ? 'Matikan Efek Suara (SFX)' : 'Nyalakan Efek Suara (SFX)'}
      >
        {audioState.sfxEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        <span>{audioState.sfxEnabled ? 'SFX' : 'MUTE'}</span>
      </button>
      <button
        type="button"
        onClick={() => sound.toggleBgm()}
        className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer border ${
          audioState.bgmEnabled
            ? 'bg-amber-400 text-slate-950 border-black'
            : 'text-slate-400 hover:text-white hover:bg-slate-800 border-transparent'
        }`}
        title={audioState.bgmEnabled ? 'Matikan Musik Latar Tema (BGM)' : 'Nyalakan Musik Latar Tema (BGM)'}
      >
        <span>🎵</span>
        <span>{audioState.bgmEnabled ? 'BGM ON' : 'BGM'}</span>
      </button>
    </div>
  );

  // 1. Join Room Phase
  if (phase === 'JOIN') {
    return (
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="arcade-card p-6 sm:p-8 bg-[#151c2c]">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center mx-auto mb-3 border-2 border-black shadow-[3px_3px_0px_#000]">
              <Gamepad2 className="w-7 h-7" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${
                wsConnected 
                  ? 'bg-emerald-500 text-slate-950 border-black' 
                  : 'bg-amber-400 text-slate-950 border-black'
              }`}>
                <Radio className="w-3 h-3" />
                {wsConnected ? 'Server Online' : 'Connecting...'}
              </span>
              {renderAudioControls()}
            </div>
            <h2 className="font-['Space_Grotesk',sans-serif] text-2xl font-black text-white">Gabung Permainan</h2>
            <p className="text-slate-400 text-xs mt-1 font-medium">Masukkan PIN 6 digit dari layar Host untuk memulai</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/70 border-2 border-red-500 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={joinRoom} className="space-y-4">
            <div>
              <label htmlFor="player-pin" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                PIN Kuis (6 Digit)
              </label>
              <input
                id="player-pin"
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full bg-[#0b0f19] border-2 border-black rounded-lg px-4 py-3 text-center text-3xl font-mono font-bold tracking-widest text-amber-400 focus:outline-none focus:ring-0 placeholder:text-slate-700"
                required
              />
            </div>

            <div>
              <label htmlFor="player-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Nama Panggilan
              </label>
              <input
                id="player-name"
                type="text"
                maxLength={12}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi, Sarah"
                className="w-full bg-[#0b0f19] border-2 border-black rounded-lg px-4 py-3 text-white font-bold text-base focus:outline-none focus:ring-0 placeholder:text-slate-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Pilih Avatar Pemain
              </label>
              <div className="flex flex-wrap gap-2 justify-center bg-[#0b0f19] p-3 rounded-xl border-2 border-black">
                {AVATARS.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setAvatar(emoji)}
                    className={`text-2xl p-2 rounded-lg transition-transform border-2 ${
                      avatar === emoji 
                        ? 'bg-amber-400 text-slate-950 border-black shadow-[2px_2px_0px_#000] scale-110' 
                        : 'border-transparent hover:bg-slate-800'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                Pilih Skuad Tim (4 Guild)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['red', 'blue', 'green', 'gold'] as TeamId[]).map((tid) => {
                  const cfg = TEAM_CONFIGS[tid];
                  const active = teamId === tid;
                  return (
                    <button
                      type="button"
                      key={tid}
                      onClick={() => {
                        sound.playPop();
                        setTeamId(tid);
                      }}
                      className={`p-2.5 rounded-xl border-2 border-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        active
                          ? `${cfg.bgClass} ${cfg.textClass} shadow-[3px_3px_0px_#000] scale-[1.02]`
                          : 'bg-[#0b0f19] text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base">{cfg.icon}</span>
                      <span>{cfg.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={!wsConnected}
              className="w-full mt-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3.5 px-4 rounded-xl arcade-btn flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Masuk Room Kuis</span>
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
        {renderBombToast()}
        <div className="max-w-2xl mx-auto py-8 px-4 pb-24 text-center">
          <div className="arcade-card p-6 sm:p-8 bg-[#151c2c]">
            {/* Top Player Status & Mode Switch */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b-2 border-black">
              <div className="flex items-center gap-3 text-left">
                <span className="text-4xl p-2 bg-[#0b0f19] border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">{avatar}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-['Space_Grotesk',sans-serif] text-xl font-black text-white">{name}</h2>
                    {TEAM_CONFIGS[teamId] && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black border border-black ${TEAM_CONFIGS[teamId].bgClass} ${TEAM_CONFIGS[teamId].textClass}`}>
                        {TEAM_CONFIGS[teamId].icon} {TEAM_CONFIGS[teamId].shortName}
                      </span>
                    )}
                  </div>
                  <p className="text-amber-400 text-xs font-mono font-bold">ROOM PIN: {roomCode}</p>
                </div>
              </div>

              {renderPlayerModeSwitcher()}
            </div>

            {/* Guild Team Switcher in Lobby */}
            <div className="mb-5 bg-[#0b0f19] border-2 border-black rounded-xl p-3">
              <span className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                👥 Pilih Skuad Guild Kamu {teamMode ? '(Mode Battle Tim Aktif!)' : '(Seragam Karakter 3D)'}:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['red', 'blue', 'green', 'gold'] as TeamId[]).map((tid) => {
                  const cfg = TEAM_CONFIGS[tid];
                  const active = teamId === tid;
                  return (
                    <button
                      key={tid}
                      type="button"
                      onClick={() => changePlayerTeam(tid)}
                      className={`py-2 px-2.5 rounded-lg border-2 border-black text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        active
                          ? `${cfg.bgClass} ${cfg.textClass} shadow-[2px_2px_0px_#000]`
                          : 'bg-[#151c2c] text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{cfg.icon}</span>
                      <span>{cfg.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Roblox Interactive Arena in Lobby */}
            {gameMode !== 'classic' && (
              <div className="mb-6">
                <div className="text-xs font-mono font-bold text-amber-400 mb-2 flex items-center justify-center gap-1.5">
                  <span>{gameMode === 'bomb_tag' ? 'Latihan Estafet Bom (WASD / Tombol Arah)' : gameMode === 'glass_bridge' ? 'Latihan Jembatan Kaca (WASD / Tombol Arah)' : 'Latihan Lantai Lava (WASD / Tombol Arah)'}</span>
                </div>
                <div className="border-2 border-black shadow-[4px_4px_0px_#000] rounded-2xl overflow-hidden">
                  <RobloxArena3D
                    phase="LOBBY"
                    arenaMode={gameMode}
                    bombHolderId={bombHolderId}
                    explodedPlayerId={explodedPlayerId}
                    localPlayerId={playerId}
                    players={arenaPlayers}
                    worldTheme={worldTheme}
                    onMove={handlePlayerMove}
                  />
                </div>
              </div>
            )}

            <div className="py-5 px-4 bg-[#0b0f19] rounded-xl border-2 border-black">
              <div className="inline-block w-6 h-6 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-white font-bold text-sm">Kamu sudah bergabung di room!</p>
              <p className="text-slate-400 text-xs mt-1 font-medium">Perhatikan layar Host. Permainan akan segera dimulai...</p>
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
          <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-2">BERSIAPLAH</span>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl font-black text-white mb-6">Pertanyaan Segera Hadir!</h2>
          <div className="w-24 h-24 bg-amber-400 text-slate-950 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-center text-5xl font-black font-mono">
            🚀
          </div>
        </div>
      </>
    );
  }

  // 4. Question & Submitted Phase
  if ((phase === 'QUESTION' || phase === 'SUBMITTED') && questionData) {
    if (gameMode !== 'classic') {
      return (
        <>
          {renderFloatingReactions()}
          {renderBombToast()}
          <div className="max-w-3xl mx-auto py-3 px-3 sm:px-4 pb-24">
            {/* Top Bar Info & Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-slate-300 bg-[#151c2c] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold bg-[#0b0f19] px-2.5 py-1 rounded text-amber-400 border border-black">
                  SOAL {questionData.questionIndex + 1}/{questionData.totalQuestions}
                </span>
                {renderPlayerModeSwitcher()}
              </div>

              <div className="flex items-center gap-3">
                {selectedOption !== null && (
                  <span className="hidden sm:inline-block text-[11px] font-mono font-bold text-emerald-400 bg-[#0b0f19] border border-black px-2 py-0.5 rounded">
                    ✓ TERPILIH: {OPTION_THEMES[selectedOption].shape} {OPTION_THEMES[selectedOption].label}
                  </span>
                )}
                <span className={`font-mono font-bold text-sm sm:text-base flex items-center gap-1 ${
                  timeLeft <= 5 ? 'text-red-500 font-black' : 'text-amber-400'
                }`}>
                  <Clock className="w-4 h-4" /> {timeLeft}s
                </span>
              </div>
            </div>

            {/* Prominent Question Banner Card (Always Visible on Mobile & Desktop) */}
            <div className="iso-card p-4 sm:p-5 mb-3 bg-[#151c2c] border-2 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-amber-400 bg-[#0b0f19] px-2 py-0.5 rounded border border-black">
                  PERTANYAAN AKTIF
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Pilih jawaban dengan tombol atau lari ke petak 3D
                </span>
              </div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-base sm:text-xl md:text-2xl font-black text-white leading-snug">
                {questionData.text}
              </h2>
            </div>

            {/* Power-Up Lifelines Bar */}
            <div className="bg-[#151c2c] border-2 border-black p-3 rounded-xl mb-3 shadow-[2px_2px_0px_#000]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> POWER-UP LIFELINES:
                </span>
                {activeDouble && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 border border-black">
                    2x POIN AKTIF!
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={useFiftyFifty}
                  disabled={!fiftyFiftyLeft || hiddenOptions.length > 0}
                  className={`py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 border-2 border-black ${
                    fiftyFiftyLeft && hiddenOptions.length === 0
                      ? 'bg-[#2563eb] hover:bg-blue-500 text-white shadow-[2px_2px_0px_#000] arcade-btn'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>✂️ 50:50</span>
                  <span className="text-[10px] opacity-90">{fiftyFiftyLeft ? '(Tersedia)' : '(Terpakai)'}</span>
                </button>

                <button
                  type="button"
                  onClick={useDoublePoints}
                  disabled={!doublePointsLeft || activeDouble}
                  className={`py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 border-2 border-black ${
                    doublePointsLeft && !activeDouble
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[2px_2px_0px_#000] arcade-btn'
                      : activeDouble
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>🚀 2x Poin</span>
                  <span className="text-[10px] opacity-90">{activeDouble ? 'AKTIF' : doublePointsLeft ? '(Tersedia)' : '(Terpakai)'}</span>
                </button>
              </div>
            </div>

            {/* 3D Roblox Arena */}
            <div className="mb-3 border-2 border-black shadow-[4px_4px_0px_#000] rounded-2xl overflow-hidden">
              <RobloxArena3D
                phase="QUESTION"
                arenaMode={gameMode}
                bombHolderId={bombHolderId}
                explodedPlayerId={explodedPlayerId}
                localPlayerId={playerId}
                players={arenaPlayers}
                options={questionData.options}
                questionText={questionData.text}
                timeLeft={timeLeft}
                worldTheme={worldTheme}
                onMove={handlePlayerMove}
                onSelectZone={submitAnswer}
                selectedZone={selectedOption}
              />
            </div>

            {/* 4 Interactive Isometric Option Tiles (Click or Walk) */}
            <div className="grid grid-cols-2 gap-2.5 mb-2">
              {questionData.options.map((opt, idx) => {
                const theme = OPTION_THEMES[idx];
                const isHidden = hiddenOptions.includes(idx);
                const isSelected = selectedOption === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => submitAnswer(idx)}
                    disabled={isHidden}
                    className={`p-3.5 rounded-xl font-bold transition-all flex items-center justify-between text-left border-2 border-black iso-tile ${
                      isHidden
                        ? 'opacity-20 pointer-events-none line-through grayscale bg-slate-800'
                        : `${theme.bg} ${theme.text} ${isSelected ? 'ring-4 ring-white scale-[1.03] shadow-[6px_6px_0px_#000]' : 'shadow-[4px_4px_0px_#000]'}`
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="w-7 h-7 rounded bg-black/25 text-white flex items-center justify-center text-xs font-mono shrink-0">
                        {theme.shape}
                      </span>
                      <span className="text-xs sm:text-sm font-bold truncate leading-tight">
                        {opt}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-black bg-black text-amber-400 px-1.5 py-0.5 rounded ml-1 shrink-0">
                        DIPILIH
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-[11px] font-mono text-slate-400">
              Gerakkan karakter ke petak pilihan atau klik tombol warna di atas sebelum waktu habis.
            </p>
          </div>
          {renderReactionDock()}
        </>
      );
    }

    // Classic 2D Question Phase
    if (phase === 'QUESTION') {
      return (
        <>
          {renderFloatingReactions()}
          <div className="max-w-lg mx-auto py-4 px-4 pb-24 flex flex-col min-h-[85vh] justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold bg-[#0b0f19] px-3 py-1 rounded text-amber-400 border border-black">
                    SOAL {questionData.questionIndex + 1}/{questionData.totalQuestions}
                  </span>
                  {renderPlayerModeSwitcher()}
                </div>
                <span className={`font-mono font-bold text-sm flex items-center gap-1 ${
                  timeLeft <= 5 ? 'text-red-500 font-black' : 'text-amber-400'
                }`}>
                  <Clock className="w-4 h-4" /> {timeLeft}s
                </span>
              </div>

              <div className="arcade-card p-5 mb-4 text-center bg-[#151c2c]">
                <p className="font-['Space_Grotesk',sans-serif] text-lg font-bold text-white leading-snug">
                  {questionData.text}
                </p>
              </div>

              {/* Power-Up Lifelines Bar Classic */}
              <div className="bg-[#151c2c] border-2 border-black p-3 rounded-xl mb-4 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> POWER-UP LIFELINES:
                  </span>
                  {activeDouble && (
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 border border-black">
                      2x POIN AKTIF!
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={useFiftyFifty}
                    disabled={!fiftyFiftyLeft || hiddenOptions.length > 0 || selectedOption !== null}
                    className={`py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 border-2 border-black ${
                      fiftyFiftyLeft && hiddenOptions.length === 0 && selectedOption === null
                        ? 'bg-[#2563eb] hover:bg-blue-500 text-white shadow-[2px_2px_0px_#000] arcade-btn'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <span>✂️ 50:50</span>
                    <span className="text-[10px] opacity-90">{fiftyFiftyLeft ? '(Tersedia)' : '(Terpakai)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={useDoublePoints}
                    disabled={!doublePointsLeft || activeDouble || selectedOption !== null}
                    className={`py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 border-2 border-black ${
                      doublePointsLeft && !activeDouble && selectedOption === null
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[2px_2px_0px_#000] arcade-btn'
                        : activeDouble
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <span>🚀 2x Poin</span>
                    <span className="text-[10px] opacity-90">{activeDouble ? 'AKTIF' : doublePointsLeft ? '(Tersedia)' : '(Terpakai)'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Big Isometric Option Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
              {questionData.options.map((opt, idx) => {
                const theme = OPTION_THEMES[idx];
                const isHidden = hiddenOptions.includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => submitAnswer(idx)}
                    disabled={isHidden || selectedOption !== null}
                    className={`w-full py-5 px-4 rounded-xl font-bold border-2 border-black iso-tile shadow-[5px_5px_0px_#000] flex items-center gap-3 transition-all ${
                      isHidden
                        ? 'opacity-20 pointer-events-none line-through grayscale bg-slate-800'
                        : `${theme.bg} ${theme.text}`
                    }`}
                  >
                    <span className="w-9 h-9 rounded bg-black/25 text-white flex items-center justify-center text-xl font-mono shrink-0">
                      {theme.shape}
                    </span>
                    <span className="text-left text-base leading-tight font-bold flex-1">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-400 mt-3 mb-2 font-mono">
              Pilih jawaban secepat mungkin untuk skor kecepatan tertinggi.
            </p>
          </div>
          {renderReactionDock()}
        </>
      );
    }

    // Classic 2D Submitted Phase
    if (phase === 'SUBMITTED') {
      const chosenTheme = selectedOption !== null ? OPTION_THEMES[selectedOption] : null;

      return (
        <>
          {renderFloatingReactions()}
          <div className="max-w-md mx-auto py-16 px-4 pb-24 text-center">
            <div className="arcade-card p-8 bg-[#151c2c]">
              <div className="w-16 h-16 bg-amber-400 text-slate-950 border-2 border-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#000]">
                <Send className="w-8 h-8" />
              </div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-2xl font-black text-white mb-2">Jawaban Terkirim!</h2>
              <p className="text-slate-400 text-xs mb-6 font-medium">Menunggu peserta lain dan waktu soal berakhir...</p>

              {chosenTheme && (
                <div className={`p-4 rounded-xl font-bold border-2 border-black ${chosenTheme.bg} ${chosenTheme.text} inline-flex items-center gap-2 shadow-[3px_3px_0px_#000] mb-6`}>
                  <span>{chosenTheme.shape}</span>
                  <span>Kamu memilih: {questionData?.options[selectedOption!]}</span>
                </div>
              )}

              <div className="flex justify-center">
                {renderPlayerModeSwitcher()}
              </div>
            </div>
          </div>
          {renderReactionDock()}
        </>
      );
    }
  }

  // 6. Result Phase (Instant feedback after question ends)
  if (phase === 'RESULT' && resultData) {
    return (
      <>
        {renderFloatingReactions()}
        {renderBombToast()}
        <div className="max-w-2xl mx-auto py-6 px-4 pb-24 text-center">
          {/* 3D Collapse / Shatter / Explosion Animation in Result Phase */}
          {gameMode !== 'classic' && (
            <div className="mb-6">
              <div className="text-xs font-mono font-bold text-amber-400 mb-2 flex items-center justify-center gap-1.5">
                <span>{gameMode === 'bomb_tag' ? 'KABOOM! Bom meledak & melontarkan pemegang bom!' : gameMode === 'glass_bridge' ? 'Kaca salah pecah ke jurang! Jalur benar bersinar!' : 'Ubin salah runtuh ke lava! Petak benar bertahan!'}</span>
              </div>
              <div className="border-2 border-black shadow-[4px_4px_0px_#000] rounded-2xl overflow-hidden">
                <RobloxArena3D
                  phase="REVIEW"
                  arenaMode={gameMode}
                  bombHolderId={bombHolderId}
                  explodedPlayerId={explodedPlayerId}
                  localPlayerId={playerId}
                  players={arenaPlayers}
                  correctIndex={resultData.correctIndex}
                  options={questionData?.options}
                  questionText={questionData?.text}
                  worldTheme={worldTheme}
                />
              </div>
            </div>
          )}

          <div className={`arcade-card p-6 sm:p-8 ${
            resultData.exploded
              ? 'bg-red-950 border-red-500'
              : resultData.isCorrect 
              ? 'bg-emerald-950 border-emerald-500' 
              : 'bg-red-950 border-red-500'
          }`}>
            {resultData.exploded ? (
              <div>
                <span className="text-6xl block mb-2">💥💣</span>
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-red-400">KABOOM! BOM MELEDAK!</h2>
                <p className="text-red-200 font-bold text-sm mt-1">Kamu memegang bom saat waktu habis. 0 poin di ronde ini.</p>
              </div>
            ) : resultData.isCorrect ? (
              <div>
                <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-400 mx-auto mb-3" />
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-white">BENAR! 🎉</h2>
                <p className="text-emerald-300 font-mono text-2xl font-black mt-2">
                  +{resultData.pointsEarned} pts
                </p>
                {resultData.streak > 1 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0b0f19] border-2 border-black rounded-lg text-amber-400 text-xs font-mono font-bold mt-3">
                    <Flame className="w-4 h-4 fill-current text-amber-400" />
                    <span>{resultData.streak}x Streak Beruntun!</span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <XCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-400 mx-auto mb-3" />
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl sm:text-3xl font-black text-white">KURANG TEPAT! ❌</h2>
                <p className="text-red-200 text-sm mt-2 font-medium">
                  Jawaban benar: <strong>{questionData?.options[resultData.correctIndex]}</strong>
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t-2 border-black flex items-center justify-around text-center">
              <div>
                <span className="text-xs uppercase font-mono text-slate-400 font-bold block">Peringkatmu</span>
                <span className="text-2xl font-black text-white font-mono">#{resultData.rank}</span>
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-slate-400 font-bold block">Total Skor</span>
                <span className="text-2xl font-black text-amber-400 font-mono">{resultData.totalScore}</span>
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
    const mySummary = finalPodium.find((p) => p.id === playerId);
    const myAwards = postGameAwards.filter((aw) => aw.playerId === playerId);

    return (
      <>
        {renderFloatingReactions()}
        <div className="max-w-4xl mx-auto py-8 px-4 pb-24 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold bg-amber-400 text-slate-950 border-2 border-black shadow-[2px_2px_0px_#000]">
              🏆 CHAMPIONSHIP PODIUM
            </span>
            {renderAudioControls()}
          </div>
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl font-black text-white mb-2">Permainan Selesai!</h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 font-medium">
            Lihat posisi karakter 3D di panggung juara dan statistik akhir permainanmu.
          </p>

          {/* Interactive 3D Podium Stage */}
          {finalPodium.length > 0 && (
            <PodiumArena3D podium={finalPodium} worldTheme={worldTheme} />
          )}

          {/* Squad Standings Banner when Team Mode is Active */}
          {teamMode && teamStandings.length > 0 && (
            <div className="bg-[#151c2c] border-2 border-black p-4 rounded-xl mb-6 shadow-[4px_4px_0px_#000] text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  ⚔️ Klasemen Akhir Skuad (Skor Rata-Rata Tim)
                </span>
                {teamStandings[0] && teamStandings[0].memberCount > 0 && (
                  <span className="text-[11px] font-mono font-black px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 border border-black">
                    🏆 JUARA: {teamStandings[0].icon} {teamStandings[0].name}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {teamStandings.map((t, idx) => {
                  const cfg = TEAM_CONFIGS[t.teamId];
                  const isMyTeam = t.teamId === teamId;
                  return (
                    <div
                      key={t.teamId}
                      className={`p-3 rounded-xl border-2 border-black ${cfg.bgClass} ${cfg.textClass} ${
                        isMyTeam ? 'ring-2 ring-amber-400 shadow-[3px_3px_0px_#000]' : 'opacity-90'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-black mb-1">
                        <span>#{idx + 1} {cfg.icon} {cfg.shortName}</span>
                        <span>{t.memberCount} org</span>
                      </div>
                      <div className="text-lg font-mono font-black">{t.avgScore} pts</div>
                      {isMyTeam && (
                        <span className="inline-block mt-1 text-[10px] font-mono font-black bg-black/40 px-1.5 py-0.5 rounded text-amber-300">
                          SKUADMU
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Player Personal Performance Report Card */}
          <div className="arcade-card p-6 sm:p-8 bg-[#151c2c] max-w-xl mx-auto mb-8">
            <Award className="w-14 h-14 text-amber-400 mx-auto mb-2" />
            <div className="p-5 bg-[#0b0f19] rounded-xl border-2 border-black mb-5">
              <span className="text-xs uppercase font-mono text-slate-400 font-bold">Peringkat Akhirmu</span>
              <p className="text-5xl font-black text-amber-400 my-1.5 font-mono">
                #{finalRank.rank}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                dari total {finalRank.totalPlayers} peserta
              </p>

              <div className="mt-4 pt-4 border-t-2 border-black grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Total Skor</span>
                  <span className="text-lg sm:text-xl font-mono font-black text-amber-400">{finalRank.score}</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Akurasi</span>
                  <span className="text-lg sm:text-xl font-mono font-black text-emerald-400">
                    {mySummary ? `${mySummary.correctCount ?? 0}/${mySummary.totalQuestions ?? 5}` : '-'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Max Streak</span>
                  <span className="text-lg sm:text-xl font-mono font-black text-white">
                    🔥 {mySummary ? (mySummary.maxStreak ?? mySummary.streak ?? 0) : 0}x
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Earned Badges */}
            {myAwards.length > 0 && (
              <div className="mb-6 text-left">
                <span className="block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 text-center">
                  🎖️ Gelar Spesial yang Kamu Raih:
                </span>
                <div className="grid gap-2">
                  {myAwards.map((aw) => (
                    <div
                      key={aw.id}
                      className="bg-[#0b0f19] border-2 border-amber-400 rounded-xl p-3 flex items-center justify-between gap-3 shadow-[2px_2px_0px_#000]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{aw.icon}</span>
                        <div>
                          <p className="font-bold text-white text-xs sm:text-sm">{aw.title}</p>
                          <p className="text-[11px] text-slate-400">{aw.description}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded border border-black shrink-0">
                        {aw.statLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setPhase('JOIN');
                setPin('');
              }}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3.5 px-4 rounded-xl arcade-btn cursor-pointer"
            >
              Main Lagi di Room Baru
            </button>
          </div>

          {/* All Post-Game Special Awards */}
          {postGameAwards.length > 0 && (
            <div className="text-left">
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3 text-center">
                🌟 Daftar Penerima Penghargaan Unik Arena:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {postGameAwards.map((aw) => (
                  <div
                    key={aw.id}
                    className="iso-card bg-[#151c2c] p-4 rounded-xl border-2 border-black flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl p-2 bg-[#0b0f19] border border-black rounded-lg shrink-0">
                        {aw.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="font-['Space_Grotesk'] font-black text-white text-xs sm:text-sm truncate">
                          {aw.title}
                        </p>
                        <p className="text-xs text-amber-400 font-bold truncate">
                          {aw.playerAvatar} {aw.playerName}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-black bg-[#0b0f19] text-emerald-400 px-2.5 py-1 rounded border border-black shrink-0">
                      {aw.statLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {renderReactionDock()}
      </>
    );
  }

  return null;
}
