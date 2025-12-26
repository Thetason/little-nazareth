'use client';

import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface ProgressBarProps {
  progress: MotionValue<number>;
  onDragCloud?: (progress: number) => void;
  onDraggingCloud?: (progress: number) => void; // NEW: Real-time dragging callback
  totalSections?: number;
}

export function ProgressBar({ progress, onDragCloud, onDraggingCloud, totalSections = 5 }: ProgressBarProps) {
  const barWidth = 320; // w-80 = 320px
  const cloudX = useMotionValue(0);

  // Sync cloud position with progress
  useEffect(() => {
    const unsubscribe = progress.on('change', (latest) => {
      cloudX.set(latest * barWidth);
    });
    return () => unsubscribe();
  }, [progress, cloudX, barWidth]);

  // Handle real-time dragging
  const handleCloudDrag = () => {
    if (!onDraggingCloud) return;

    // Get the current drag position
    const x = cloudX.get();

    // Calculate progress (0 to 1)
    const newProgress = Math.max(0, Math.min(1, x / barWidth));

    // Call the callback with the new progress in REAL-TIME
    onDraggingCloud(newProgress);
  };

  const handleCloudDragEnd = () => {
    if (!onDragCloud) return;

    // Get the current drag position
    const x = cloudX.get();

    // Calculate progress (0 to 1)
    const newProgress = Math.max(0, Math.min(1, x / barWidth));

    // Call the callback with the new progress
    onDragCloud(newProgress);
  };

  return (
    <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 w-80">
      {/* Progress bar container */}
      <div className="relative bg-white/30 backdrop-blur-sm rounded-full h-2 overflow-visible shadow-lg">
        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-300 via-blue-200 to-purple-300 rounded-full origin-left"
          style={{ scaleX: progress }}
        />

        {/* Draggable Cloud Icon - positioned ABOVE the bar */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 320 }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleCloudDrag}
          onDragEnd={handleCloudDragEnd}
          style={{ x: cloudX }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing flex items-center justify-center z-10"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Cotton candy cloud - MUCH BIGGER */}
            <span className="text-7xl drop-shadow-2xl filter" style={{
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
            }}>☁️</span>
            {/* Sparkle effect */}
            <motion.span
              className="absolute -top-2 -right-2 text-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
                rotate: [0, 15, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Helper text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white/80 text-xs mt-8"
      >
        구름을 드래그해서 이야기를 넘겨보세요
      </motion.p>
    </div>
  );
}
