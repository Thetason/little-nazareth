'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface HighlightedWord {
  word: string;
  color: string;
}

interface SpeechBubbleProps {
  text: string;
  highlightedWords?: HighlightedWord[];
  position?: 'left' | 'right' | 'center';
}

export function SpeechBubble({
  text,
  highlightedWords = [],
  position = 'center'
}: SpeechBubbleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (!isInView) return;

    setDisplayedText('');
    setIsTypingComplete(false);

    let currentIndex = 0;
    const typingSpeed = 30; // ms per character (faster for better UX)

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [isInView, text]);

  // Replace highlighted words with colored spans
  const renderText = () => {
    let processedText = displayedText;

    // Only highlight when typing is complete
    if (isTypingComplete) {
      highlightedWords.forEach(({ word, color }) => {
        const regex = new RegExp(`(${word})`, 'g');
        processedText = processedText.replace(
          regex,
          `<span style="color: ${color}; font-weight: 700;">$1</span>`
        );
      });
    }

    return (
      <div
        dangerouslySetInnerHTML={{ __html: processedText }}
        className="whitespace-pre-line"
      />
    );
  };

  // Position classes
  const positionClasses = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
  };

  // Tail position
  const tailPosition = {
    left: 'left-8',
    right: 'right-8',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex ${positionClasses[position]} w-full`}
    >
      <div className="relative max-w-2xl">
        {/* Speech bubble */}
        <div className="bg-[#FFF9E6] rounded-3xl px-8 py-6 shadow-xl relative border-2 border-[#F5E6D3]">
          <p className="text-gray-800 text-3xl leading-relaxed font-handwriting">
            {renderText()}
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            )}
          </p>

          {/* Tail */}
          <div
            className={`absolute -bottom-4 ${tailPosition[position]} w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#FFF9E6]`}
          />
        </div>
      </div>
    </motion.div>
  );
}
