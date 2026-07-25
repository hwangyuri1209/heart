import React, { useState } from 'react';
import { DiaryRecord } from '../../types';

export const DiaryView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('2024년 5월');
  const [selectedDay, setSelectedDay] = useState<number | null>(8);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<DiaryRecord | null>(null);

  const [records, setRecords] = useState<DiaryRecord[]>([
    {
      id: '1',
      title: '오늘의 일기',
      date: '5월 8일 오후 9:20',
      content:
        '오늘 회사에서의 미팅이 생각보다 잘 끝났다. 걱정했던 것보다 사람들의 반응이 좋아서 다행이야. 작은 성취감이지만 마음이 따뜻해지는 저녁이다.',
      mood: 'calm',
      moodLabel: '평온함',
      tags: ['#성취감', '#회사생활'],
      comfortLetter:
        '지민님, 오늘 미팅을 무사히 잘 끝마치신 것을 진심으로 축하해요! 걱정했던 시간만큼 큰 보람과 안도감이 찾아왔을 거예요. 작은 성취들이 모여 당신의 하루를 단단하게 만들어줍니다. 참 잘해내셨어요.',
    },
    {
      id: '2',
      title: '명상 후 소감',
      date: '5월 7일 오전 7:30',
      content:
        '아침 명상을 통해 머릿속이 한결 가벼워졌다. 숨을 들이쉬고 내쉴 때의 감각에 집중하니 잡념이 사라지는 기분.',
      mood: 'calm',
      moodLabel: '평온함',
      tags: ['#평온함', '#루틴'],
      comfortLetter:
        '고요한 아침 속에서 호흡과 마주하는 시간, 스스로에게 선물한 최고의 안식이었네요. 맑아진 마음으로 오늘 하루도 따뜻하게 흘러가기를 바랍니다.',
    },
    {
      id: '3',
      title: '조금 힘든 날',
      date: '5월 5일 오후 11:45',
      content:
        '비 오는 날이라 그런지 마음이 축 처진다. 아무것도 하기 싫고 그냥 누워만 있고 싶었던 날. 내일은 좀 더 활기찼으면 좋겠다.',
      mood: 'gloomy',
      moodLabel: '울적함',
      tags: ['#무기력', '#날씨'],
      comfortLetter:
        '비가 오는 날엔 우리 마음도 자연스레 가라앉고 쉬어가고 싶어지죠. 아무것도 하지 않는 하루도 결코 쓸모없는 날이 아닙니다. 오늘 밤엔 자신을 토닥이며 편히 쉬어주세요.',
    },
  ]);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState<'calm' | 'thoughtful' | 'gloomy'>('calm');
  const [newTagStr, setNewTagStr] = useState('#일상 #마음돌봄');
  const [generatingLetter, setGeneratingLetter] = useState(false);

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setGeneratingLetter(true);

    let generatedLetter = '';
    try {
      const res = await fetch('/api/counseling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `[일기 제목: ${newTitle}]\n[일기 내용: ${newContent}]`,
          mood: newMood,
          type: 'comfort-letter',
        }),
      });
      const data = await res.json();
      generatedLetter = data.reply || '오늘 하루를 다정하게 기입한 당신의 마음에 감사와 위로의 마음을 전합니다.';
    } catch (err) {
      console.error('Comfort letter generation error:', err);
      generatedLetter = '오늘 하루 수고 많으셨습니다. 소중한 일기 기록이 마음에 작은 평온을 가져다주길 바랄게요.';
    } finally {
      setGeneratingLetter(false);
    }

    const moodLabelMap = {
      calm: '평온함',
      thoughtful: '생각많음',
      gloomy: '울적함',
    };

    const tagsArray = newTagStr
      .split(' ')
      .filter((t) => t.startsWith('#') || t.length > 0)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    const newRecord: DiaryRecord = {
      id: Date.now().toString(),
      title: newTitle,
      date: `${new Date().getMonth() + 1}월 ${new Date().getDate()}일 ${new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`,
      content: newContent,
      mood: newMood,
      moodLabel: moodLabelMap[newMood],
      tags: tagsArray.length > 0 ? tagsArray : ['#일상'],
      comfortLetter: generatedLetter,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setNewTitle('');
    setNewContent('');
    setShowWriteModal(false);
    setSelectedRecordForDetail(newRecord);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 relative pb-28">
      {/* Mood Calendar Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#1d1d03]">
            마음의 흐름
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentMonth('2024년 4월')}
              className="p-1.5 rounded-full hover:bg-[#f2f0c4] transition-colors"
            >
              <span className="material-symbols-outlined text-[#1d1d03]">chevron_left</span>
            </button>
            <span className="font-['Plus_Jakarta_Sans'] text-base font-semibold px-2 text-[#1d1d03]">
              {currentMonth}
            </span>
            <button
              onClick={() => setCurrentMonth('2024년 5월')}
              className="p-1.5 rounded-full hover:bg-[#f2f0c4] transition-colors"
            >
              <span className="material-symbols-outlined text-[#1d1d03]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-[#f8f6c9] rounded-[2rem] p-6 sanctuary-shadow border border-[#585896]/10">
          <div className="grid grid-cols-7 gap-y-5 text-center">
            {/* Days of Week Header */}
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
              <div key={i} className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#777681]">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {[28, 29, 30].map((d) => (
              <div key={`prev-${d}`} className="text-[#777681]/40 text-sm py-2">
                {d}
              </div>
            ))}

            {[
              { day: 1, mood: 'bg-[#aeedd5]' },
              { day: 2, mood: 'bg-[#9d9de0]' },
              { day: 3, mood: 'bg-[#b69ea0]' },
              { day: 4, mood: 'bg-[#aeedd5]' },
              { day: 5, mood: 'bg-[#9d9de0]' },
              { day: 6, mood: 'bg-[#aeedd5]' },
              { day: 7, mood: 'bg-[#aeedd5]' },
              { day: 8, mood: 'bg-[#9d9de0]', isToday: true },
              { day: 9, mood: null },
              { day: 10, mood: null },
              { day: 11, mood: null },
              { day: 12, mood: null },
              { day: 13, mood: null },
              { day: 14, mood: null },
            ].map((item) => (
              <div
                key={`curr-${item.day}`}
                onClick={() => setSelectedDay(item.day)}
                className={`text-sm py-2 relative cursor-pointer rounded-full transition-all ${
                  item.isToday
                    ? 'bg-[#585896]/15 font-bold text-[#585896]'
                    : selectedDay === item.day
                    ? 'bg-[#585896]/10 font-bold'
                    : 'text-[#1d1d03]'
                }`}
              >
                {item.day}
                {item.mood && (
                  <div className={`w-2 h-2 rounded-full ${item.mood} mx-auto mt-1`} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-[#c8c5d1]/30 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#aeedd5]"></div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#474650]">평온함</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#9d9de0]"></div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#474650]">생각많음</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#b69ea0]"></div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#474650]">울적함</span>
            </div>
          </div>
        </div>
      </section>

      {/* Past Records Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#1d1d03]">
            지난 기록들
          </h2>
          <div className="px-3 py-1 bg-[#aeedd5]/50 text-[#316d5b] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-full">
            {records.length}개의 기록
          </div>
        </div>

        {/* Bento-style Records List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              onClick={() => setSelectedRecordForDetail(rec)}
              className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md border border-[#585896]/10"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      rec.mood === 'calm'
                        ? 'bg-[#aeedd5] text-[#316d5b]'
                        : rec.mood === 'thoughtful'
                        ? 'bg-[#9d9de0] text-[#32336e]'
                        : 'bg-[#b69ea0] text-[#463537]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {rec.mood === 'calm'
                        ? 'sentiment_satisfied'
                        : rec.mood === 'thoughtful'
                        ? 'self_improvement'
                        : 'sentiment_dissatisfied'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1d1d03]">
                      {rec.title}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#474650]">
                      {rec.date}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#777681] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>

              <p className="text-[#474650] text-sm line-clamp-2 leading-relaxed mb-4">
                {rec.content}
              </p>

              <div className="flex flex-wrap gap-2">
                {rec.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-[#b1efd8] text-[#002118] rounded-full text-[11px] font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAB: Floating Action Button */}
      <button
        onClick={() => setShowWriteModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#585896] text-white rounded-full sanctuary-shadow flex items-center justify-center z-40 active:scale-95 hover:scale-105 transition-transform shadow-xl"
        title="일기 쓰기 & 위로 편지 받기"
      >
        <span className="material-symbols-outlined text-3xl">edit</span>
      </button>

      {/* Write New Diary Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fefccf] p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative border border-[#585896]/20 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowWriteModal(false)}
              className="absolute top-4 right-4 p-2 text-[#474650] hover:text-[#1d1d03]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#585896] text-2xl">
                edit_note
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#585896]">
                새 일기 쓰기 & Gemini 위로 편지
              </h3>
            </div>
            <p className="text-xs text-[#474650] mb-6">
              오늘의 마음을 솔직하게 기록하면, Gemini AI가 당신만을 위한 다정한 위로 편지를 전해줍니다.
            </p>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">
                  오늘의 감정 상태
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewMood('calm')}
                    className={`py-2 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      newMood === 'calm'
                        ? 'bg-[#aeedd5] text-[#316d5b] ring-2 ring-[#2c6956]'
                        : 'bg-white text-[#474650]'
                    }`}
                  >
                    <span>평온함</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMood('thoughtful')}
                    className={`py-2 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      newMood === 'thoughtful'
                        ? 'bg-[#9d9de0] text-[#32336e] ring-2 ring-[#585896]'
                        : 'bg-white text-[#474650]'
                    }`}
                  >
                    <span>생각많음</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMood('gloomy')}
                    className={`py-2 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      newMood === 'gloomy'
                        ? 'bg-[#b69ea0] text-[#463537] ring-2 ring-[#6d595b]'
                        : 'bg-white text-[#474650]'
                    }`}
                  >
                    <span>울적함</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">
                  제목
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 조금지친 퇴근길"
                  className="w-full bg-white border border-[#c8c5d1] rounded-2xl px-4 py-2.5 text-sm text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">
                  내용
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="오늘 하루 마음속 솔직한 이야기를 써보세요..."
                  className="w-full bg-white border border-[#c8c5d1] rounded-2xl p-4 text-sm text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">
                  태그
                </label>
                <input
                  type="text"
                  value={newTagStr}
                  onChange={(e) => setNewTagStr(e.target.value)}
                  placeholder="#일상 #성취감"
                  className="w-full bg-white border border-[#c8c5d1] rounded-2xl px-4 py-2 text-xs text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-[#474650] hover:text-[#1d1d03]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={generatingLetter}
                  className="px-6 py-2.5 bg-[#585896] text-white rounded-full text-xs font-semibold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  {generatingLetter ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">
                        sync
                      </span>
                      위로 편지 작성중...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      저장하고 위로 편지 받기
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecordForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fefccf] p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative border border-[#585896]/20 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRecordForDetail(null)}
              className="absolute top-4 right-4 p-2 text-[#474650] hover:text-[#1d1d03]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span className="px-3 py-1 bg-[#aeedd5] text-[#316d5b] text-xs font-bold rounded-full inline-block mb-3">
              {selectedRecordForDetail.moodLabel}
            </span>

            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#1d1d03] mb-1">
              {selectedRecordForDetail.title}
            </h3>
            <p className="text-xs text-[#474650] mb-4">{selectedRecordForDetail.date}</p>

            <div className="p-4 bg-white/80 rounded-2xl text-sm leading-relaxed text-[#1d1d03] mb-6">
              {selectedRecordForDetail.content}
            </div>

            {selectedRecordForDetail.comfortLetter && (
              <div className="p-5 bg-[#e2dfff] rounded-2xl border border-[#9d9de0]/40 space-y-2">
                <div className="flex items-center gap-2 text-[#13124f] font-bold text-sm">
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  <span>상담소의 위로 편지</span>
                </div>
                <p className="text-xs md:text-sm text-[#32336e] leading-relaxed whitespace-pre-wrap font-['Be_Vietnam_Pro']">
                  {selectedRecordForDetail.comfortLetter}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedRecordForDetail(null)}
                className="px-6 py-2 bg-[#585896] text-white rounded-full text-xs font-semibold"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
