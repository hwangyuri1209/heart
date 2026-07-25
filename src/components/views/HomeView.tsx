import React, { useState } from 'react';
import { TabType, MoodType } from '../../types';

interface HomeViewProps {
  onTabChange: (tab: TabType) => void;
  onSelectMood: (mood: MoodType) => void;
  selectedMood: MoodType | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onTabChange,
  onSelectMood,
  selectedMood,
}) => {
  const [showCardModal, setShowCardModal] = useState(false);

  const moods: { id: MoodType; label: string; icon: string; bg: string; text: string }[] = [
    { id: 'happy', label: '행복해요', icon: 'sentiment_very_satisfied', bg: 'bg-[#aeedd5]', text: 'text-[#2c6956]' },
    { id: 'calm', label: '평온해요', icon: 'sentiment_satisfied', bg: 'bg-[#c1c1ff]', text: 'text-[#585896]' },
    { id: 'tired', label: '피곤해요', icon: 'sentiment_neutral', bg: 'bg-[#e6e5b9]', text: 'text-[#474650]' },
    { id: 'sad', label: '슬퍼요', icon: 'sentiment_dissatisfied', bg: 'bg-[#dac0c2]', text: 'text-[#6d595b]' },
    { id: 'anxious', label: '불안해요', icon: 'sentiment_very_dissatisfied', bg: 'bg-[#ffdad6]', text: 'text-[#ba1a1a]' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Welcome & Mood Selector */}
      <section className="space-y-4">
        <div>
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#1d1d03] mb-2">
            오늘의 기분은 어떤가요?
          </h2>
          <p className="text-[#474650] text-base opacity-85 max-w-lg">
            당신의 마음을 가장 잘 나타내는 표정을 골라주세요. 언제든 솔직하게 표현해도 괜찮아요.
          </p>
        </div>

        {/* Mood Selector Horizontal Nodes */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
          <div className="flex gap-6 min-w-max pt-2">
            {moods.map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMood(m.id)}
                  className={`flex flex-col items-center gap-3 group transition-transform ${
                    isSelected ? 'scale-105' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`organic-shape w-20 h-20 ${m.bg} flex items-center justify-center transition-all ${
                      isSelected ? 'ring-4 ring-[#585896]/30 shadow-lg scale-105' : ''
                    }`}
                  >
                    <span className={`material-symbols-outlined text-4xl ${m.text}`}>
                      {m.icon}
                    </span>
                  </div>
                  <span
                    className={`font-['Plus_Jakarta_Sans'] text-xs font-semibold ${
                      isSelected ? 'text-[#585896] font-bold' : 'text-[#474650]'
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area: Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Daily Card Section (Primary) */}
        <div className="md:col-span-7 lg:col-span-8 bg-white rounded-3xl overflow-hidden soft-glow transition-transform hover:scale-[1.01] duration-500">
          <div className="relative h-60 md:h-72 overflow-hidden bg-[#f8f6c9]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-vwciwysgKsm_HQLAMEU28B81sT9eYwzbJOYULlYF3cPpbpPhkPy3igPwsOg4PjnLtBO94tMw3c1e-Zhcd5iwWiBUiF2T_zrzNtP0L3fYkyS0kIsqU72AjmlQ2zGAoxRN5DO2q0WqLf2NVtBxyVwCJxlXz6Blpuo_BxXrR8dFQF38OPh_MGRFjHVggx7biIjcFdDFen2ZCgEj1w95jJD3XD0NQ_WpYUesAB_ejweLxIEffEeLoCkhwdyoE-YOh-quvp2CY0Z9YjY"
              alt="오늘의 마음 카드 수채화"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#e2dfff] text-[#13124f] px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                오늘의 마음 카드
              </span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#585896] mb-3">
              잠시 멈춰서 숨을 고르세요
            </h3>
            <p className="text-[#474650] leading-relaxed text-sm md:text-base">
              오늘 하루도 고생 많으셨습니다. 가끔은 아무것도 하지 않고 오직 당신의 호흡에만 집중하는 시간이 필요합니다. 3분간의 명상을 통해 당신의 마음을 가다듬어 보세요.
            </p>
            <button
              onClick={() => setShowCardModal(true)}
              className="mt-6 flex items-center gap-2 text-[#585896] font-semibold hover:opacity-80 transition-opacity group"
            >
              자세히 읽기
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Right Bento Column */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          {/* AI Counseling Quick Start Card */}
          <div 
            onClick={() => onTabChange('chat')}
            className="bg-[#9d9de0] p-8 rounded-3xl soft-glow relative overflow-hidden group cursor-pointer hover:bg-[#8d8dd0] transition-colors"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#32336e]/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#32336e] text-3xl fill">
                  auto_awesome
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-semibold text-[#32336e] mb-2">
                AI 마음 상담 시작
              </h3>
              <p className="text-[#32336e]/80 text-sm leading-relaxed mb-6">
                지금 당장 누군가와 대화가 필요하다면, 따뜻한 마음의 AI 상담사가 기다리고 있어요.
              </p>
              <button className="w-full bg-[#32336e] text-white py-3.5 rounded-full font-bold transition-all hover:opacity-95 active:scale-95 shadow-md">
                대화 시작하기
              </button>
            </div>
            {/* Decorative Element */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          {/* Recent Activity / Journaling */}
          <div className="bg-[#aeedd5]/30 p-6 rounded-3xl border border-[#aeedd5]/50">
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs text-[#2c6956] font-bold mb-4 uppercase tracking-widest">
              최근 기록
            </h4>
            <div className="space-y-4">
              <div 
                onClick={() => onTabChange('diary')}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/50 p-2 rounded-xl transition-colors"
              >
                <div className="w-2 h-12 bg-[#2c6956] rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-[#1d1d03]">어제의 일기</p>
                  <p className="text-xs text-[#474650] italic">"비오는 날의 차 한 잔이..."</p>
                </div>
              </div>
              <div 
                onClick={() => onTabChange('meditation')}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/50 p-2 rounded-xl transition-colors"
              >
                <div className="w-2 h-12 bg-[#9d9de0] rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-[#1d1d03]">명상 기록</p>
                  <p className="text-xs text-[#474650]">마음 챙김 명상 • 15분 완료</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote of the Day Section */}
      <section className="text-center max-w-2xl mx-auto py-12 px-6 border-y border-[#1d1d03]/10">
        <span className="material-symbols-outlined text-[#585896]/40 text-4xl mb-3 fill">
          format_quote
        </span>
        <p className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl text-[#585896]/90 italic mb-3 leading-relaxed">
          "가장 어두운 밤도 언젠가는 끝나고 태양이 떠오를 것입니다."
        </p>
        <span className="text-xs font-bold text-[#474650]/60 tracking-wider uppercase">
          — 빅토르 위고
        </span>
      </section>

      {/* Card Detail Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fefccf] p-8 rounded-3xl max-w-lg w-full shadow-2xl relative border border-[#585896]/20">
            <button
              onClick={() => setShowCardModal(false)}
              className="absolute top-4 right-4 p-2 text-[#474650] hover:text-[#1d1d03]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <span className="inline-block bg-[#e2dfff] text-[#13124f] px-3 py-1 rounded-full text-xs font-bold mb-4">
              오늘의 마음 카드
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#585896] mb-4">
              잠시 멈춰서 숨을 고르세요
            </h3>
            <div className="space-y-4 text-[#474650] text-sm md:text-base leading-relaxed">
              <p>
                오늘 하루, 수많은 기대를 짊어지고 달리느라 고생하셨습니다. 우리에겐 항상 무언가를 이루어내야 한다는 부담감이 따르지만, 가끔은 아무런 역할도 내려놓고 숨을 고르는 찰나의 순간이 필요합니다.
              </p>
              <p>
                천천히 코로 숨을 들이쉬어 보세요. 배가 차오르는 감각에 집중하고, 3초간 머물렀다가 입으로 천천히 내쉬어 봅니다.
              </p>
              <p className="font-semibold text-[#585896]">
                당신은 지금 모습 그대로 이미 충분히 훌륭합니다.
              </p>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCardModal(false);
                  onTabChange('meditation');
                }}
                className="px-6 py-3 bg-[#585896] text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                명상 시작하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
