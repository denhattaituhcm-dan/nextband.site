// Pure Web Audio API & SpeechSynthesis Sound Engine for LEXICON OVERDRIVE: C2 COGNITIVE ARENA
// Zero external MP3 assets required; 100% self-contained & safe in SSR/headless environments.

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === "suspended") {
      void sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Crisp high-tech katana/synapse frequency sweep that pitches up with combo multiplier.
 */
export function playSlashSound(comboCount: number = 1): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const clampedCombo = Math.max(1, Math.min(comboCount, 20));
    const pitchFactor = 1 + (clampedCombo - 1) * 0.06;

    // High-frequency metallic synapse sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(340 * pitchFactor, now);
    osc.frequency.exponentialRampToValueAtTime(1480 * pitchFactor, now + 0.085);
    osc.frequency.exponentialRampToValueAtTime(620 * pitchFactor, now + 0.16);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);

    // Secondary crystalline harmonic overtone
    const shimmerOsc = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmerOsc.type = "triangle";
    shimmerOsc.frequency.setValueAtTime(880 * pitchFactor, now + 0.02);
    shimmerOsc.frequency.exponentialRampToValueAtTime(1760 * pitchFactor, now + 0.14);

    shimmerGain.gain.setValueAtTime(0.001, now + 0.02);
    shimmerGain.gain.linearRampToValueAtTime(0.1, now + 0.04);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);

    shimmerOsc.start(now + 0.02);
    shimmerOsc.stop(now + 0.17);
  } catch {
    // Ignore audio context blocked errors in headless/uninteracted browsers
  }
}

/**
 * Mechanical vault tumbler click on single lock + resonant harmonic chord when all 3 locks open (stage === 3).
 */
export function playLockCrackSound(stage: 1 | 2 | 3): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = stage === 1 ? 260 : stage === 2 ? 330 : 440;

    // Mechanical tumbler click
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "square";
    clickOsc.frequency.setValueAtTime(baseFreq, now);
    clickOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, now + 0.06);

    clickGain.gain.setValueAtTime(0.16, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.075);

    // If stage === 3, unleash resonant harmonic vault-open chord
    if (stage === 3) {
      const chordNotes = [440, 554.37, 659.25, 880]; // A major celestial chord
      chordNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startAt = now + 0.06 + idx * 0.035;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startAt);

        gain.gain.setValueAtTime(0.001, startAt);
        gain.gain.linearRampToValueAtTime(0.12, startAt + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.42);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startAt);
        osc.stop(startAt + 0.44);
      });
    }
  } catch {
    // Safe fallback
  }
}

/**
 * Impact bass + crystalline shimmer on victory, or low cognitive alert buzz on failure.
 */
export function playCardClashSound(victory: boolean): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (victory) {
      // Deep impact sub-bass
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "sine";
      bassOsc.frequency.setValueAtTime(140, now);
      bassOsc.frequency.exponentialRampToValueAtTime(48, now + 0.22);

      bassGain.gain.setValueAtTime(0.24, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.25);

      // Crystalline victory shimmer
      const shimmerNotes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
      shimmerNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + 0.03 + i * 0.04;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.11, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.32);
      });
    } else {
      // Cognitive dissonance alert buzz
      const buzzOsc = ctx.createOscillator();
      const buzzGain = ctx.createGain();
      buzzOsc.type = "sawtooth";
      buzzOsc.frequency.setValueAtTime(165, now);
      buzzOsc.frequency.linearRampToValueAtTime(115, now + 0.26);

      buzzGain.gain.setValueAtTime(0.15, now);
      buzzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      buzzOsc.connect(buzzGain);
      buzzGain.connect(ctx.destination);
      buzzOsc.start(now);
      buzzOsc.stop(now + 0.29);
    }
  } catch {
    // Safe fallback
  }
}

/**
 * Ethereal narrative chime on correct nuance choice, or dramatic "what-if" temporal rewind sound on suboptimal choice.
 */
export function playChronicleChoiceSound(correct: boolean): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (correct) {
      const notes = [587.33, 880, 1174.66]; // D5, A5, D6 ethereal fifths
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.055;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.38);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } else {
      // Dramatic "What-If" temporal rewind warble
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(210, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(310, now + 0.28);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.31);
    }
  } catch {
    // Safe fallback
  }
}

/**
 * Majestic 4-note ascending arpeggio when evolving to a higher Cultivation Rank.
 */
export function playRankUpSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const arpeggio = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5

    arpeggio.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.09;
      const duration = idx === arpeggio.length - 1 ? 0.65 : 0.28;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.16, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    });
  } catch {
    // Safe fallback
  }
}

/**
 * Uses window.speechSynthesis (en-GB, rate 0.92) to pronounce C2 lexical items clearly.
 */
export function speakC2Word(word: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-GB";
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.includes("en-GB") && v.name.toLowerCase().includes("natural")) ||
      voices.find((v) => v.lang.includes("en-GB")) ||
      voices.find((v) => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech synthesis errors in restricted environments
  }
}
