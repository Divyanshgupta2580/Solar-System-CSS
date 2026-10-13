// Web Audio API ambient soundscape and futuristic audio feedback
class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
    this.isMuted = false;
    this.oscillators = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleAmbient() {
    this.init();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    if (!this.ctx || this.isAmbientPlaying) return;

    // Ambient Master Gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
    this.ambientGain.connect(this.ctx.destination);

    // Filtered pink drone
    const lowOsc = this.ctx.createOscillator();
    lowOsc.type = 'sine';
    lowOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 bass drone

    const lowGain = this.ctx.createGain();
    lowGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    // Warm chord layer
    const midOsc = this.ctx.createOscillator();
    midOsc.type = 'triangle';
    midOsc.frequency.setValueAtTime(110, this.ctx.currentTime); // A2

    const midFilter = this.ctx.createBiquadFilter();
    midFilter.type = 'lowpass';
    midFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
    midFilter.Q.setValueAtTime(3, this.ctx.currentTime);

    // Slow LFO for pulsating space breathing
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8-second cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(midFilter.frequency);

    lowOsc.connect(lowGain);
    lowGain.connect(this.ambientGain);

    midOsc.connect(midFilter);
    midFilter.connect(this.ambientGain);

    lowOsc.start();
    midOsc.start();
    lfo.start();

    this.oscillators = [lowOsc, midOsc, lfo];
    this.isAmbientPlaying = true;
  }

  stopAmbient() {
    if (!this.ambientGain || !this.ctx) return;
    this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); } catch (_) {}
      });
      this.oscillators = [];
      this.isAmbientPlaying = false;
    }, 1000);
  }

  // Futuristic UI tone when clicking a planet
  playPlanetChime(freq = 220) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime);
      filter.Q.setValueAtTime(4, this.ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.65);
    } catch (_) {}
  }

  // Soft subtle click sound for buttons
  playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (_) {}
  }
}

export const soundEngine = new CosmicAudioEngine();
