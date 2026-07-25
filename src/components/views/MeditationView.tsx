import React, { useState } from 'react';
import { MeditationItem } from '../../types';

export const MeditationView: React.FC = () => {
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<MeditationItem | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes

  const featuredSession: MeditationItem = {
    id: 'f1',
    title: '5분 호흡 명상',
    description: '짧은 시간 동안 호흡에 집중하며 복잡한 생각을 비우고 현재의 감각에 머물러 보세요.',
    duration: '5분',
    type: '가이드 명상',
    icon: 'spa',
    iconBg: 'bg-[#e2dfff]',
    iconColor: 'text-[#585896]',
  };

  const sleepCards: MeditationItem[] = [
    {
      id: 's1',
      title: '깊은 밤 숲의 소리',
      description: '자연의 백색 소음과 함께 깊은 숙면을 유도합니다.',
      duration: '15분',
      type: '오디오',
      icon: 'bedtime',
      iconBg: 'bg-[#f7dcde]',
      iconColor: 'text-[#6d595b]',
    },
    {
      id: 's2',
      title: '잔잔한 파도 호흡',
      description: '바닷가에 누워 있는 듯한 평온한 호흡 가이드.',
      duration: '10분',
      type: '호흡법',
      icon: 'waves',
      iconBg: 'bg-[#b1efd8]',
      iconColor: 'text-[#2c6956]',
    },
  ];

  const stressList: MeditationItem[] = [
    {
      id: 'st1',
      title: '분노를 가라앉히는 차',
      description: '감정의 소용돌이를 다스리는 음성 가이드.',
      duration: '5분 • 오디오',
      type: '오디오',
      icon: 'sentiment_calm',
      iconBg: 'bg-[#c1c1ff]',
      iconColor: 'text-[#585896]',
    },
    {
      id: 'st2',
      title: '마음 근육 강화하기',
      description: '스트레스 저항력을 높여주는 자기 자비 명상.',
      duration: '8분 • 가이드',
      type: '가이드',
      icon: 'psychology',
      iconBg: 'bg-[#b1efd8]',
      iconColor: 'text-[#2c6956]',
    },
    {
      id: 'st3',
      title: '나를 안아주는 시간',
      description: '스스로를 안아주는 자애의 순간.',
      duration: '12분 • 영상',
      type: '영상',
      icon: 'favorite',
      iconBg: 'bg-[#f7dcde]',
      iconColor: 'text-[#6d595b]',
    },
  ];

  const startMeditation = (item: MeditationItem) => {
    setActiveSession(item);
    setIsTimerRunning(true);
    setTimerSeconds(300);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-28">
      {/* Hero Section: Featured Meditation */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#e2dfff] to-[#b1efd8]/30 p-8 md:p-12 border border-[#585896]/10 shadow-sm">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#585896]/10 text-[#585896] font-['Plus_Jakarta_Sans'] text-xs font-semibold mb-4">
              오늘의 추천
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#32336e] mb-4">
              {featuredSession.title}
            </h2>
            <p className="text-[#474650] text-sm md:text-base mb-8 max-w-md leading-relaxed">
              {featuredSession.description}
            </p>
            <button
              onClick={() => startMeditation(featuredSession)}
              className="flex items-center gap-3 bg-[#585896] text-white px-8 py-4 rounded-full font-['Plus_Jakarta_Sans'] text-base font-semibold shadow-xl hover:opacity-90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined fill">play_arrow</span>
              <span>지금 시작하기</span>
            </button>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl organic-pulse"></div>
            <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-vwciwysgKsm_HQLAMEU28B81sT9eYwzbJOYULlYF3cPpbpPhkPy3igPwsOg4PjnLtBO94tMw3c1e-Zhcd5iwWiBUiF2T_zrzNtP0L3fYkyS0kIsqU72AjmlQ2zGAoxRN5DO2q0WqLf2NVtBxyVwCJxlXz6Blpuo_BxXrR8dFQF38OPh_MGRFjHVggx7biIjcFdDFen2ZCgEj1w95jJD3XD0NQ_WpYUesAB_ejweLxIEffEeLoCkhwdyoE-YOh-quvp2CY0Z9YjY"
                alt="Meditation Illustration"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Category: 잠들기 전 평온 */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#585896]">
              잠들기 전 평온
            </h3>
            <button className="text-[#585896] text-xs font-semibold flex items-center gap-1 hover:underline">
              전체보기 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sleepCards.map((card) => (
              <div
                key={card.id}
                onClick={() => startMeditation(card)}
                className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-transform duration-300 group cursor-pointer shadow-sm hover:shadow-md border border-white/40"
              >
                <div
                  className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center ${card.iconColor} mb-6 group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                </div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1d1d03] mb-2">
                  {card.title}
                </h4>
                <p className="text-[#474650] text-xs leading-relaxed mb-6">
                  {card.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#585896]">{card.duration}</span>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#585896] shadow-sm group-hover:bg-[#585896] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined fill">play_arrow</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category: 스트레스 해소 (Side List) */}
        <div className="space-y-6">
          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#585896]">
            스트레스 해소
          </h3>

          <div className="space-y-4">
            {stressList.map((item) => (
              <div
                key={item.id}
                onClick={() => startMeditation(item)}
                className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white transition-colors cursor-pointer border border-[#585896]/10 shadow-sm"
              >
                <div
                  className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center ${item.iconColor} shrink-0`}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div className="flex-grow">
                  <div className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1d1d03]">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#474650]">{item.duration}</div>
                </div>
                <span className="material-symbols-outlined text-[#777681]">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mood Picker / Interactive Section */}
      <section className="text-center pt-6">
        <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#585896] mb-2">
          지금 기분은 어떠신가요?
        </h3>
        <p className="text-[#474650] text-sm mb-8">
          상태에 맞는 명상을 추천해 드릴게요.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: '활기찬', icon: 'sentiment_very_satisfied', bg: 'bg-[#c1c1ff]', text: 'text-[#585896]' },
            { label: '평온한', icon: 'sentiment_satisfied', bg: 'bg-[#b1efd8]', text: 'text-[#2c6956]' },
            { label: '복잡한', icon: 'sentiment_neutral', bg: 'bg-[#dac0c2]', text: 'text-[#6d595b]' },
            { label: '지친', icon: 'sentiment_dissatisfied', bg: 'bg-[#9d9de0]/40', text: 'text-[#32336e]' },
          ].map((m, idx) => {
            const isSelected = selectedMoodFilter === m.label;
            return (
              <button
                key={idx}
                onClick={() => setSelectedMoodFilter(isSelected ? null : m.label)}
                className="group flex flex-col items-center gap-3 active:scale-95 transition-transform"
              >
                <div
                  className={`w-20 h-20 rounded-full ${m.bg} flex items-center justify-center ${m.text} group-hover:scale-110 transition-all ${
                    isSelected ? 'ring-4 ring-[#585896]/30 scale-110 shadow-lg' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">{m.icon}</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#1d1d03]">
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {selectedMoodFilter && (
          <div className="mt-8 p-4 bg-white/80 rounded-2xl max-w-md mx-auto text-xs text-[#585896] font-semibold border border-[#585896]/20">
            '{selectedMoodFilter}' 마음 상태를 위한 잔잔한 호흡 명상을 준비했어요. 상단 '5분 호흡 명상'을 시작해보세요!
          </div>
        )}
      </section>

      {/* Meditation Timer/Guided Breath Player Modal */}
      {activeSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#fefccf] p-8 rounded-3xl max-w-md w-full shadow-2xl relative text-center border border-[#585896]/20">
            <button
              onClick={() => setActiveSession(null)}
              className="absolute top-4 right-4 p-2 text-[#474650] hover:text-[#1d1d03]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span className="px-3 py-1 bg-[#e2dfff] text-[#13124f] text-xs font-bold rounded-full inline-block mb-4">
              {activeSession.type}
            </span>

            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#585896] mb-2">
              {activeSession.title}
            </h3>
            <p className="text-xs text-[#474650] mb-8">{activeSession.description}</p>

            {/* Breathing Circle Animation */}
            <div className="relative w-44 h-44 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#aeedd5]/40 rounded-full organic-pulse"></div>
              <div className="relative z-10 w-32 h-32 bg-[#585896] rounded-full flex flex-col items-center justify-center text-white shadow-xl">
                <span className="text-xs font-light tracking-widest uppercase mb-1">
                  호흡하기
                </span>
                <span className="text-xl font-bold font-mono">
                  {Math.floor(timerSeconds / 60)}:
                  {String(timerSeconds % 60).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-6 py-3 bg-[#585896] text-white rounded-full text-xs font-bold shadow-md hover:opacity-90"
              >
                {isTimerRunning ? '일시정지' : '다시 시작'}
              </button>
              <button
                onClick={() => setActiveSession(null)}
                className="px-6 py-3 bg-white border border-[#c8c5d1] text-[#1d1d03] rounded-full text-xs font-bold"
              >
                세션 종료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
