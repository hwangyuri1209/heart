import React, { useState } from 'react';
import { BoardPost, BoardComment } from '../../types';

export const BoardView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedPostDetail, setSelectedPostDetail] = useState<BoardPost | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Initial Posts Data
  const [posts, setPosts] = useState<BoardPost[]>([
    {
      id: 'p1',
      title: '오늘 퇴근길, 자그마한 위로를 전합니다.',
      content:
        '지하철을 타고 집에 가면서 문득 창밖 야경을 보았습니다. 모두 각자의 삶을 지켜내느라 치열했던 하루였겠지요. 오늘 유난히 지치셨던 분이 있다면, 그저 무사히 오늘을 보낸 것만으로도 너무 잘하셨다고 꼭 말씀드리고 싶어요. 다들 편안한 밤 보내세요.',
      author: '달빛산책',
      authorAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDey60YP87z2HYFPtyxUsPdyDSPw2W9OEgRyCJJrrK4s69lWBqOZv_SWXfMEkEQsmRQHI-q1CRmKCu7NcYYJPDmYBEEGot_QCUv2ySoEy8-LdcOJI3Ri9diO1MDYL3Mpytyca_oCWvwb0t8j8N9kb3ADyLMgaMyVtd-K0M_XubaKzfO4xkoK2XwzdlohLn4jDXsIEWMEZfeIoUtWzt0Svj1Kk0SdGoHny8kyrdTv1-9ctSIbQimqx_HSD53no-EFL45HD66PI2wzA8',
      category: '위로',
      date: '10분 전',
      likes: 24,
      isLiked: false,
      moodBadge: '🌿 평온함',
      tags: ['#퇴근길', '#오늘도고생했어', '#위로'],
      comments: [
        {
          id: 'c1',
          author: '따뜻한차한잔',
          content: '퇴근길에 이 글을 읽고 눈물이 왈칵 났네요. 따뜻한 말 한마디 감사해요.',
          date: '5분 전',
        },
        {
          id: 'c2',
          author: '봄날의햇살',
          content: '달빛산책님도 따뜻하고 평온한 밤 되시길 바랄게요!',
          date: '3분 전',
        },
      ],
    },
    {
      id: 'p2',
      title: '새로운 도전을 앞두고 마음이 너무 불안해요',
      content:
        '내일부터 새로운 프로젝트 팀으로 이동하게 되었습니다. 잘할 수 있을지, 사람들과 잘 어우러질 수 있을지 계속 나쁜 생각만 드네요. 저처럼 불안함을 극복해보신 분들의 조언을 부탁드려요.',
      author: '익명의구름',
      category: '고민',
      date: '1시간 전',
      likes: 15,
      isLiked: true,
      moodBadge: '🌧️ 불안함',
      tags: ['#새로운시작', '#불안극복', '#응원원해요'],
      comments: [
        {
          id: 'c3',
          author: '든든한버팀목',
          content:
            '처음은 누구에게나 두렵고 어색한 법이에요. 잘하려고 부담 갖지 말고, 그저 첫날은 가볍게 적응한다는 마음으로 가보세요. 응원합니다!',
          date: '45분 전',
        },
      ],
    },
    {
      id: 'p3',
      title: '매일 아침 10분 명상 시작한 지 한 달째!',
      content:
        '마음 상담소 앱에서 시작한 5분 명상을 매일 아침 지속해보았는데, 확실히 가슴 속 답답함이 많이 줄어들었어요. 마음 챙김의 힘을 느끼는 요즘입니다.',
      author: '행복한나무',
      category: '감사',
      date: '3시간 전',
      likes: 38,
      isLiked: false,
      moodBadge: '☀️ 행복함',
      tags: ['#명상루틴', '#마음챙김', '#감사한기록'],
      comments: [
        {
          id: 'c4',
          author: '지민',
          content: '한 달이나 지속하시다니 대단해요! 저도 내일부터 꼭 도전해봐야겠어요.',
          date: '2시간 전',
        },
      ],
    },
    {
      id: 'p4',
      title: '취준생분들, 너무 조급해하지 마세요',
      content:
        '저도 긴 취업 준비 기간 동안 밤마다 울었던 기억이 있습니다. 하지만 지나고 보니 그 정체되었던 시간도 제 자신을 단단하게 만들어준 자산이었어요. 여러분의 속도대로 천천히 걸어가도 괜찮습니다.',
      author: '선배소나무',
      category: '응원',
      date: '5시간 전',
      likes: 52,
      isLiked: false,
      moodBadge: '🌱 응원',
      tags: ['#취준생', '#할수있다', '#응원글'],
      comments: [],
    },
  ]);

  // Form State for Write Post
  const [writeTitle, setWriteTitle] = useState('');
  const [writeContent, setWriteContent] = useState('');
  const [writeCategory, setWriteCategory] = useState<'위로' | '고민' | '자유' | '감사' | '응원'>('위로');
  const [writeMoodBadge, setWriteMoodBadge] = useState('🌿 평온함');
  const [writeAuthor, setWriteAuthor] = useState('익명의온기');
  const [writeTagStr, setWriteTagStr] = useState('#위로 #소통');

  const categories = ['전체', '위로', '고민', '응원', '감사', '자유'];

  // Toggle Like Function
  const handleToggleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextIsLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextIsLiked,
            likes: nextIsLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );

    if (selectedPostDetail && selectedPostDetail.id === postId) {
      setSelectedPostDetail((prev) => {
        if (!prev) return null;
        const nextIsLiked = !prev.isLiked;
        return {
          ...prev,
          isLiked: nextIsLiked,
          likes: nextIsLiked ? prev.likes + 1 : prev.likes - 1,
        };
      });
    }
  };

  // Add Comment Function
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !selectedPostDetail) return;

    const newComment: BoardComment = {
      id: Date.now().toString(),
      author: '지민 (나)',
      content: newCommentText,
      date: '방금 전',
    };

    const updatedComments = [...selectedPostDetail.comments, newComment];

    setPosts((prev) =>
      prev.map((p) => (p.id === selectedPostDetail.id ? { ...p, comments: updatedComments } : p))
    );

    setSelectedPostDetail({
      ...selectedPostDetail,
      comments: updatedComments,
    });

    setNewCommentText('');
  };

  // Submit New Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!writeTitle.trim() || !writeContent.trim()) return;

    const tagList = writeTagStr
      .split(' ')
      .filter((t) => t.trim().length > 0)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    const newPost: BoardPost = {
      id: Date.now().toString(),
      title: writeTitle,
      content: writeContent,
      author: writeAuthor || '익명의온기',
      category: writeCategory,
      date: '방금 전',
      likes: 1,
      isLiked: true,
      moodBadge: writeMoodBadge,
      tags: tagList.length > 0 ? tagList : ['#소통'],
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setWriteTitle('');
    setWriteContent('');
    setShowWriteModal(false);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-28">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#585896] text-3xl">
              forum
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#1d1d03]">
              마음 광장
            </h2>
          </div>
          <p className="text-[#474650] text-sm md:text-base opacity-85">
            지친 마음을 솔직하게 터놓고, 따뜻한 위로와 응원의 온기를 나누는 공간입니다.
          </p>
        </div>

        <button
          onClick={() => setShowWriteModal(true)}
          className="flex items-center justify-center gap-2 bg-[#585896] text-white px-6 py-3 rounded-full font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">edit_note</span>
          <span>이야기 작성하기</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#585896] text-white shadow-sm'
                      : 'bg-white/80 text-[#474650] hover:bg-[#e2dfff] hover:text-[#13124f]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777681] text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="키워드나 태그 검색..."
              className="w-full bg-white/90 border border-[#585896]/20 rounded-full pl-10 pr-4 py-2 text-xs md:text-sm text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
            />
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white/40 rounded-3xl border border-dashed border-[#585896]/30">
            <span className="material-symbols-outlined text-4xl text-[#777681] mb-2">
              sentiment_dissatisfied
            </span>
            <p className="text-[#474650] font-semibold text-sm">
              해당하는 글이 아직 없습니다. 첫 이야기를 들려주시겠어요?
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPostDetail(post)}
              className="bg-white p-6 rounded-3xl bento-card shadow-sm hover:shadow-md border border-[#585896]/10 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              <div>
                {/* Badges & Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        post.category === '위로'
                          ? 'bg-[#e2dfff] text-[#13124f]'
                          : post.category === '고민'
                          ? 'bg-[#f7dcde] text-[#463537]'
                          : post.category === '감사'
                          ? 'bg-[#b1efd8] text-[#002118]'
                          : 'bg-[#9d9de0]/30 text-[#32336e]'
                      }`}
                    >
                      {post.category}
                    </span>
                    {post.moodBadge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f8f6c9] text-[#1d1d03] text-[11px] font-medium">
                        {post.moodBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#777681]">{post.date}</span>
                </div>

                {/* Title & Author */}
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1d1d03] mb-2 group-hover:text-[#585896] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[#474650] text-sm line-clamp-3 leading-relaxed mb-4 font-['Be_Vietnam_Pro']">
                  {post.content}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-[#585896] font-semibold bg-[#f2f0c4]/60 px-2.5 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer: Author & Interaction Controls */}
                <div className="pt-3 border-t border-[#f2f0c4] flex items-center justify-between text-xs text-[#474650]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#9d9de0]/40 flex items-center justify-center text-[10px] font-bold text-[#32336e]">
                      {post.author.slice(0, 1)}
                    </div>
                    <span className="font-semibold text-[#1d1d03]">{post.author}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => handleToggleLike(post.id, e)}
                      className={`flex items-center gap-1 font-semibold transition-colors ${
                        post.isLiked ? 'text-[#ba1a1a]' : 'text-[#777681] hover:text-[#ba1a1a]'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-base ${
                          post.isLiked ? 'fill' : ''
                        }`}
                      >
                        favorite
                      </span>
                      <span>{post.likes}</span>
                    </button>

                    <div className="flex items-center gap-1 font-semibold text-[#777681]">
                      <span className="material-symbols-outlined text-base">
                        chat_bubble_outline
                      </span>
                      <span>{post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Write New Post Modal */}
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
                rate_review
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#585896]">
                마음 광장에 온기 남기기
              </h3>
            </div>
            <p className="text-xs text-[#474650] mb-6">
              누군가에게 힘이 되는 따뜻한 글이나, 속마음을 편안하게 나눠주세요.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1d1d03] mb-1">
                    카테고리
                  </label>
                  <select
                    value={writeCategory}
                    onChange={(e) =>
                      setWriteCategory(
                        e.target.value as '위로' | '고민' | '자유' | '감사' | '응원'
                      )
                    }
                    className="w-full bg-white border border-[#c8c5d1] rounded-2xl px-3 py-2 text-xs font-semibold text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
                  >
                    <option value="위로">위로</option>
                    <option value="고민">고민</option>
                    <option value="응원">응원</option>
                    <option value="감사">감사</option>
                    <option value="자유">자유</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d03] mb-1">
                    감정 태그
                  </label>
                  <select
                    value={writeMoodBadge}
                    onChange={(e) => setWriteMoodBadge(e.target.value)}
                    className="w-full bg-white border border-[#c8c5d1] rounded-2xl px-3 py-2 text-xs font-semibold text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
                  >
                    <option value="🌿 평온함">🌿 평온함</option>
                    <option value="☀️ 행복함">☀️ 행복함</option>
                    <option value="🌧️ 불안함">🌧️ 불안함</option>
                    <option value="🌙 지침">🌙 지침</option>
                    <option value="🌱 응원">🌱 응원</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">
                  작성자 (닉네임)
                </label>
                <input
                  type="text"
                  value={writeAuthor}
                  onChange={(e) => setWriteAuthor(e.target.value)}
                  placeholder="익명의온기"
                  className="w-full bg-white border border-[#c8c5d1] rounded-2xl px-4 py-2 text-xs text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={writeTitle}
                  onChange={(e) => setWriteTitle(e.target.value)}
                  placeholder="따뜻한 한 마디를 건네보세요..."
                  className="w-full bg-white border border-[#c8c5d1] rounded-2xl px-4 py-2.5 text-sm text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">내용</label>
                <textarea
                  required
                  rows={5}
                  value={writeContent}
                  onChange={(e) => setWriteContent(e.target.value)}
                  placeholder="서로를 위한 소중한 공감의 공간입니다. 솔직하고 다정한 솔루션이나 이야기를 적어주세요..."
                  className="w-full bg-white border border-[#c8c5d1] rounded-2xl p-4 text-sm text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1d1d03] mb-1">해시태그</label>
                <input
                  type="text"
                  value={writeTagStr}
                  onChange={(e) => setWriteTagStr(e.target.value)}
                  placeholder="#위로 #오늘도수고했어"
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
                  className="px-6 py-2.5 bg-[#585896] text-white rounded-full text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Detail & Comment Modal */}
      {selectedPostDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fefccf] p-6 md:p-8 rounded-3xl max-w-xl w-full shadow-2xl relative border border-[#585896]/20 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setSelectedPostDetail(null)}
              className="absolute top-4 right-4 p-2 text-[#474650] hover:text-[#1d1d03]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-[#e2dfff] text-[#13124f] text-xs font-bold rounded-full">
                {selectedPostDetail.category}
              </span>
              {selectedPostDetail.moodBadge && (
                <span className="px-2.5 py-0.5 bg-[#f8f6c9] text-[#1d1d03] text-xs font-medium rounded-full">
                  {selectedPostDetail.moodBadge}
                </span>
              )}
            </div>

            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#1d1d03] mb-2 leading-tight">
              {selectedPostDetail.title}
            </h3>

            <div className="flex items-center justify-between text-xs text-[#777681] mb-6">
              <span className="font-semibold text-[#1d1d03]">
                작성자: {selectedPostDetail.author}
              </span>
              <span>{selectedPostDetail.date}</span>
            </div>

            {/* Scrollable Post Content & Comments */}
            <div className="overflow-y-auto flex-1 pr-2 space-y-6">
              <div className="bg-white/90 p-5 rounded-2xl text-sm leading-relaxed text-[#1d1d03] font-['Be_Vietnam_Pro'] border border-[#585896]/10">
                {selectedPostDetail.content}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {selectedPostDetail.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#585896] font-semibold bg-[#f2f0c4] px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleToggleLike(selectedPostDetail.id)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    selectedPostDetail.isLiked
                      ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]/30'
                      : 'bg-white text-[#474650] border-[#c8c5d1]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-base ${
                      selectedPostDetail.isLiked ? 'fill' : ''
                    }`}
                  >
                    favorite
                  </span>
                  <span>공감 {selectedPostDetail.likes}</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="border-t border-[#585896]/10 pt-4 space-y-4">
                <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#585896]">
                  댓글 ({selectedPostDetail.comments.length})
                </h4>

                {selectedPostDetail.comments.length === 0 ? (
                  <p className="text-xs text-[#777681] italic">
                    아직 따뜻한 댓글이 없습니다. 첫 마디를 건네보세요.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedPostDetail.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-white/70 p-3.5 rounded-2xl text-xs space-y-1 border border-[#585896]/5"
                      >
                        <div className="flex justify-between items-center text-[#777681]">
                          <span className="font-bold text-[#1d1d03]">
                            {comment.author}
                          </span>
                          <span>{comment.date}</span>
                        </div>
                        <p className="text-[#474650] leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Add Comment Input Bar */}
            <form onSubmit={handleAddComment} className="pt-4 mt-2 border-t border-[#585896]/10 flex gap-2">
              <input
                type="text"
                required
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="따뜻한 응원 댓글을 달아주세요..."
                className="flex-1 bg-white border border-[#c8c5d1] rounded-full px-4 py-2 text-xs text-[#1d1d03] focus:outline-none focus:ring-2 focus:ring-[#585896]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#585896] text-white rounded-full text-xs font-bold shadow-md hover:opacity-90"
              >
                등록
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
