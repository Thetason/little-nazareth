'use client';

import Spline from '@splinetool/react-spline';
import { useState } from 'react';

interface SplineCharacterProps {
  characterId: string;
  sceneUrl: string;
  onLoad?: () => void;
  onClick?: () => void;
  className?: string;
}

export function SplineCharacter({
  characterId,
  sceneUrl,
  onLoad,
  onClick,
  className = ''
}: SplineCharacterProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-100 to-pink-100">
          <div className="text-center">
            <div className="text-6xl animate-bounce mb-4">🌟</div>
            <p className="text-lg font-medium text-gray-600">
              캐릭터 불러오는 중...
            </p>
          </div>
        </div>
      )}

      {sceneUrl && (
        <Spline
          scene={sceneUrl}
          onLoad={handleLoad}
          onClick={onClick}
          className="w-full h-full"
        />
      )}

      {!sceneUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg">
            <div className="text-8xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-2">아직 제작 중이에요!</h3>
            <p className="text-gray-600 mb-4">
              이 캐릭터는 Spline에서 제작 중입니다.
            </p>
            <a
              href="https://spline.design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:scale-105 transition-transform"
            >
              Spline에서 만들러 가기 →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
