// Web Audio API kid-friendly sound effects & BGM engine (100% offline, zero network assets needed)

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// -------------------------------------------------------------
// BGM ENGINE: Cheerful background music generator using Web Audio
// -------------------------------------------------------------
class BGMEngine {
  private isRunning: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private currentStep: number = 0;
  private volume: number = 0.25;

  // Cheerful melody in C Major pentatonic & diatonic (tempo ~118 BPM, 16th/8th notes)
  // Chord progression: C -> G -> Am -> F
  private readonly bassNotes = [
    // Bar 1 (C): C3
    130.81, 130.81, 130.81, 130.81,
    // Bar 2 (G): G2
    98.0, 98.0, 98.0, 98.0,
    // Bar 3 (Am): A2
    110.0, 110.0, 110.0, 110.0,
    // Bar 4 (F): F2
    87.31, 87.31, 87.31, 87.31,
  ];

  private readonly leadMelody = [
    // Bar 1 (C): C5, E5, G5, E5, C5, D5, E5, G5
    523.25, 659.25, 783.99, 659.25, 523.25, 587.33, 659.25, 783.99,
    // Bar 2 (G): D5, G5, B5, G5, D5, E5, D5, B4
    587.33, 783.99, 987.77, 783.99, 587.33, 659.25, 587.33, 493.88,
    // Bar 3 (Am): E5, A5, C6, A5, E5, F5, G5, A5
    659.25, 880.0, 1046.5, 880.0, 659.25, 698.46, 783.99, 880.0,
    // Bar 4 (F): F5, A5, C6, A5, G5, E5, D5, C5
    698.46, 880.0, 1046.5, 880.0, 783.99, 659.25, 587.33, 523.25,
  ];

  public start() {
    if (this.isRunning) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
      this.masterGain.connect(ctx.destination);
    }

    this.isRunning = true;
    this.currentStep = 0;
    this.scheduleLoop();
  }

  public stop() {
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && audioCtx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, audioCtx.currentTime + 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isActive(): boolean {
    return this.isRunning;
  }

  private scheduleLoop() {
    if (!this.isRunning) return;
    const ctx = getAudioContext();
    if (!ctx || !this.masterGain) return;

    const stepDuration = 0.22; // ~136 BPM eighth notes
    const time = ctx.currentTime + 0.05;

    // Play Melody note (marimba / xylophone warm ping)
    const melodyIdx = this.currentStep % this.leadMelody.length;
    const freq = this.leadMelody[melodyIdx];

    // Every note has variation
    if (freq > 0) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; // sweet soft marimba tone
      osc.frequency.setValueAtTime(freq, time);

      // Cute playful decay
      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + stepDuration * 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(time);
      osc.stop(time + stepDuration);
    }

    // Play soft bass every 2 steps
    if (this.currentStep % 2 === 0) {
      const bassIdx = Math.floor(this.currentStep / 2) % this.bassNotes.length;
      const bassFreq = this.bassNotes[bassIdx];
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassFreq, time);

      bassGain.gain.setValueAtTime(0.12, time);
      bassGain.gain.exponentialRampToValueAtTime(0.001, time + stepDuration * 1.8);

      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);
      bassOsc.start(time);
      bassOsc.stop(time + stepDuration * 1.8);
    }

    // Play subtle soft shaker percussion on odd steps
    if (this.currentStep % 2 === 1) {
      try {
        const bufferSize = ctx.sampleRate * 0.02;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.02;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 5000;
        noise.connect(noiseFilter);
        noiseFilter.connect(this.masterGain);
        noise.start(time);
      } catch {
        // ignore
      }
    }

    this.currentStep++;

    // Loop interval
    this.timerId = window.setTimeout(() => {
      this.scheduleLoop();
    }, stepDuration * 1000);
  }
}

export const bgm = new BGMEngine();

// -------------------------------------------------------------
// IMMERSIVE SOUND EFFECTS (SFX)
// -------------------------------------------------------------
export const playSound = {
  click: (enabled = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // ignore
    }
  },

  slice: (enabled = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // ignore
    }
  },

  // Rich double-chime + sparkling glissando for correct quiz answer
  success: (enabled = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Bell 1: C6 (1046.5Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.5, t);
      gain1.gain.setValueAtTime(0.25, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.3);

      // Bell 2: E6 (1318.5Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.5, t + 0.1);
      gain2.gain.setValueAtTime(0.28, t + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t + 0.1);
      osc2.stop(t + 0.45);

      // Ascending sparkle harp run: C5, E5, G5, B5, C6
      const sparkleNotes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
      sparkleNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = t + 0.18 + idx * 0.05;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.16, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.22);
      });
    } catch {
      // ignore
    }
  },

  // Playful cartoon spring "boing" wobble for wrong answer (encouraging, not harsh)
  error: (enabled = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Spring oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';

      // Pitch bends down with cute vibrato modulation
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.28);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

      // Subtle vibrato LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(14, t); // 14 Hz fast cartoon wobble
      lfoGain.gain.setValueAtTime(25, t);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(t);
      osc.start(t);

      lfo.stop(t + 0.32);
      osc.stop(t + 0.32);
    } catch {
      // ignore
    }
  },

  // Grand celebratory victory fanfare for badge unlocking & chapter graduation
  badgeUnlock: (enabled = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Fanfare Brass Horns (Harmonic Chords): C5, E5, G5, High C6
      const chords = [
        { notes: [523.25, 659.25], start: t, dur: 0.14 },
        { notes: [523.25, 659.25], start: t + 0.14, dur: 0.14 },
        { notes: [523.25, 659.25], start: t + 0.28, dur: 0.14 },
        { notes: [659.25, 783.99], start: t + 0.44, dur: 0.35 },
        { notes: [587.33, 783.99], start: t + 0.82, dur: 0.2 },
        { notes: [1046.5, 1318.5], start: t + 1.04, dur: 0.75 }, // Grand C6 + E6 finale!
      ];

      chords.forEach(chord => {
        chord.notes.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, chord.start);

          gain.gain.setValueAtTime(0.22, chord.start);
          gain.gain.exponentialRampToValueAtTime(0.001, chord.start + chord.dur);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(chord.start);
          osc.stop(chord.start + chord.dur);
        });
      });

      // Celebratory Sparkle cascade at the end
      const sparkles = [1046.5, 1318.5, 1567.98, 2093.0];
      sparkles.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const st = t + 1.1 + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, st);
        gain.gain.setValueAtTime(0.15, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(st);
        osc.stop(st + 0.3);
      });
    } catch {
      // ignore
    }
  },

  pageTurn: (enabled = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // ignore
    }
  },
};
