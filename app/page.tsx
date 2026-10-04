'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MetricTicker } from '@/components/MetricTicker';
import { StoriesBar } from '@/components/StoriesBar';
import { StoriesPlayer } from '@/components/StoriesPlayer';
import { FilterTabs } from '@/components/FilterTabs';
import { CreatorGrid } from '@/components/CreatorGrid';
import { CreatorProfile } from '@/components/CreatorProfile';
import { BrandMatcher } from '@/components/BrandMatcher';
import { CampaignCalculator } from '@/components/CampaignCalculator';
import { AboutNetwork } from '@/components/AboutNetwork';
import { TelegramCTA } from '@/components/TelegramCTA';
import { TelegramModal } from '@/components/TelegramModal';
import { MobileBottomCTA } from '@/components/MobileBottomCTA';
import { Footer } from '@/components/Footer';
import { CREATORS } from '@/data/creators';
import { Creator, CreatorCategory } from '@/types';

export default function Home() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [profileInitialTab, setProfileInitialTab] = useState<'feed' | 'collabs' | 'dialogue'>('feed');
  const [storyCreator, setStoryCreator] = useState<Creator | null>(null);
  const [activeCategory, setActiveCategory] = useState<CreatorCategory | 'ALL'>('ALL');
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);
  const [telegramPrefill, setTelegramPrefill] = useState(
    'Здравствуйте! Хочу обсудить бриф на сотрудничество с цифровыми создателями NOVA.'
  );

  const creatorsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleOpenTelegram = (text?: string) => {
    if (text) {
      setTelegramPrefill(text);
    } else {
      setTelegramPrefill('Здравствуйте! Хочу обсудить бриф на сотрудничество с цифровыми создателями NOVA.');
    }
    setTelegramModalOpen(true);
  };

  const handleOpenProfile = (
    creator: Creator,
    tab: 'feed' | 'collabs' | 'dialogue' = 'feed'
  ) => {
    setSelectedCreator(creator);
    setProfileInitialTab(tab);
  };

  const handleOpenStory = (creator: Creator) => {
    setStoryCreator(creator);
  };

  const handleScrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter logic
  const filteredCreators = useMemo(() => {
    if (activeCategory === 'ALL') return CREATORS;
    return CREATORS.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: CREATORS.length,
      lifestyle: CREATORS.filter((c) => c.category === 'LIFESTYLE').length,
      tech: CREATORS.filter((c) => c.category === 'TECH').length,
      fashion: CREATORS.filter((c) => c.category === 'FASHION').length,
      sport: CREATORS.filter((c) => c.category === 'SPORT').length,
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar
        onScrollToCreators={handleScrollToCreators}
        onScrollToAbout={handleScrollToAbout}
        onOpenTelegram={handleOpenTelegram}
      />

      <main className="flex-1">
        {/* Editorial Minimal Hero */}
        <Hero
          onScrollToCreators={handleScrollToCreators}
          onOpenTelegram={handleOpenTelegram}
        />

        {/* Continuous Animated Metric Ticker */}
        <MetricTicker />

        {/* CREATORS DISCOVERY SECTION */}
        <section
          ref={creatorsRef}
          id="creators"
          className="py-14 sm:py-24 relative scroll-mt-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Interactive Live Stories Reel */}
            <StoriesBar
              creators={CREATORS}
              onOpenStory={handleOpenStory}
            />

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-2">
                  <span className="text-[#D4FF00]">01</span>
                  <span>/</span>
                  <span>КАТАЛОГ</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F0] font-display">
                  04 Цифровые личности
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#858585] font-mono">
                  Четыре независимых создателя с уникальной внешностью, эстетикой и лояльной аудиторией.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="w-full md:w-auto">
                <FilterTabs
                  activeCategory={activeCategory}
                  onChange={setActiveCategory}
                  counts={categoryCounts}
                />
              </div>
            </div>

            {/* Asymmetric / Mobile-First Grid with Direct Interactive Triggers */}
            <CreatorGrid
              creators={filteredCreators}
              onOpenProfile={handleOpenProfile}
              onOpenTelegram={handleOpenTelegram}
              onOpenStory={handleOpenStory}
            />
          </div>
        </section>

        {/* Interactive Neural Brand Matcher Section */}
        <BrandMatcher
          creators={CREATORS}
          onOpenProfile={handleOpenProfile}
          onOpenTelegram={handleOpenTelegram}
        />

        {/* Philosophy & Architecture Section */}
        <div ref={aboutRef}>
          <AboutNetwork />
        </div>

        {/* Interactive Campaign Calculator in UAH (₴) */}
        <div ref={calculatorRef}>
          <CampaignCalculator onOpenTelegram={handleOpenTelegram} />
        </div>

        {/* Prominent Telegram CTA Banner */}
        <TelegramCTA onOpenTelegram={handleOpenTelegram} />
      </main>

      {/* Footer */}
      <Footer
        onScrollToCreators={handleScrollToCreators}
        onOpenTelegram={handleOpenTelegram}
      />

      {/* Mobile-Only Bottom Floating Action (<15% screen height cap) */}
      <MobileBottomCTA
        onScrollToCreators={handleScrollToCreators}
        onOpenTelegram={handleOpenTelegram}
      />

      {/* Immersive Creator Profile Modal / Bottom Sheet */}
      <CreatorProfile
        creator={selectedCreator}
        initialTab={profileInitialTab}
        onClose={() => setSelectedCreator(null)}
        onOpenTelegram={handleOpenTelegram}
      />

      {/* Full-Screen Interactive Stories Player */}
      <StoriesPlayer
        creator={storyCreator}
        allCreators={CREATORS}
        onClose={() => setStoryCreator(null)}
        onOpenTelegram={handleOpenTelegram}
        onSelectCreator={(c) => setStoryCreator(c)}
      />

      {/* Direct Telegram Action Dialog */}
      <TelegramModal
        isOpen={telegramModalOpen}
        onClose={() => setTelegramModalOpen(false)}
        prefilledText={telegramPrefill}
      />
    </div>
  );
}
