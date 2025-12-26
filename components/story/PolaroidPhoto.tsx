'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface PolaroidPhotoProps {
  characterId: string;
  characterName: string;
  rotation?: number;
  pinColor?: string;
}

export function PolaroidPhoto({
  characterId,
  characterName,
  rotation = 0,
  pinColor = '#FF6B9D'
}: PolaroidPhotoProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Character emoji mapping (placeholder - you can replace with actual images)
  const characterEmojis: Record<string, string> = {
    lamb: '🐑',
    lion: '🦁',
    squirrel: '🐿️',
    bear: '🐻',
    deer: '🦌',
    dove: '🕊️',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: rotation }
          : { opacity: 0, y: 50, rotate: 0 }
      }
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2,
      }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      className="relative group cursor-pointer"
    >
      {/* Pin */}
      <motion.div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 shadow-md"
        style={{ backgroundColor: pinColor }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.4, duration: 0.3, type: 'spring' }}
      />

      {/* Polaroid frame */}
      <div className="bg-white p-4 pb-16 shadow-xl">
        {/* Photo area - using emoji placeholder */}
        <div className="relative w-64 h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center overflow-hidden">
          <span className="text-9xl">
            {characterEmojis[characterId] || '🐾'}
          </span>
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-gray-700 font-handwriting text-xl">
            {characterName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
