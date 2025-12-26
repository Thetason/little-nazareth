'use client';

import { SplineCharacter } from '@/components/spline/SplineCharacter';
import { getCharacterScene, isSceneReady } from '@/lib/splineScenes';
import { characters } from '@/lib/characters';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function WorldPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [loadedCharacters, setLoadedCharacters] = useState<string[]>([]);

  const handleCharacterLoad = (characterId: string) => {
    setLoadedCharacters(prev => [...prev, characterId]);
  };

  const selectedCharacterData = selectedCharacter
    ? characters[selectedCharacter]
    : null;

  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float">☁️</div>
        <div className="absolute top-20 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-float" style={{ animationDelay: '2s' }}>🌸</div>
        <div className="absolute bottom-32 right-1/3 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🌼</div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              ← 홈으로
            </motion.button>
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Little Nazareth 동산
            </h1>
            <p className="text-sm text-gray-600">
              캐릭터를 클릭해서 이야기를 들어보세요
            </p>
          </div>

          <div className="w-32" /> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main 3D Scene */}
      <div className="absolute inset-0 pt-24">
        {/* 루루 양 (첫 번째 캐릭터) */}
        <div className="w-full h-full">
          <SplineCharacter
            characterId="lamb"
            sceneUrl={getCharacterScene('lamb')}
            onClick={() => setSelectedCharacter('lamb')}
            onLoad={() => handleCharacterLoad('lamb')}
          />
        </div>
      </div>

      {/* Progress Indicator */}
      {!isSceneReady('lamb') && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">
              🎨 루루 양을 Spline에서 만들어주세요!
            </p>
            <p className="text-xs text-gray-500">
              SPLINE_GUIDE.md 파일을 참고하세요
            </p>
          </div>
        </div>
      )}

      {/* Character Story Modal */}
      <AnimatePresence>
        {selectedCharacter && selectedCharacterData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 p-4"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${selectedCharacterData.color} 0%, white 100%)`
              }}
            >
              {/* Character Header */}
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{selectedCharacterData.emoji}</div>
                <h2 className="text-3xl font-bold mb-2">
                  {selectedCharacterData.koreanName}
                </h2>
                <p className="text-sm font-medium text-gray-600">
                  {selectedCharacterData.name}
                </p>
              </div>

              {/* Story */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {selectedCharacterData.fullStory}
                </p>
              </div>

              {/* Bible Verse */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border-2 border-white">
                <p className="text-sm text-gray-700 italic mb-2">
                  "{selectedCharacterData.bibleVerse.text}"
                </p>
                <p className="text-xs text-gray-500 text-right">
                  - {selectedCharacterData.bibleVerse.reference}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors"
                >
                  닫기
                </button>
                <button
                  className="flex-1 px-6 py-3 rounded-full font-medium text-white transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${selectedCharacterData.color}, ${selectedCharacterData.accentColor})`
                  }}
                >
                  함께하기 🛒
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Grid (for multiple characters later) */}
      {/* Uncomment when you have multiple characters ready */}
      {/*
      <div className="absolute bottom-8 right-8 flex gap-4">
        {Object.keys(characters).map(id => (
          <button
            key={id}
            onClick={() => setSelectedCharacter(id)}
            className={`w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition-transform ${
              isSceneReady(id) ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isSceneReady(id)}
          >
            {characters[id].emoji}
          </button>
        ))}
      </div>
      */}
    </div>
  );
}
