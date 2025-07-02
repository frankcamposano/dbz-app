import { useCallback, useRef, useState } from 'react';

interface ExtendedWindow extends Window {
  AudioContext: typeof AudioContext;
  webkitAudioContext: typeof AudioContext;
}

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPhrase = useCallback((phrase: string) => {
    // Crear síntesis de voz en español
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      
      // Configurar para español
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.7;
      
      // Intentar usar una voz en español si está disponible
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => 
        voice.lang.includes('es') || voice.name.includes('Spanish')
      );
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback: crear un sonido simple
      const extWindow = window as unknown as ExtendedWindow;
      const AudioContextClass = extWindow.AudioContext || extWindow.webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 500);
    }
  }, []);

  const playSound = useCallback((soundPath: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(soundPath);
    audioRef.current = audio;
    audio.play().catch(error => console.error('Error playing audio:', error));
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  return { playPhrase, playSound, stopAudio, isPlaying };
};