'use client';

import React from 'react';
import { ArrowDown, Send } from 'lucide-react';

interface HeroProps {
  onScrollToCreators: () => void;
  onOpenTelegram: (text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCreators, onOpenTelegram }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36 border-b border-white/[0.08]">
      {/* Subtle architectural grain & ambient mood */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-60" />
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Top Label */}
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-6">
            <span className="text-[#D4FF00]">NOVA</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>СЕТЬ AI-СОЗДАТЕЛЕЙ / 2026</span>
          </div>

          {/* Big Editorial Headline in Russian */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#F5F5F0] font-display leading-[1.12] text-balance">
            Люди, которых <br className="hidden sm:inline" />
            <span className="text-[#858585] font-light">не существует.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-sm sm:text-base text-[#858585] max-w-xl font-mono leading-relaxed">
            «Четыре цифровые личности. Бесконечные истории.» <br className="hidden sm:inline" />
            <span className="text-white/70">
              Виртуальные инфлюенсеры с живой лояльной аудиторией и безупречным стилем.
            </span>
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onScrollToCreators}
              className="flex items-center gap-3 rounded-full bg-[#F5F5F0] hover:bg-white text-[#080808] px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Смотреть создателей</span>
              <ArrowDown className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => onOpenTelegram('Здравствуйте! Хочу обсудить бриф на рекламную кампанию с создателями NOVA.')}
              className="flex items-center gap-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#D4FF00]/40 text-[#F5F5F0] hover:text-[#D4FF00] px-6 py-3.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              <Send className="h-3.5 w-3.5 text-[#D4FF00]" />
              <span>Перейти в Telegram</span>
            </button>
          </div>

          {/* Animated Indicator */}
          <div className="mt-16 sm:mt-24 flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#858585] uppercase">
            <span className="animate-pulse text-[#D4FF00]">↓</span>
            <span>ЛИСТАЙТЕ ВНИЗ</span>
          </div>
        </div>
      </div>
    </section>
  );
};
