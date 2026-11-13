import type { WorldTheme } from '../../types/quiz';

// Web Audio API Retro Arcade Synthesizer & Procedural BGM Engine
// Zero external MP3 assets required. Works offline & instantly in browser.

type SoundListener = (state: { sfxEnabled: boolean; bgmEnabled: boolean; theme: WorldTheme }) => void;

class SoundEffects {
  private ctx: AudioContext | null = null;
  private sfxEnabled = true;
  private bgmEnabled = false;
  private currentTheme: WorldTheme = 'arcade';
  private bgmTimer: number | null = null;
  private bgmStep = 0;
  private isUrgent = false;
  private listeners = new Set<SoundListener>();

  constructor() {
    if (typeof window !== 'undefined') {
      const savedSfx = window.localStorage.getItem('astroquiz_sfx_enabled');
      if (savedSfx !== null) this.sfxEnabled = savedSfx === 'true';

      const savedBgm = window.localStorage.getItem('astroquiz_bgm_enabled');
      if (savedBgm !== null) this.bgmEnabled = savedBgm === 'true';
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  subscribe(listener: SoundListener): () => void {
    this.listeners.add(listener);
    listener({
      sfxEnabled: this.sfxEnabled,
      bgmEnabled: this.bgmEnabled,
      theme: this.currentTheme,
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const snapshot = {
      sfxEnabled: this.sfxEnabled,
      bgmEnabled: this.bgmEnabled,
      theme: this.currentTheme,
    };
    this.listeners.forEach((cb) => cb(snapshot));
  }

  getState() {
    return {
      sfxEnabled: this.sfxEnabled,
      bgmEnabled: this.bgmEnabled,
      theme: this.currentTheme,
    };
  }

  setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('astroquiz_sfx_enabled', String(enabled));
    }
    if (enabled) {
      this.playPop();
    }
    this.notify();
  }

  toggleSfx(): boolean {
    this.setSfxEnabled(!this.sfxEnabled);
    return this.sfxEnabled;
  }

  setBgmEnabled(enabled: boolean) {
    this.bgmEnabled = enabled;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('astroquiz_bgm_enabled', String(enabled));
    }
    if (enabled) {
      this.initCtx();
      this.startBgmLoop();
    } else {
      this.stopBgmLoop();
    }
    this.notify();
  }

  toggleBgm(): boolean {
    this.setBgmEnabled(!this.bgmEnabled);
    return this.bgmEnabled;
  }

  setTheme(theme: WorldTheme) {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.bgmStep = 0;
      this.notify();
    }
  }

