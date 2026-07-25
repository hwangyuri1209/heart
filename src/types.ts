export type TabType = 'home' | 'chat' | 'diary' | 'board' | 'meditation' | 'mypage';

export type MoodType = 'happy' | 'calm' | 'tired' | 'sad' | 'anxious';

export interface MoodOption {
  id: MoodType;
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
}

export interface DiaryRecord {
  id: string;
  title: string;
  date: string;
  content: string;
  mood: 'calm' | 'thoughtful' | 'gloomy';
  moodLabel: string;
  tags: string[];
  comfortLetter?: string;
}

export interface MeditationItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  audioUrl?: string;
}

export interface BoardComment {
  id: string;
  author: string;
  avatarUrl?: string;
  content: string;
  date: string;
}

export interface BoardPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  category: '위로' | '고민' | '자유' | '감사' | '응원';
  date: string;
  likes: number;
  isLiked?: boolean;
  comments: BoardComment[];
  tags: string[];
  moodBadge?: string;
}
