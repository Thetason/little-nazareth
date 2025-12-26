"use client";

import { useRouter } from "next/navigation";

export default function TestIntro() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#B5A4D9] via-[#FFB893] to-[#9CC5A1]">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: '2px',
              height: '2px',
              background: Math.random() > 0.5 ? 'rgba(255, 215, 0, 0.7)' : 'rgba(255, 255, 255, 0.5)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating triangles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: `12px solid ${['#FF9B71', '#B5A4D9', '#9CC5A1', '#FFD700'][i % 4]}`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {/* Top: Small Logo */}
        <div className="absolute top-8 text-center animate-fade-in">
          <h1 className="text-2xl font-bold tracking-wider" style={{ color: '#8B5E3C' }}>
            Little Nazareth
          </h1>
        </div>

        {/* Center: Hero Illustration */}
        <div className="flex flex-col items-center gap-12 max-w-3xl text-center">
          {/* Glowing Symbol */}
          <div className="relative w-64 h-64 animate-spin-reveal">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFE34D] to-[#FFA552] opacity-30 blur-3xl animate-holy-glow" />

            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-9xl animate-float" style={{ filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))' }}>
                ✨
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 animate-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A3828]" style={{
              textShadow: '0 2px 15px rgba(255, 255, 255, 0.4)'
            }}>
              당신의 기도 친구가<br />준비되었습니다
            </h2>

            <p className="text-lg md:text-xl text-[#8B7355] leading-relaxed max-w-2xl">
              몇 가지 질문을 통해<br />
              당신과 가장 잘 맞는 리틀 나자렛 친구를 찾아드리겠습니다.<br />
              <span className="text-sm text-[#B8A692] mt-4 block">
                진심으로 답변하시면 가장 좋은 친구를 만날 수 있습니다.
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/test/question/1')}
            className="group relative px-12 py-5 text-xl font-semibold text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl mt-8"
            style={{
              background: 'linear-gradient(135deg, #7C6FFF 0%, #9D8FFF 50%, #B5A4FF 100%)',
              boxShadow: '0 10px 40px rgba(124, 111, 255, 0.4), 0 0 60px rgba(157, 143, 255, 0.2)',
            }}
          >
            <span className="relative z-10">여정 시작하기</span>

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFE34D] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />

            {/* Border animation */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-pulse" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
