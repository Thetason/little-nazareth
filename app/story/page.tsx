'use client';

import { useState, useRef, useEffect } from 'react';
import { storyContent } from '@/lib/storyData';
import { StorySection } from '@/components/story/StorySection';
import { ProgressBar } from '@/components/story/ProgressBar';
import { SoundToggle } from '@/components/story/SoundToggle';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function StoryPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSections = storyContent.length + 1; // +1 for CTA section

  // Calculate progress (0 to 1)
  const progress = useTransform(
    dragX,
    [-(totalSections - 1) * (typeof window !== 'undefined' ? window.innerWidth : 1000), 0],
    [1, 0]
  );

  // Handle cloud dragging in REAL-TIME (while dragging)
  const handleCloudDragging = (progressValue: number) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    // Convert progress (0 to 1) to dragX position
    const targetX = -progressValue * (totalSections - 1) * width;
    // Update dragX in real-time without animation
    dragX.set(targetX);
  };

  // Handle cloud drag end (snap to nearest section)
  const handleCloudDragEnd = (progressValue: number) => {
    // Convert progress (0 to 1) to section index
    const targetSection = Math.round(progressValue * (totalSections - 1));
    goToSection(targetSection);
  };

  // Snap to nearest section when drag ends
  const handleDragEnd = () => {
    const x = dragX.get();
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;

    // Calculate which section we're closest to
    const targetSection = Math.round(-x / width);
    const clampedSection = Math.max(0, Math.min(targetSection, totalSections - 1));

    // Animate to that section
    animate(dragX, -clampedSection * width, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });

    setCurrentSection(clampedSection);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSection > 0) {
        goToSection(currentSection - 1);
      } else if (e.key === 'ArrowRight' && currentSection < totalSections - 1) {
        goToSection(currentSection + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, totalSections]);

  const goToSection = (index: number) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    animate(dragX, -index * width, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
    setCurrentSection(index);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-mint-400 to-mint-500">
      {/* Draggable container */}
      <motion.div
        ref={containerRef}
        className="flex h-full cursor-grab active:cursor-grabbing"
        style={{ x: dragX }}
        drag="x"
        dragConstraints={{
          left: -(totalSections - 1) * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          right: 0,
        }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        onDragEnd={handleDragEnd}
      >
        {/* Render all story sections */}
        {storyContent.map((section, index) => (
          <div key={section.id} className="flex-shrink-0 w-screen h-screen">
            <StorySection section={section} index={index} />
          </div>
        ))}

        {/* Final CTA section */}
        <div className="flex-shrink-0 w-screen h-screen">
          <section className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-sunset to-heaven">
            <div className="relative z-10 text-center space-y-8 px-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold text-white"
              >
                당신의 Praying Mate를 찾아보세요
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  href="/test"
                  className="inline-block px-12 py-6 bg-white text-sunset font-bold text-xl rounded-full shadow-2xl hover:scale-105 transition-all"
                >
                  ✨ 성격 테스트 시작하기
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-block px-8 py-4 text-white/90 hover:text-white underline transition-colors"
                >
                  홈으로 돌아가기
                </Link>
              </motion.div>
            </div>

            {/* Floating animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                  }}
                  animate={{
                    y: -100,
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: Math.random() * 5,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  {['✝️', '🙏', '💚', '🕊️'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>

      {/* Fixed UI elements */}
      <SoundToggle />
      <ProgressBar
        progress={progress}
        onDraggingCloud={handleCloudDragging}
        onDragCloud={handleCloudDragEnd}
        totalSections={totalSections}
      />

      {/* Navigation hints */}
      <div className="fixed top-1/2 -translate-y-1/2 left-8 z-50">
        {currentSection > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => goToSection(currentSection - 1)}
            className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <span className="text-3xl">←</span>
          </motion.button>
        )}
      </div>

      <div className="fixed top-1/2 -translate-y-1/2 right-8 z-50">
        {currentSection < totalSections - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => goToSection(currentSection + 1)}
            className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <span className="text-3xl">→</span>
          </motion.button>
        )}
      </div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: currentSection === 0 ? 1 : 0, y: 0 }}
        transition={{
          duration: 1,
          repeat: currentSection === 0 ? Infinity : 0,
          repeatType: 'reverse',
        }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg z-40 pointer-events-none"
      >
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <span>☁️ 구름을 드래그해서 이야기를 시작하세요 ☁️</span>
        </p>
      </motion.div>

      {/* Section indicators */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {[...Array(totalSections)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToSection(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSection
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
