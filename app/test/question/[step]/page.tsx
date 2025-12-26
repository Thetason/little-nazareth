"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionPage({ params }: { params: Promise<{ step: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const step = parseInt(resolvedParams.step);
  const question = questions[step - 1];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!question) {
    router.push('/test/result');
    return null;
  }

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
    setIsAnimating(true);

    // 답변 저장 (localStorage)
    const answers = JSON.parse(localStorage.getItem('test_answers') || '{}');
    answers[step] = value;
    localStorage.setItem('test_answers', JSON.stringify(answers));

    // 다음 페이지로 이동
    setTimeout(() => {
      if (step < questions.length) {
        router.push(`/test/question/${step + 1}`);
      } else {
        router.push('/test/result');
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#2A2A3E] via-[#3A3A4E] to-[#1A1A2E]">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() > 0.5 ? '2px' : '1px',
              height: Math.random() > 0.5 ? '2px' : '1px',
              background: 'rgba(255, 255, 255, 0.4)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Top: Logo & Progress */}
      <div className="absolute top-8 left-0 right-0 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-white/80">Little Nazareth</h1>
          <div className="text-white/60 text-sm">
            {step} / {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-20 left-0 right-0 px-6">
        <div className="max-w-3xl mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7C6FFF] to-[#B5A4FF]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24"
        >
          <div className="max-w-4xl w-full space-y-12">
            {/* Question Text */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white" style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
              }}>
                {question.question}
              </h2>
              {question.description && (
                <p className="text-white/60 text-lg tracking-wide uppercase text-sm">
                  {question.description}
                </p>
              )}
            </div>

            {/* Choices */}
            {question.type === 'choice' && question.choices.length === 2 ? (
              // Moon or Stars 스타일 (2개)
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {question.choices.map((choice, i) => (
                  <motion.button
                    key={choice.value}
                    onClick={() => handleSelect(choice.value)}
                    className={`group relative p-12 rounded-3xl backdrop-blur-md border-2 transition-all duration-500 ${
                      selectedAnswer === choice.value
                        ? 'bg-white/20 border-white/60 scale-105'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 hover:scale-105'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.6, type: 'spring' }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#7C6FFF] to-[#B5A4FF] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                    <div className="relative space-y-4">
                      <div className="text-8xl animate-float" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))' }}>
                        {choice.emoji}
                      </div>
                      <div className="text-2xl font-semibold text-white">
                        {choice.label}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              // 4개 선택지 그리드
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {question.choices.map((choice, i) => (
                  <motion.button
                    key={choice.value}
                    onClick={() => handleSelect(choice.value)}
                    className={`group relative p-8 rounded-2xl backdrop-blur-md border-2 transition-all duration-500 ${
                      selectedAnswer === choice.value
                        ? 'bg-white/20 border-white/60 scale-105'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 hover:scale-105'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7C6FFF] to-[#B5A4FF] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                    <div className="relative flex items-center gap-4">
                      <div className="text-4xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))' }}>
                        {choice.emoji}
                      </div>
                      <div className="text-lg font-medium text-white text-left">
                        {choice.label}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
