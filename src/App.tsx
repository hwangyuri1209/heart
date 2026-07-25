import React, { useState } from 'react';
import { TabType, MoodType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/views/HomeView';
import { ChatView } from './components/views/ChatView';
import { DiaryView } from './components/views/DiaryView';
import { BoardView } from './components/views/BoardView';
import { MeditationView } from './components/views/MeditationView';
import { MyPageView } from './components/views/MyPageView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>('calm');

  const handleSelectMood = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  return (
    <div className="min-h-screen bg-[#fefccf] text-[#1d1d03] font-['Be_Vietnam_Pro'] antialiased flex flex-col">
      {/* Fixed Top Navigation Bar */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area with padding top for fixed header */}
      <main className="flex-1 mt-20 pt-4 px-6 md:px-16 max-w-7xl mx-auto w-full">
        {activeTab === 'home' && (
          <HomeView
            onTabChange={setActiveTab}
            onSelectMood={handleSelectMood}
            selectedMood={selectedMood}
          />
        )}

        {activeTab === 'chat' && (
          <ChatView selectedMood={selectedMood} />
        )}

        {activeTab === 'diary' && (
          <DiaryView />
        )}

        {activeTab === 'board' && (
          <BoardView />
        )}

        {activeTab === 'meditation' && (
          <MeditationView />
        )}

        {activeTab === 'mypage' && (
          <MyPageView onTabChange={setActiveTab} />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
