"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getCharacterFromAnswers } from "@/lib/questions";
import { characters } from "@/lib/characters";
import { TypeAnimation } from "react-type-animation";

export default function ResultPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'result'>('loading');
  const [characterId, setCharacterId] = useState<string>('');
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    // 답변 가져오기
    const answers = JSON.parse(localStorage.getItem('test_answers') || '{}');

    if (Object.keys(answers).length === 0) {
      router.push('/test');
      return;
    }

    // 캐릭터 결정
    const result = getCharacterFromAnswers(answers);
    setCharacterId(result);
    setCharacter(characters.find((c) => c.id === result));

    // 타이밍 시퀀스
    setTimeout(() => setPhase('reveal'), 2000);
    setTimeout(() => setPhase('result'), 4000);
  }, [router]);

  if (!character) return null;

  // Phase 1: Loading (분류모자가 생각 중...)
  if (phase === 'loading') {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1A1A2E] via-[#2A2A3E] to-[#1A1A2E] flex items-center justify-center">
        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: '2px',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.6)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Center: Thinking animation */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-9xl animate-spin-reveal" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))' }}>
            ✨
          </div>
          <h2 className="text-3xl text-white font-semibold">
            당신의 기도 친구를 찾고 있습니다...
          </h2>
        </motion.div>
      </div>
    );
  }

  // Phase 2: Reveal (캐릭터 등장!)
  if (phase === 'reveal') {
    return (
      <div
        className="relative min-h-screen overflow-hidden flex items-center justify-center transition-colors duration-2000"
        style={{
          background: `linear-gradient(to bottom, ${character.color}, ${character.accentColor})`
        }}
      >
        {/* Particle explosion */}
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => {
            const angle = (i / 150) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '4px',
                  height: '4px',
                  background: '#FFD700',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * distance + 'vw',
                  y: Math.sin(angle) * distance + 'vh',
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            );
          })}
        </div>

        {/* Character reveal */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, type: 'spring' }}
        >
          <div
            className="text-[200px] md:text-[300px]"
            style={{ filter: `drop-shadow(0 0 50px ${character.accentColor})` }}
          >
            {character.emoji}
          </div>
          <motion.h2
            className="text-5xl font-bold mt-8"
            style={{ color: '#4A3828' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {character.koreanName}
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  // Phase 3: Result (상세 정보)
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${character.color}, ${character.accentColor})`
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: '3px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.4)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-12 text-center"
        >
          {/* Character */}
          <div className="space-y-6">
            <div
              className="text-[150px] md:text-[200px] animate-float inline-block"
              style={{ filter: `drop-shadow(0 0 30px ${character.accentColor})` }}
            >
              {character.emoji}
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#4A3828' }}>
                {character.koreanName}
              </h1>
              <p className="text-xl md:text-2xl text-[#8B7355] font-medium">
                {character.name}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-[#4A3828] leading-relaxed">
              <TypeAnimation
                sequence={[character.description]}
                speed={70}
                cursor={false}
              />
            </p>
          </div>

          {/* Traits */}
          <div className="flex flex-wrap justify-center gap-4">
            {character.traits.map((trait: string, i: number) => (
              <motion.div
                key={trait}
                className="px-6 py-3 rounded-full backdrop-blur-md bg-white/30 border border-white/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1, type: 'spring' }}
              >
                <span className="text-[#4A3828] font-medium">{trait}</span>
              </motion.div>
            ))}
          </div>

          {/* Bible Verse */}
          <div className="glass rounded-3xl p-8 md:p-10 max-w-2xl mx-auto border-2 border-white/30">
            <p className="text-lg md:text-xl text-[#4A3828] leading-relaxed mb-4 italic">
              "{character.bibleVerse.text}"
            </p>
            <p className="text-sm text-[#8B7355] font-medium">
              - {character.bibleVerse.reference}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => {
                localStorage.removeItem('test_answers');
                router.push('/test');
              }}
              className="px-8 py-4 rounded-full backdrop-blur-md bg-white/20 border-2 border-white/40 text-[#4A3828] font-semibold hover:bg-white/30 transition-all duration-300"
            >
              다시 테스트하기
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#7C6FFF] to-[#B5A4FF] text-white font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
            >
              이 친구 만나러 가기 →
            </button>
          </div>

          {/* Share */}
          <p className="text-[#8B7355] text-sm mt-8">
            오늘 {Math.floor(Math.random() * 5000 + 5000)}명이 자신의 기도 친구를 만났습니다
          </p>
        </motion.div>
      </main>
    </div>
  );
}
