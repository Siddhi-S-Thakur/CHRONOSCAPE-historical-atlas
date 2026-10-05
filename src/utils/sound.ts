// Chronoscape Procedural Web Audio Engine
// Generates warm, museum-grade acoustic and ambient soundscapes entirely in the browser
// Zero external audio files required — 100% offline and instantaneous.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // ── Resonant Bronze Bell / Singing Bowl Chime for Epoch Transitions ────────
  playEpochChime(frequency: number = 432) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Master gain for this chime
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
      masterGain.connect(this.ctx.destination);

      // Fundamental harmonic (warm sine)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(frequency, now);
      osc1.frequency.exponentialRampToValueAtTime(frequency * 0.995, now + 2.5);

      // 1st overtone (minor third / fifth harmonic for meditative bronze timbre)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(frequency * 1.5, now);

      // Subtle metallic shimmer overtone
      const osc3 = this.ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(frequency * 2.76, now);
      const osc3Gain = this.ctx.createGain();
      osc3Gain.gain.setValueAtTime(0.04, now);
      osc3Gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc3.connect(osc3Gain);
      osc3Gain.connect(masterGain);

      osc1.connect(masterGain);
      osc2.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + 2.8);
      osc2.stop(now + 2.8);
      osc3.stop(now + 2.8);
    } catch {
      // Audio context might be restricted before first user interaction
    }
  }

  // ── Tactile Click / Haptic Tap for UI Buttons & Milestones ─────────────────
  playClick(pitch: number = 600) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + 0.05);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  // ── Procedural Ambient Meditation / Ocean Winds Soundscape ────────────────
  toggleAmbient(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    const shouldPlay = enable !== undefined ? enable : !this.isAmbientPlaying;

    if (shouldPlay && !this.isAmbientPlaying) {
      try {
        const now = this.ctx.currentTime;

        // Low-pass filter for deep oceanic warmth
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, now);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.001, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.045, now + 2.5);

        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);

        // Drone 1: Root tanpura/sea drone (108 Hz - Indian sacred frequency)
        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, now);

        // Drone 2: Fifth harmonic (162 Hz)
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(162, now);

        // Drone 3: Subtle wind flutter (slow LFO modulating low noise)
        const osc3 = this.ctx.createOscillator();
        osc3.type = 'triangle';
        osc3.frequency.setValueAtTime(54, now);

        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);

        this.ambientOscs = [osc1, osc2, osc3];
        this.isAmbientPlaying = true;
      } catch {
        this.isAmbientPlaying = false;
      }
    } else if (!shouldPlay && this.isAmbientPlaying) {
      if (this.ambientGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.001, now + 1.0);
        setTimeout(() => {
          this.ambientOscs.forEach(o => { try { o.stop(); } catch {} });
          this.ambientOscs = [];
        }, 1100);
      }
      this.isAmbientPlaying = false;
    }

    return this.isAmbientPlaying;
  }

  isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }
}

export const sound = new SoundEngine();
