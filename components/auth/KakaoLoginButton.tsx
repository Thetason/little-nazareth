'use client';

import { motion } from 'framer-motion';

export function KakaoLoginButton() {
  const handleLogin = () => {
    window.location.href = '/api/auth/kakao/login';
  };

  return (
    <motion.button
      onClick={handleLogin}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center gap-3 w-full bg-[#FEE500] text-[#191919] font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
    >
      {/* 카카오 로고 */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3C6.477 3 2 6.477 2 10.765c0 2.715 1.742 5.104 4.379 6.496l-.981 3.573c-.067.242.194.444.406.314l4.157-2.485C10.66 18.894 11.318 19 12 19c5.523 0 10-3.477 10-7.765S17.523 3 12 3z"
          fill="currentColor"
        />
      </svg>
      <span>카카오로 3초 회원가입</span>
    </motion.button>
  );
}
