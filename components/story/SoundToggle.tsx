'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log('Audio play failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      {/* Audio element - placeholder, add your audio file */}
      <audio
        ref={audioRef}
        src="/story/audio/background.mp3"
        loop
        preload="auto"
      />

      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-8 right-8 z-50 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: isPlaying ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isPlaying ? (
            <span className="text-xl">🎵</span>
          ) : (
            <span className="text-xl">🔇</span>
          )}
        </motion.div>

        {/* Text */}
        <span className="font-medium text-gray-700">
          BGM {isPlaying ? 'ON' : 'OFF'}
        </span>
      </motion.button>
    </>
  );
}
