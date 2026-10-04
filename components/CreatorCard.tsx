'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Send, MessageSquare, Play } from 'lucide-react';
import { Creator } from '@/types';

interface CreatorCardProps {
  creator: Creator;
  onOpenProfile: (creator: Creator, initialTab?: 'feed' | 'collabs' | 'dialogue') => void;
  onOpenTelegram: (text?: string) => void;
  onOpenStory?: (creator: Creator) => void;
  layoutVariant?: 'featured' | 'standard' | 'horizontal';
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  onOpenProfile,
  onOpenTelegram,
  onOpenStory,
  layoutVariant = 'standard',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={() => onOpenProfile(creator)}
      className="group relative flex flex-col justify-between overflow-hidden bg-[#0D0D0D] border border-white/[0.08] hover:border-white/25 transition-all duration-500 cursor-pointer"
    >
      {/* Visual Portrait (75%–85% of card) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#121212]">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-[#141414] animate-pulse flex items-center justify-center font-mono text-[10px] text-[#858585] tracking-widest">
            ЗАГРУЗКА ПОРТРЕТА...
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 bg-[#161616] flex flex-col items-center justify-center p-6 text-center font-mono">
            <span className="text-xs text-[#858585]">{creator.index}</span>
            <span className="text-base text-white mt-1">{creator.name}</span>
          </div>
        ) : (
          <img
            src={creator.mainPortraitUrl}
            alt={`${creator.name} — ${creator.categoryTag}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Cinematic film grain & subtle bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          <span className="font-mono text-xs text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 tracking-widest border border-white/10">
            {creator.index}
          </span>

          <span className="font-mono text-[10px] text-[#D4FF00] bg-black/60 backdrop-blur-md px-2 py-0.5 tracking-wider border border-[#D4FF00]/30 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00]" />
            AI-СОЗДАТЕЛЬ
          </span>
        </div>

        {/* Interactive Desktop Hover Quick Bar */}
        <div className="absolute inset-x-3 top-14 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:flex">
          {onOpenStory && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenStory(creator);
              }}
              className="flex items-center gap-1.5 bg-black/80 hover:bg-[#D4FF00] text-white hover:text-black border border-white/20 hover:border-[#D4FF00] px-3 py-1.5 text-[11px] font-mono tracking-wider backdrop-blur-md transition-all cursor-pointer"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>СТОРИС</span>
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenProfile(creator, 'dialogue');
            }}
            className="flex items-center gap-1.5 bg-black/80 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white px-3 py-1.5 text-[11px] font-mono tracking-wider backdrop-blur-md transition-all cursor-pointer"
          >
            <MessageSquare className="h-3 w-3" />
            <span>AI-ДИАЛОГ</span>
          </button>
        </div>

        {/* Quick Quote Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
          <p className="text-[11px] font-mono text-[#F5F5F0]/90 italic bg-black/70 backdrop-blur-sm p-2 border-l-2 border-[#D4FF00]">
            «{creator.quote}»
          </p>
        </div>
      </div>

      {/* Editorial Content Info */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 border-t border-white/[0.06] bg-[#0D0D0D]">
        <div>
          {/* Category Tag */}
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#858585] mb-1">
            {creator.categoryTag}
          </div>

          {/* Name & Handle */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F0] font-display group-hover:text-white transition-colors">
              {creator.name}
            </h3>
            <span className="font-mono text-xs text-[#858585]">{creator.handle}</span>
          </div>

          <p className="mt-2 text-xs text-[#858585] line-clamp-2 leading-relaxed font-sans">
            {creator.taglineRu}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 font-mono">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenProfile(creator, 'feed');
            }}
            className="flex items-center gap-1 text-xs uppercase tracking-wider text-[#F5F5F0] group-hover:text-[#D4FF00] transition-colors cursor-pointer"
          >
            <span>ПРОФИЛЬ</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenProfile(creator, 'dialogue');
            }}
            className="flex items-center gap-1 text-xs uppercase text-[#858585] hover:text-white transition-colors cursor-pointer px-2 py-1"
          >
            <MessageSquare className="h-3 w-3 text-[#D4FF00]" />
            <span>ДИАЛОГ</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenTelegram(`Здравствуйте! Интересует сотрудничество с ${creator.name} (${creator.handle}).`);
            }}
            className="flex items-center gap-1 text-[11px] text-[#858585] hover:text-[#D4FF00] transition-colors cursor-pointer py-1 px-2 rounded hover:bg-white/[0.05]"
            title="Перейти в Telegram"
          >
            <Send className="h-3 w-3 text-[#D4FF00]" />
            <span>Telegram</span>
          </button>
        </div>
      </div>
    </article>
  );
};
