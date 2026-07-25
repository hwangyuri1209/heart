import React, { useState } from 'react';
import { TabType } from '../../types';

interface MyPageViewProps {
  onTabChange: (tab: TabType) => void;
}

export const MyPageView: React.FC<MyPageViewProps> = ({ onTabChange }) => {
  const [timeframe, setTimeframe] = useState('최근 7일');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userName, setUserName] = useState('지민');
  const [showDetailReport, setShowDetailReport] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-28">
      {/* Profile Header Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-[#f8f6c9] p-8 rounded-[2rem] shadow-sm border border-[#585896]/10 relative overflow-hidden">
        <div className="relative">
          <div className="organic-shape w-32 h-32 absolute -z-10 blur-xl opacity-30 bg-[#c1c1ff]"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFYM9hN2drdbyY8TBY_jaakHXytsfzVdOJujSEfrIMyqQHb5YKNgi27S3JZ2hveIpHCHgIX7jVwSa7yXnDhMmSrWNsC3bH9urRr_tw5xej27WNKuZKXz0A7uTwKPFjztBIpnGJJLGtHZqEqlrqESBlDBuqk3-IR4k7Ti70gG3jU1oB9_ToUImcY5dozJToy4-BWMnRCoK36fj9YNlFunOqiYMRbm0wWsjDsts7bfncHrGWqm7tbES-WftVATgptDSPqihyC18NLxU"
            alt="프로필 이미지"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        <div className="text-center md:text-left flex-1">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#1d1d03] mb-2">
            {userName}님, 오늘도 당신을 응원해요
          </h2>
          <p className="text-[#474650] text-sm md:text-base">
            지금까지 42일째 마음을 돌보고 계시네요. 대단해요!
          </p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-4 py-1.5 rounded-full bg-[#aeedd5] text-[#316d5b] font-['Plus_Jakarta_Sans'] text-xs font-semibold">
              성실한 마음지기
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#e2dfff] text-[#13124f] font-['Plus_Jakarta_Sans'] text-xs font-semibold">
              명상 초심자
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowEditProfile(true)}
          className="px-8 py-3 bg-[#585896] text-white rounded-full font-['Plus_Jakarta_Sans'] text-xs font-bold hover:scale-95 transition-transform shadow-md"
        >
          프로필 편집
        </button>
      </section>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 마음 통계 Section */}
        <section className="md:col-span-2 bento-card bg-white p-8 rounded-[2rem] shadow-sm border border-[#585896]/10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#1d1d03] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#585896]">analytics</span>
              마음 통계
            </h3>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-[#e6e5b9]/50 border-none rounded-full px-4 py-1.5 font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#474650] focus:ring-2 focus:ring-[#585896] focus:outline-none"
            >
              <option>최근 7일</option>
              <option>지난 달</option>
            </select>
          </div>

          <div className="h-56 w-full relative">
            {/* Simple SVG Line Graph */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="gradient-lavender" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#585896" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#585896" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,120 Q50,80 100,100 T200,60 T300,90 T400,40 L400,150 L0,150 Z"
                fill="url(#gradient-lavender)"
              />
              <path
                d="M0,120 Q50,80 100,100 T200,60 T300,90 T400,40"
                fill="none"
                stroke="#585896"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
              <circle cx="100" cy="100" r="5" fill="#585896" />
              <circle cx="200" cy="60" r="5" fill="#585896" />
              <circle cx="400" cy="40" r="5" fill="#585896" />
            </svg>

            <div className="flex justify-between mt-4 text-[#474650] text-xs font-semibold">
              <span>월</span>
              <span>화</span>
              <span>수</span>
              <span>목</span>
              <span>금</span>
              <span>토</span>
              <span>일</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-[#fefccf] rounded-2xl border border-[#585896]/10">
              <p className="text-xs text-[#474650] mb-1">평균 평온도</p>
              <p className="text-xl font-bold text-[#585896]">82%</p>
            </div>
            <div className="text-center p-4 bg-[#fefccf] rounded-2xl border border-[#585896]/10">
              <p className="text-xs text-[#474650] mb-1">명상 시간</p>
              <p className="text-xl font-bold text-[#585896]">120분</p>
            </div>
            <div className="text-center p-4 bg-[#fefccf] rounded-2xl border border-[#585896]/10">
              <p className="text-xs text-[#474650] mb-1">기록 횟수</p>
              <p className="text-xl font-bold text-[#585896]">12회</p>
            </div>
          </div>
        </section>

        {/* 이번 달의 리포트 Card */}
        <section className="bento-card bg-[#9d9de0] text-[#32336e] p-8 rounded-[2rem] shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold mb-4">
              이번 달의 리포트
            </h3>
            <p className="text-sm leading-relaxed mb-6 opacity-90 font-['Be_Vietnam_Pro']">
              {userName}님은 이번 달에 '감사함'을 가장 많이 느끼셨어요. 불안함이 작년 대비 15% 감소했습니다.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/30 p-4 rounded-2xl">
              <span className="material-symbols-outlined text-2xl fill text-[#32336e]">
                favorite
              </span>
              <div>
                <p className="text-xs font-semibold">주요 감정 키워드</p>
                <p className="text-sm font-bold">#따뜻함 #평온 #용기</p>
              </div>
            </div>

            <button
              onClick={() => setShowDetailReport(true)}
              className="w-full py-3.5 bg-[#32336e] text-white rounded-full text-xs font-bold hover:bg-[#22235e] transition-colors shadow-md"
            >
              상세 리포트 보기
            </button>
          </div>
        </section>

        {/* Supporting Visual Card */}
        <section className="md:col-span-1 bento-card bg-[#b69ea0]/20 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center border border-[#b69ea0]/30">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-vwciwysgKsm_HQLAMEU28B81sT9eYwzbJOYULlYF3cPpbpPhkPy3igPwsOg4PjnLtBO94tMw3c1e-Zhcd5iwWiBUiF2T_zrzNtP0L3fYkyS0kIsqU72AjmlQ2zGAoxRN5DO2q0WqLf2NVtBxyVwCJxlXz6Blpuo_BxXrR8dFQF38OPh_MGRFjHVggx7biIjcFdDFen2ZCgEj1w95jJD3XD0NQ_WpYUesAB_ejweLxIEffEeLoCkhwdyoE-YOh-quvp2CY0Z9YjY"
            alt="An안아주는 일러스트"
            className="w-40 h-40 mb-4 object-contain"
          />
          <h4 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#463537] mb-2">
            당신은 혼자가 아니에요
          </h4>
          <p className="text-xs text-[#463537]/80 mb-6">
            상담사와의 대화가 필요하신가요?
          </p>
          <button
            onClick={() => onTabChange('chat')}
            className="px-6 py-2.5 border-2 border-[#585896] text-[#585896] rounded-full text-xs font-bold hover:bg-[#585896] hover:text-white transition-all shadow-sm"
          >
            상담 예약하기
          </button>
        </section>

        {/* Settings & Account Links */}
        <section className="md:col-span-2 bento-card bg-[#eceabe] p-8 rounded-[2rem] border border-[#585896]/10">
          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold mb-6 flex items-center gap-2 text-[#1d1d03]">
            <span className="material-symbols-outlined text-[#585896]">settings</span>
            계정 및 설정
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: '알림 및 알림 주기 설정', icon: 'notifications_active' },
              { label: '개인정보 및 보안', icon: 'lock' },
              { label: '프리미엄 구독 관리', icon: 'subscriptions' },
              { label: '도움말 및 고객 센터', icon: 'help' },
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-between p-4 bg-white/60 rounded-2xl hover:bg-white transition-colors group border border-white/40"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#585896]">
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold text-[#1d1d03]">{item.label}</span>
                </div>
                <span className="material-symbols-outlined text-[#474650] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fefccf] p-8 rounded-3xl max-w-md w-full shadow-2xl relative border border-[#585896]/20">
            <button
              onClick={() => setShowEditProfile(false)}
              className="absolute top-4 right-4 p-2 text-[#474650]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#585896] mb-4">
              프로필 편집
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">이름/닉네임</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white border border-[#c8c5d1] rounded-2xl px-4 py-2.5 text-sm text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="px-6 py-2.5 bg-[#585896] text-white rounded-full text-xs font-bold"
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Report Modal */}
      {showDetailReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fefccf] p-8 rounded-3xl max-w-lg w-full shadow-2xl relative border border-[#585896]/20">
            <button
              onClick={() => setShowDetailReport(false)}
              className="absolute top-4 right-4 p-2 text-[#474650]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#585896] mb-4">
              {userName}님의 이번 달 마음 리포트
            </h3>
            <div className="space-y-3 text-sm text-[#474650] leading-relaxed">
              <p>• <strong>평온한 날 비율:</strong> 전체 기록의 68%</p>
              <p>• <strong>가장 많이 사용된 태그:</strong> #성취감, #평온함, #감사함</p>
              <p>• <strong>명상 지속일:</strong> 42일 연속 누적</p>
              <p className="p-4 bg-white rounded-2xl text-xs text-[#316d5b] font-semibold border border-[#aeedd5]">
                "당신은 스스로의 감정을 인지하고 돌보는 능력이 훌륭하게 향상되었습니다. 이번 달의 평온한 에너지를 이어서 스스로에게 충분한 휴식을 선물해주세요."
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailReport(false)}
                className="px-6 py-2.5 bg-[#585896] text-white rounded-full text-xs font-bold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
