/**
 * Audio Engine: Web Audio API Synthesizer + Web Speech API
 * 100% Client-side, no external API keys needed, works offline.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.debug('Audio play failed', e);
  }
}

export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + idx * 0.09;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.26);
    });
  } catch (e) {
    console.debug('Correct sound error', e);
  }
}

export function playIncorrectSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.debug('Incorrect sound error', e);
  }
}

export function playStarSound() {
  try {
    const ctx = getAudioContext();
    const notes = [880, 1108.73, 1318.51, 1760]; // A5, C#6, E6, A6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + idx * 0.07;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch (e) {
    console.debug('Star sound error', e);
  }
}

export function playFanfare() {
  try {
    const ctx = getAudioContext();
    const melody = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.5, d: 0.35 },
    ];
    let curTime = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = note.f;

      gain.gain.setValueAtTime(0.25, curTime);
      gain.gain.exponentialRampToValueAtTime(0.001, curTime + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(curTime);
      osc.stop(curTime + note.d);
      curTime += note.d * 0.9;
    });
  } catch (e) {
    console.debug('Fanfare error', e);
  }
}

// Background soft music generator
let bgMusicInterval: ReturnType<typeof setInterval> | null = null;
let isBgMusicPlaying = false;

export function toggleBackgroundMusic(enable: boolean) {
  if (!enable) {
    if (bgMusicInterval) {
      clearInterval(bgMusicInterval);
      bgMusicInterval = null;
    }
    isBgMusicPlaying = false;
    return;
  }

  if (isBgMusicPlaying) return;
  isBgMusicPlaying = true;

  try {
    const chords = [
      [261.63, 329.63, 392.0], // C
      [220.0, 261.63, 329.63], // Am
      [174.61, 220.0, 261.63], // F
      [196.0, 246.94, 293.66], // G
    ];
    let step = 0;

    const playChord = () => {
      if (!isBgMusicPlaying) return;
      const ctx = getAudioContext();
      const chord = chords[step % chords.length];
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq * 1.5;

        const startTime = ctx.currentTime + i * 0.2;
        gain.gain.setValueAtTime(0.015, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
      step++;
    };

    playChord();
    bgMusicInterval = setInterval(playChord, 1800);
  } catch (e) {
    console.debug('BG music failed', e);
  }
}

// Web Speech API for Russian pronunciation
export function speakRussian(text: string, rate: number = 0.95): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      playPopSound();
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = Math.max(0.6, Math.min(rate, 1.2));
    utterance.pitch = 1.1; // Cheerful, child-friendly pitch

    // Try finding a Russian voice
    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find((v) => v.lang.startsWith('ru') || v.lang.includes('RU'));
    if (ruVoice) {
      utterance.voice = ruVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

// Speak interface help / guidance
export function speakVoiceGuidance(text: string, lang: 'uz' | 'ru', rate: number = 1.0) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'uz' ? 'uz-UZ' : 'ru-RU';
  utterance.rate = rate;
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang.startsWith(lang === 'uz' ? 'uz' : 'ru'));
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopAllSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
