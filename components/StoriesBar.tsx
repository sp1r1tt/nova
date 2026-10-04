'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { Creator } from '@/types';

interface StoriesBarProps {
  creators: Creator[];
  onOpenStory: (creator: Creator) => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({ creators, onOpenStory }) => {
  return (
    <div className="mb-10 sm:mb-14 border border-white/[0.08] bg-[#0B0B0B] p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#858585]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00] animate-ping" />
          <span className="text-[#F5F5F0]">LIVE STORIES</span>
          <span>/</span>
          <span>БЭКСТЕЙДЖ И СЪЕМКИ</span>
        </div>
        <span className="text-[10px] font-mono text-[#D4FF00] hidden sm:inline-block">
          КЛИКНИТЕ ДЛЯ ПРОСМОТРА СТОРИС
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
        {creators.map((creator) => (
          <button
            key={creator.id}
            type="button"
            onClick={() => onOpenStory(creator)}
            className="group flex flex-col items-center gap-2 shrink-0 cursor-pointer focus:outline-none"
          >
            {/* Avatar with animated electric lime ring */}
            <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#D4FF00] via-white/50 to-[#D4FF00] group-hover:scale-105 transition-transform duration-300">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden bg-black p-[2px]">
                <img
                  src={creator.mainPortraitUrl}
                  alt={creator.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Play / Live Indicator */}
              <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-[#080808] border border-[#D4FF00] flex items-center justify-center text-[#D4FF00] shadow-sm">
                <Play className="h-2.5 w-2.5 fill-[#D4FF00] ml-0.5" />
              </div>
            </div>

            {/* Creator Name & Category */}
            <div className="text-center">
              <div className="font-display text-xs font-bold text-[#F5F5F0] group-hover:text-[#D4FF00] transition-colors whitespace-nowrap">
                {creator.name.split(' ')[0]}
              </div>
              <div className="font-mono text-[9px] text-[#858585] uppercase tracking-wider whitespace-nowrap">
                {creator.stories[0]?.tag || creator.category}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
