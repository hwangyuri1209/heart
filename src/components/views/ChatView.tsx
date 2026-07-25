import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, MoodType } from '../../types';

interface ChatViewProps {
  selectedMood: MoodType | null;
}

export const ChatView: React.FC<ChatViewProps> = ({ selectedMood }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '오늘 하루는 어떠셨나요? 힘들었던 일이나 즐거웠던 일, 무엇이든 편하게 이야기해주세요. 제가 들어드릴게요.',
      time: '오후 6:30',
    },
    {
      id: '2',
      sender: 'user',
      text: '회사 업무가 너무 많아서 조금 지쳤어요. 마음이 답답하네요.',
      time: '오후 6:32',
    },
    {
      id: '3',
      sender: 'ai',
      text: '업무가 많아서 고생 많으셨겠어요. 그 답답한 마음 충분히 이해해요. 지금 당장 가장 하고 싶은 게 있다면 무엇인가요?',
      time: '오후 6:32',
      suggestions: [
        '그냥 아무 생각 없이 쉬고 싶어',
        '따뜻한 차 한 잔 마시고 싶어',
        '누가 날 위로해줬으면 좋겠어',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isComfortLetterMode, setIsComfortLetterMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const currentTime = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const historyForApi = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/counseling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mood: selectedMood,
          history: historyForApi,
          type: isComfortLetterMode ? 'comfort-letter' : 'chat',
        }),
      });

      const data = await res.json();
      const aiReplyText =
        data.reply ||
        '당신의 이야기를 들으니 마음이 깊이 가 닿네요. 오늘 밤은 꼭 스스로를 따뜻하게 보듬어주셨으면 합니다.';

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: '당신의 이야기를 듣는 동안 깊은 따뜻함을 느낍니다. 언제나 당신의 편에서 응원하고 있어요.',
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
      setIsComfortLetterMode(false);
    }
  };

  const handleChipClick = (suggestionText: string) => {
    handleSend(suggestionText);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)] pb-28">
      {/* Top Counselor Info Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#585896]/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#585896] tracking-tight">
              따뜻한 마음 상담원
            </h2>
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#2c6956] font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-[#2c6956] rounded-full inline-block animate-pulse"></span>
              상담 가능 (Gemini AI 연동)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsComfortLetterMode(!isComfortLetterMode)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              isComfortLetterMode
                ? 'bg-[#585896] text-white shadow-md'
                : 'bg-[#e2dfff] text-[#13124f] hover:bg-[#c1c1ff]'
            }`}
            title="위로 편지 모드 설정"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            {isComfortLetterMode ? '위로 편지 작성중' : '위로 편지 요청'}
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#9d9de0] shadow-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM8k2Q2OwZYv-dM4AVZiminqlXZe2MTHLoLR0ziGzoEUy1n7RZ5p9B9B1VgMvEUKFXPRQwQ-FgrspmRGvce4LpbXHqRh4iwkxp1jc8R03MshHZ5NDpkhQ_oLCpvZ3TFgt0ZHocOSRlHNCyhTMkBu09IWsY7Ij4XuPfAFjprEjDTP2H7g-k6ZpKKNanppaMfhyeVpIaW4ah2pxVtexWc6kTNVxh5r_GQAA1Ndjo2fSgIVu-JmqkYR0hxa-PFYK9EbB1loMplaRAjC4"
              alt="상담원 프로필"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col items-center text-center space-y-3 py-4">
        <div className="w-16 h-16 rounded-full bg-[#aeedd5] flex items-center justify-center animate-pulse shadow-sm">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-vwciwysgKsm_HQLAMEU28B81sT9eYwzbJOYULlYF3cPpbpPhkPy3igPwsOg4PjnLtBO94tMw3c1e-Zhcd5iwWiBUiF2T_zrzNtP0L3fYkyS0kIsqU72AjmlQ2zGAoxRN5DO2q0WqLf2NVtBxyVwCJxlXz6Blpuo_BxXrR8dFQF38OPh_MGRFjHVggx7biIjcFdDFen2ZCgEj1w95jJD3XD0NQ_WpYUesAB_ejweLxIEffEeLoCkhwdyoE-YOh-quvp2CY0Z9YjY"
            alt="Heart"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#585896]">
            안녕하세요, 당신의 마음을 듣고 싶어요.
          </h3>
          <p className="text-[#474650] text-sm opacity-80 mt-1">
            지친 하루 끝에 잠시 쉬어갈 수 있는 따뜻한 대화를 나눠요.
          </p>
        </div>
      </div>

      {/* Date Separator */}
      <div className="flex justify-center my-4">
        <span className="px-4 py-1 rounded-full bg-[#f2f0c4] text-[#474650] text-xs font-semibold">
          오늘
        </span>
      </div>

      {/* Chat Messages */}
      <div className="space-y-6 flex-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user'
                ? 'justify-end ml-auto max-w-[85%] md:max-w-[70%]'
                : 'max-w-[85%] md:max-w-[70%]'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden mt-1 bg-[#aeedd5] p-1 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[#2c6956] text-xl fill">
                  spa
                </span>
              </div>
            )}

            <div
              className={`space-y-2 ${
                msg.sender === 'user' ? 'flex flex-col items-end' : ''
              }`}
            >
              <div
                className={`p-4 shadow-sm text-sm md:text-base whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#585896] text-white chat-bubble-user'
                    : 'bg-[#aeedd5] text-[#316d5b] chat-bubble-ai'
                }`}
              >
                <p className="font-['Be_Vietnam_Pro']">{msg.text}</p>
              </div>

              {/* Quick Response Chips if available */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggestions.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#c8c5d1] hover:bg-[#aeedd5] hover:border-[#2c6956] transition-all text-xs font-semibold text-[#1d1d03] shadow-sm active:scale-95"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[11px] text-[#474650]/60 px-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-[#aeedd5] p-1 flex items-center justify-center animate-spin">
              <span className="material-symbols-outlined text-[#2c6956] text-xl">
                sync
              </span>
            </div>
            <div className="bg-[#aeedd5] text-[#316d5b] p-4 chat-bubble-ai text-sm flex items-center gap-2">
              <span>상담원이 당신의 마음을 보듬는 답장을 작성 중입니다...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-16 left-0 w-full bg-[#fefccf]/90 backdrop-blur-md px-4 pb-4 pt-2 z-40 border-t border-[#585896]/10">
        <div className="max-w-3xl mx-auto flex items-center gap-2 bg-[#f8f6c9] rounded-3xl p-2 border border-[#585896]/20 shadow-inner">
          <button 
            type="button"
            onClick={() => setIsComfortLetterMode(!isComfortLetterMode)}
            className={`p-2.5 rounded-full transition-colors ${
              isComfortLetterMode ? 'bg-[#585896] text-white' : 'text-[#474650] hover:text-[#585896]'
            }`}
            title="위로 편지 모드 토글"
          >
            <span className="material-symbols-outlined text-xl">
              {isComfortLetterMode ? 'mail' : 'add_circle'}
            </span>
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              isComfortLetterMode
                ? '오늘의 이야기나 느낀 점을 편지처럼 적어보세요...'
                : '지금 마음을 이야기해보세요...'
            }
            className="flex-1 bg-transparent border-none focus:outline-none px-2 py-2 text-sm md:text-base text-[#1d1d03] placeholder-[#474650]/50"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3 bg-[#585896] text-white rounded-full hover:opacity-90 active:scale-95 transition-transform shadow-md disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
