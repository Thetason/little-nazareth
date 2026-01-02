'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { KakaoLoginButton } from './KakaoLoginButton';
import { UserProfile } from './UserProfile';

export function AuthButton() {
  const { user, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <div className="w-48 h-12 bg-gray-200 rounded-xl animate-pulse" />
    );
  }

  if (user) {
    return <UserProfile />;
  }

  return (
    <div className="w-full max-w-xs">
      <KakaoLoginButton />
    </div>
  );
}
