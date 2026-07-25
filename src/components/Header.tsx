import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fefccf]/80 backdrop-blur-md border-b border-[#585896]/10">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onTabChange('home')}
        >
          <span className="material-symbols-outlined text-[#585896] text-3xl fill transition-transform group-hover:scale-105">
            spa
          </span>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#585896] tracking-tight">
            마음 상담소
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="w-10 h-10 rounded-full bg-[#9d9de0]/30 flex items-center justify-center hover:bg-[#9d9de0]/50 transition-colors"
            title="알림"
          >
            <span className="material-symbols-outlined text-[#32336e] text-xl">
              notifications
            </span>
          </button>

          <button 
            onClick={() => onTabChange('mypage')}
            className={`w-10 h-10 rounded-full border-2 transition-all overflow-hidden p-0.5 ${
              activeTab === 'mypage' ? 'border-[#585896] ring-2 ring-[#585896]/20' : 'border-[#585896]/20'
            }`}
            title="마이페이지"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDey60YP87z2HYFPtyxUsPdyDSPw2W9OEgRyCJJrrK4s69lWBqOZv_SWXfMEkEQsmRQHI-q1CRmKCu7NcYYJPDmYBEEGot_QCUv2ySoEy8-LdcOJI3Ri9diO1MDYL3Mpytyca_oCWvwb0t8j8N9kb3ADyLMgaMyVtd-K0M_XubaKzfO4xkoK2XwzdlohLn4jDXsIEWMEZfeIoUtWzt0Svj1Kk0SdGoHny8kyrdTv1-9ctSIbQimqx_HSD53no-EFL45HD66PI2wzA8"
              alt="프로필"
              className="w-full h-full object-cover rounded-full"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
