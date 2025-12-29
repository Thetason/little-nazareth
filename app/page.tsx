"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { characters, getCharacterById } from "@/lib/characters";

// 히어로 영상 데이터 - 코코만
const heroVideo = {
  id: "bear",
  name: "코코",
  videoUrl: "/hero-videos/coco-story1.mp4",
  character: "🐻",
  color: "#8B6F47",
};

// 코코 캐릭터 데이터
const cocoCharacter = {
  id: "bear",
  name: "코코",
  emoji: "🐻",
  color: "#8B6F47",
  nickname: "꾸벅꾸벅 코코아 찐빵곰",
  story: "아무것도 하지 않아도, 1등 하지 않아도 괜찮아요.",
};

export default function Home() {
  const [showStoryPopup, setShowStoryPopup] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showProductButton, setShowProductButton] = useState(false);

  // 3초 후 팝업 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStoryPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#B5A4D9] via-[#FFB893] to-[#9CC5A1]">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() > 0.7 ? '3px' : '2px',
              height: Math.random() > 0.7 ? '3px' : '2px',
              background: Math.random() > 0.5 ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section - 풀스크린 */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">

        {/* Top: Logo - 영상 위에 오버레이 */}
        <div className="absolute top-8 left-0 right-0 text-center animate-fade-in z-30">
          <h1
            className="text-4xl md:text-5xl font-bold tracking-wider mb-1"
            style={{
              color: '#8B5E3C',
              textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)',
              fontFamily: 'Georgia, serif'
            }}
          >
            Praying Pals
          </h1>
          <p className="text-sm text-[#8B7355] tracking-wider">
            Little Nazareth · 하늘 솜사탕 마을
          </p>
        </div>

        {/* Center: Hero Video with Interactive Hotspots - 거의 풀스크린 */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Main Hero Video Area */}
          <div className="relative w-[98vw] h-[95vh] rounded-xl overflow-hidden shadow-2xl">
            {/* Background Hero Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroVideo.videoUrl} type="video/mp4" />
              {/* Fallback: 영상 로딩 실패시 이미지 표시 */}
              <img
                src="/little-nazareth-hero.png"
                alt="Little Nazareth Village"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </video>

            {/* Video Character Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg z-20"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{heroVideo.character}</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">{heroVideo.name}의 이야기</p>
                  <p className="text-xs text-gray-500">Praying Pals</p>
                </div>
              </div>
            </motion.div>

            {/* Story Popup - 3초 후 자동 표시 */}
            <AnimatePresence>
              {showStoryPopup && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setShowStoryModal(true)}
                    className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border-2 hover:scale-105 transition-transform cursor-pointer"
                    style={{ borderColor: cocoCharacter.color }}
                  >
                    <div className="flex flex-col items-center gap-3 max-w-xs">
                      <span className="text-5xl">{cocoCharacter.emoji}</span>
                      <div className="text-center">
                        <h4 className="text-xl font-bold mb-1" style={{ color: cocoCharacter.color }}>
                          {cocoCharacter.name}의 이야기
                        </h4>
                        <p className="text-sm text-gray-600">
                          코코의 이야기를 확인해보세요
                        </p>
                      </div>
                      <div className="mt-2 px-4 py-2 rounded-full text-white text-sm font-bold" style={{ backgroundColor: cocoCharacter.color }}>
                        자세히 보기 →
                      </div>
                    </div>
                    {/* Close button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowStoryPopup(false);
                      }}
                      className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    >
                      ✕
                    </button>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: CTA - 영상 위에 오버레이 */}
        <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-4 text-center animate-reveal z-30">
          <p className="text-[#8B7355] text-base">
            각 캐릭터를 클릭하여 그들의 이야기를 들어보세요
          </p>
          <Link
            href="/story"
            className="px-8 py-3 text-base font-bold text-white rounded-full shadow-xl hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #7C6FFF 0%, #9D8FFF 50%, #B5A4FF 100%)',
              boxShadow: '0 10px 30px rgba(124, 111, 255, 0.4)',
            }}
          >
            스토리 보러가기 ✨
          </Link>
        </div>
      </main>

      {/* Top Right - Product Button (expandable on hover) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 right-6 z-20"
        onMouseEnter={() => setShowProductButton(true)}
        onMouseLeave={() => setShowProductButton(false)}
      >
        <Link
          href="/products"
          className="flex items-center gap-3 bg-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all overflow-hidden"
          style={{
            padding: showProductButton ? '12px 24px 12px 16px' : '12px 16px',
            width: showProductButton ? 'auto' : '64px',
          }}
        >
          <span className="text-2xl">🛍️</span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: showProductButton ? 'auto' : 0,
              opacity: showProductButton ? 1 : 0,
            }}
            className="font-bold text-base whitespace-nowrap"
          >
            상품보러가기
          </motion.span>
        </Link>
      </motion.div>

      {/* Bottom Navigation Bar - 동물의 숲 스타일 */}
      <nav className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex justify-center px-6 pb-6">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-8 px-12 py-5">
              {/* Menu Item 1 */}
              <Link href="/story" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-3xl">🏠</span>
                </div>
                <span className="text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors leading-tight whitespace-nowrap">
                  리틀 나자렛에서<br />시작하는 새로운 하루
                </span>
              </Link>

              <div className="w-px h-14 bg-gray-300 shrink-0" />

              {/* Menu Item 2 */}
              <Link href="/world" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-3xl">🌍</span>
                </div>
                <span className="text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors whitespace-nowrap">
                  3D 월드
                </span>
              </Link>

              <div className="w-px h-14 bg-gray-300 shrink-0" />

              {/* Menu Item 3 */}
              <Link href="/test" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-3xl">✨</span>
                </div>
                <span className="text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors leading-tight whitespace-nowrap">
                  나한테 꼭 맞는<br />친구찾기 테스트
                </span>
              </Link>

              <div className="w-px h-14 bg-gray-300 shrink-0" />

              {/* Menu Item 4 */}
              <button className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <span className="text-3xl">▶️</span>
                </div>
                <span className="text-lg font-bold text-[#4A3828] group-hover:text-[#7C6FFF] transition-colors whitespace-nowrap">
                  영상
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Character Story Detail Popup - 오른쪽 중단 */}
      <AnimatePresence>
        {showStoryModal && (() => {
          const fullChar = getCharacterById(cocoCharacter.id);
          if (!fullChar) return null;

          return (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-50 w-96"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2" style={{ borderColor: cocoCharacter.color }}>
                {/* Close button */}
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  ✕
                </button>

                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{cocoCharacter.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: cocoCharacter.color }}>
                    {fullChar.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">"{fullChar.nickname}"</p>

                  {/* Full Story */}
                  <div className="mb-4 text-left">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {fullChar.story}
                    </p>
                  </div>

                  {/* Personality Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {fullChar.personality.map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full text-white font-medium"
                        style={{ backgroundColor: cocoCharacter.color }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Symbol Item */}
                  {fullChar.symbolItem && (
                    <p className="text-xs text-gray-500 italic mb-4">
                      상징 아이템: {fullChar.symbolItem}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/products"
                    className="flex-1 py-3 rounded-full font-bold text-white text-center hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: cocoCharacter.color }}
                  >
                    구매하기 →
                  </Link>
                  <button
                    onClick={() => setShowStoryModal(false)}
                    className="flex-1 py-3 rounded-full font-bold border-2 transition-colors hover:bg-gray-50"
                    style={{
                      borderColor: cocoCharacter.color,
                      color: cocoCharacter.color
                    }}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
