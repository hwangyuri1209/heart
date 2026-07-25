import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: '홈', icon: 'home' },
    { id: 'chat', label: '상담', icon: 'chat_bubble' },
    { id: 'diary', label: '일기', icon: 'calendar_today' },
    { id: 'board', label: '게시판', icon: 'forum' },
    { id: 'meditation', label: '명상', icon: 'self_improvement' },
    { id: 'mypage', label: '마이', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#fefccf]/90 backdrop-blur-md z-50 rounded-t-2xl shadow-[0_-4px_30px_rgba(88,88,150,0.08)]">
      <div className="flex justify-around items-center w-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-[#9d9de0] text-[#32336e] rounded-full px-4 py-1.5 scale-95 shadow-sm font-semibold'
                  : 'text-[#474650]/70 hover:text-[#585896] px-4 py-1.5'
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl ${
                  isActive ? 'fill' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-wider mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
