'use client';

import { motion } from 'framer-motion';

interface DotPatternProps {
  color?: 'mint' | 'blue' | 'purple' | 'pink' | 'yellow';
}

export function DotPattern({ color = 'mint' }: DotPatternProps) {
  // Dot color based on background color - Pastel and soft like Gemini
  const dotColors = {
    mint: 'rgba(52, 211, 153, 0.25)', // softer green
    blue: 'rgba(96, 165, 250, 0.25)', // softer blue
    purple: 'rgba(196, 181, 253, 0.3)', // lighter purple
    pink: 'rgba(251, 207, 232, 0.35)', // lighter pink
    yellow: 'rgba(134, 239, 172, 0.3)', // cyan-ish for yellow backgrounds
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`dot-pattern-${color}`}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <motion.circle
              cx="20"
              cy="20"
              r="3"
              fill={dotColors[color]}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#dot-pattern-${color})`}
        />
      </svg>
    </div>
  );
}
