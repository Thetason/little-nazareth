'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Stats {
  overview: {
    totalUsers: number;
    channelAddedUsers: number;
    channelAddRate: number;
    todayUsers: number;
  };
  coupons: {
    total: number;
    used: number;
    unused: number;
    usageRate: string;
  };
  referrals: {
    total: number;
    topReferrers: Array<{
      id: number;
      name: string;
      referralCount: number;
      profileImage?: string;
    }>;
  };
  dailySignups: Array<{
    date: string;
    count: number;
  }>;
}

interface Settings {
  earlyBirdEnabled: boolean;
  earlyBirdDiscount: number;
  referralEnabled: boolean;
  referralDiscount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [settings, setSettings] = useState<Settings>({
    earlyBirdEnabled: false,
    earlyBirdDiscount: 10,
    referralEnabled: false,
    referralDiscount: 5,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/settings'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setSettings(settingsData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('설정이 저장되었습니다!');
      } else {
        alert('설정 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('설정 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            <p className="text-sm text-gray-500">Praying Pals Admin</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="총 회원"
            value={stats?.overview.totalUsers || 0}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="채널 추가"
            value={stats?.overview.channelAddedUsers || 0}
            subtitle={`${stats?.overview.channelAddRate || 0}%`}
            icon="💬"
            color="green"
          />
          <StatCard
            title="오늘 가입"
            value={stats?.overview.todayUsers || 0}
            icon="✨"
            color="purple"
          />
          <StatCard
            title="총 추천"
            value={stats?.referrals.total || 0}
            icon="🎁"
            color="pink"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Signups Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📊 일별 가입자 (최근 7일)
            </h3>
            <div className="space-y-3">
              {stats?.dailySignups.map((day) => (
                <div key={day.date} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-24">
                    {day.date.split('-').slice(1).join('/')}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((day.count / Math.max(...(stats?.dailySignups.map(d => d.count) || [1]))) * 100, 100)}%`,
                      }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-end px-3"
                    >
                      <span className="text-white text-sm font-bold">
                        {day.count}명
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🏆 추천왕 TOP 5
            </h3>
            {stats?.referrals.topReferrers && stats.referrals.topReferrers.length > 0 ? (
              <div className="space-y-3">
                {stats.referrals.topReferrers.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}</div>
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                        {user.name[0]}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">
                        {user.referralCount}명 추천
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">아직 추천 데이터가 없습니다</p>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">⚙️ 기능 설정</h3>

          <div className="space-y-6">
            {/* Early Bird Setting */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">🐣 얼리버드 쿠폰</h4>
                  <p className="text-sm text-gray-500">
                    회원가입 시 자동으로 할인 쿠폰 발급
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({ ...settings, earlyBirdEnabled: !settings.earlyBirdEnabled })
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    settings.earlyBirdEnabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.earlyBirdEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {settings.earlyBirdEnabled && (
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-700">할인율:</label>
                  <input
                    type="number"
                    value={settings.earlyBirdDiscount}
                    onChange={(e) =>
                      setSettings({ ...settings, earlyBirdDiscount: parseInt(e.target.value) })
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                    min="1"
                    max="100"
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
              )}
            </div>

            {/* Referral Setting */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">🎁 친구 초대 이벤트</h4>
                  <p className="text-sm text-gray-500">
                    추천 링크로 친구 초대 시 할인 제공
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({ ...settings, referralEnabled: !settings.referralEnabled })
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    settings.referralEnabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.referralEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {settings.referralEnabled && (
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-700">추가 할인율:</label>
                  <input
                    type="number"
                    value={settings.referralDiscount}
                    onChange={(e) =>
                      setSettings({ ...settings, referralDiscount: parseInt(e.target.value) })
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                    min="1"
                    max="100"
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
              )}
            </div>

            {/* Save Button */}
            <button
              onClick={saveSettings}
              disabled={saving}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:bg-gray-400"
            >
              {saving ? '저장 중...' : '💾 설정 저장'}
            </button>
          </div>
        </div>

        {/* Coupon Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🎫 쿠폰 통계</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {stats?.coupons.total || 0}
              </p>
              <p className="text-sm text-gray-600">총 발급</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {stats?.coupons.used || 0}
              </p>
              <p className="text-sm text-gray-600">사용됨</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">
                {stats?.coupons.unused || 0}
              </p>
              <p className="text-sm text-gray-600">미사용</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'pink';
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-600">{title}</p>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </motion.div>
  );
}
