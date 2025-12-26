'use client';

import { LittleNazarethGame } from '@/components/game/LittleNazarethGame';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NazarethPage() {
  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-sky-200 to-green-100 overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              ← 홈으로
            </motion.button>
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Little Nazareth
            </h1>
            <p className="text-sm text-gray-600">
              클럽펭귄 스타일 인터랙티브 월드
            </p>
          </div>

          <div className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg">
            Beta v0.1
          </div>
        </div>
      </header>

      {/* Game Container */}
      <div className="absolute inset-0 pt-24 pb-8 px-8">
        <div className="w-full h-full">
          <LittleNazarethGame />
        </div>
      </div>

      {/* Controls Guide */}
      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-md">
        <h3 className="font-bold text-lg mb-2">🎮 조작법</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>🖱️ <strong>클릭</strong>: 캐릭터 이동</li>
          <li>💬 <strong>NPC 클릭</strong>: 대화하기</li>
          <li>✨ <strong>호버</strong>: 캐릭터 하이라이트</li>
        </ul>
      </div>

      {/* Coming Soon Features */}
      <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-sm">
        <h3 className="font-bold text-lg mb-2">🚀 곧 추가될 기능</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>🏠 여러 방 (예배당, 정원 등)</li>
          <li>🎮 미니게임 (기도, 퀴즈)</li>
          <li>👤 아바타 커스터마이징</li>
          <li>💬 풍부한 스토리 대화</li>
          <li>🛒 제품 페이지 연결</li>
        </ul>
      </div>
    </div>
  );
}
