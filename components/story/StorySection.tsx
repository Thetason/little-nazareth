'use client';

import { StorySection as StorySectionType } from '@/lib/storyData';
import { DotPattern } from './DotPattern';
import { SpeechBubble } from './SpeechBubble';
import { PolaroidPhoto } from './PolaroidPhoto';
import { motion } from 'framer-motion';

interface StorySectionProps {
  section: StorySectionType;
  index: number;
}

export function StorySection({ section, index }: StorySectionProps) {
  // Determine dot pattern color from background
  const getDotColor = (bgClass: string): 'mint' | 'blue' | 'purple' | 'pink' | 'yellow' => {
    if (bgClass.includes('mint') || bgClass.includes('green-4')) return 'mint';
    if (bgClass.includes('blue')) return 'blue';
    if (bgClass.includes('purple')) return 'purple';
    if (bgClass.includes('pink')) return 'pink';
    if (bgClass.includes('yellow') || bgClass.includes('orange')) return 'yellow';
    return 'mint';
  };

  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center snap-start ${section.backgroundColor}`}
    >
      {/* Dot pattern background */}
      <DotPattern color={getDotColor(section.backgroundColor)} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        {/* Intro/Center layout */}
        {section.layout === 'center' && (
          <div className="flex flex-col items-center justify-center gap-12">
            {section.content.centerText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="text-5xl text-white font-handwriting whitespace-pre-line drop-shadow-lg">
                  {section.content.centerText}
                </p>
              </motion.div>
            )}

            {section.content.speechBubble && (
              <SpeechBubble
                text={section.content.speechBubble.text}
                highlightedWords={section.content.speechBubble.highlightedWords}
                position="center"
              />
            )}
          </div>
        )}

        {/* Left-Right layout */}
        {section.layout === 'left-right' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Polaroid */}
            <div className="flex justify-center md:justify-end">
              {section.content.polaroid && (
                <PolaroidPhoto
                  characterId={section.content.polaroid.characterId}
                  characterName={section.content.polaroid.characterName}
                  rotation={section.content.polaroid.rotation}
                  pinColor={section.content.polaroid.pinColor}
                />
              )}
            </div>

            {/* Right: Speech Bubble */}
            <div className="flex justify-center md:justify-start">
              {section.content.speechBubble && (
                <SpeechBubble
                  text={section.content.speechBubble.text}
                  highlightedWords={section.content.speechBubble.highlightedWords}
                  position="left"
                />
              )}
            </div>
          </div>
        )}

        {/* Right-Left layout */}
        {section.layout === 'right-left' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Speech Bubble */}
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              {section.content.speechBubble && (
                <SpeechBubble
                  text={section.content.speechBubble.text}
                  highlightedWords={section.content.speechBubble.highlightedWords}
                  position="right"
                />
              )}
            </div>

            {/* Right: Polaroid */}
            <div className="flex justify-center md:justify-start order-1 md:order-2">
              {section.content.polaroid && (
                <PolaroidPhoto
                  characterId={section.content.polaroid.characterId}
                  characterName={section.content.polaroid.characterName}
                  rotation={section.content.polaroid.rotation}
                  pinColor={section.content.polaroid.pinColor}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