  setUrgentMode(urgent: boolean) {
    if (this.isUrgent !== urgent) {
      this.isUrgent = urgent;
      if (this.bgmEnabled) {
        this.startBgmLoop();
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Procedural Chiptune Background Music (4 World Themes)
  // ---------------------------------------------------------------------------
  startBgmLoop() {
    if (typeof window === 'undefined') return;
    this.stopBgmLoop();
    if (!this.bgmEnabled) return;

    const intervalMs = this.isUrgent ? 145 : 210;
    this.bgmTimer = window.setInterval(() => {
      if (!this.bgmEnabled) return;
      this.playBgmStep();
    }, intervalMs);
  }

  stopBgmLoop() {
    if (this.bgmTimer !== null && typeof window !== 'undefined') {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  private playBgmStep() {
    try {
      const ctx = this.initCtx();
      if (!ctx || ctx.state !== 'running') return;

      // Melodies in Hz (0 = rest)
      const patterns: Record<WorldTheme, { lead: number[]; bass: number[]; wave: OscillatorType }> = {
        arcade: {
          // Upbeat Cyber Synthwave (A minor / C major pentatonic)
          lead: [440, 0, 523.25, 659.25, 587.33, 0, 523.25, 392.0, 440, 523.25, 659.25, 783.99, 659.25, 523.25, 587.33, 0],
          bass: [110, 110, 130.81, 130.81, 146.83, 146.83, 98.0, 98.0],
          wave: 'square',
        },
        pirate: {
          // Sea Shanty Jig (D Dorian)
          lead: [293.66, 349.23, 440, 440, 440, 493.88, 523.25, 440, 392.0, 349.23, 329.63, 293.66, 329.63, 392.0, 293.66, 0],
          bass: [146.83, 0, 110, 0, 130.81, 0, 98.0, 110],
          wave: 'triangle',
        },
        space: {
          // Cosmic Sci-Fi Arpeggiator (E minor 9)
          lead: [329.63, 493.88, 659.25, 739.99, 587.33, 493.88, 392.0, 493.88, 329.63, 523.25, 659.25, 783.99, 659.25, 523.25, 493.88, 0],
          bass: [82.41, 82.41, 98.0, 98.0, 110, 110, 123.47, 123.47],
          wave: 'sine',
        },
        castle: {
          // Medieval Fortress March (G Harmonic Minor)
          lead: [392.0, 0, 466.16, 392.0, 587.33, 0, 523.25, 466.16, 440, 392.0, 370.0, 440, 392.0, 0, 293.66, 0],
          bass: [98.0, 146.83, 98.0, 146.83, 116.54, 146.83, 110, 98.0],
          wave: 'sawtooth',
        },
      };

      const pat = patterns[this.currentTheme] || patterns.arcade;
      const step = this.bgmStep++;
      const now = ctx.currentTime;

      const leadFreq = pat.lead[step % pat.lead.length];
      const bassFreq = pat.bass[step % pat.bass.length];

      if (leadFreq > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = pat.wave;
        const pitchMult = this.isUrgent ? 1.06 : 1.0;
        osc.frequency.setValueAtTime(leadFreq * pitchMult, now);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.002, now + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.17);
      }

      if (bassFreq > 0 && step % 2 === 0) {
        const bOsc = ctx.createOscillator();
        const bGain = ctx.createGain();
        bOsc.type = 'triangle';
        bOsc.frequency.setValueAtTime(bassFreq, now);

        bGain.gain.setValueAtTime(0.06, now);
        bGain.gain.exponentialRampToValueAtTime(0.003, now + 0.28);

        bOsc.connect(bGain);
        bGain.connect(ctx.destination);
        bOsc.start(now);
        bOsc.stop(now + 0.3);
      }
    } catch {}
  }

  // ---------------------------------------------------------------------------
  // Arcade Sound Effects (SFX)
  // ---------------------------------------------------------------------------
  playPop() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(860, now + 0.075);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  playJump() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(185, now);
      osc.frequency.exponentialRampToValueAtTime(590, now + 0.16);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.008, now + 0.17);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {}
  }

  playTileSelect(zoneIdx: number) {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 987.77]; // C5, E5, G5, B5
      const freq = notes[zoneIdx % notes.length] || 523.25;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * 0.85, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.09);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.008, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  playQuestionStart() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [392.0, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.065);
        gain.gain.setValueAtTime(0.2, now + idx * 0.065);
        gain.gain.exponentialRampToValueAtTime(0.008, now + idx * 0.065 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.065);
        osc.stop(now + idx * 0.065 + 0.16);
      });
    } catch {}
  }

  playBombPass() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Urgent two-tone siren sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.linearRampToValueAtTime(980, now + 0.09);
      osc.frequency.linearRampToValueAtTime(540, now + 0.22);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  playExplosion() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. White noise burst through sweeping low-pass filter
      const bufferSize = ctx.sampleRate * 0.7;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, now);
      filter.frequency.exponentialRampToValueAtTime(55, now + 0.65);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.42, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.68);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.7);

      // 2. Sub-bass impact drop
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(130, now);
      subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.55);

      subGain.gain.setValueAtTime(0.35, now);
      subGain.gain.exponentialRampToValueAtTime(0.008, now + 0.58);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.6);
    } catch {}
  }

  playGlassShatter() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const shards = [2200, 2850, 3500, 4150, 1750];
      shards.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.025);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.55, now + idx * 0.025 + 0.14);

        gain.gain.setValueAtTime(0.16, now + idx * 0.025);
        gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.025 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.025);
        osc.stop(now + idx * 0.025 + 0.16);
      });
    } catch {}
  }

  playPowerup() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73]; // A4 major arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.22, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.008, now + idx * 0.05 + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.17);
      });
    } catch {}
  }

  playCorrect() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';

      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.09); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.18); // G5
      osc.frequency.setValueAtTime(1046.5, now + 0.27); // C6

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.48);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }

  playIncorrect() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.setValueAtTime(174.61, now + 0.16); // F3

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.44);
    } catch {}
  }

  playCountdownTick(urgent = false) {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = urgent ? 'square' : 'sine';
      osc.frequency.setValueAtTime(urgent ? 880 : 620, now);

      gain.gain.setValueAtTime(urgent ? 0.22 : 0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.065);

      if (urgent) {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(1174.66, now + 0.1);
        gain2.gain.setValueAtTime(0.16, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.008, now + 0.16);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.17);
      }
    } catch {}
  }

  playFanfare() {
    if (!this.sfxEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Victory trumpet melody: C5, C5, C5, G5, E5, G5, C6
      const melody = [
        { f: 523.25, t: 0.0, d: 0.11 },
        { f: 523.25, t: 0.13, d: 0.11 },
        { f: 523.25, t: 0.26, d: 0.11 },
        { f: 783.99, t: 0.4, d: 0.26 },
        { f: 659.25, t: 0.7, d: 0.22 },
        { f: 783.99, t: 0.95, d: 0.22 },
        { f: 1046.5, t: 1.2, d: 0.55 },
      ];
      melody.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.28, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.008, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch {}
  }
}

export const sound = new SoundEffects();
