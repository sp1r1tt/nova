'use client';

import React from 'react';
import { CreatorCard } from './CreatorCard';
import { Creator } from '@/types';

interface CreatorGridProps {
  creators: Creator[];
  onOpenProfile: (creator: Creator, initialTab?: 'feed' | 'collabs' | 'dialogue') => void;
  onOpenTelegram: (text?: string) => void;
  onOpenStory?: (creator: Creator) => void;
}

export const CreatorGrid: React.FC<CreatorGridProps> = ({
  creators,
  onOpenProfile,
  onOpenTelegram,
  onOpenStory,
}) => {
  if (creators.length === 0) {
    return (
      <div className="py-20 text-center font-mono text-sm text-[#858585]">
        В этой категории создатели не найдены.
      </div>
    );
  }

  // If showing all 4 creators, render the Awwwards-level asymmetric desktop layout
  const isFullShowcase = creators.length === 4;

  if (isFullShowcase) {
    const luca = creators[0];
    const noah = creators[1];
    const mila = creators[2];
    const aria = creators[3];

    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Mobile: Clean Stack of Full-Width Editorial Cards */}
        {/* Desktop: Asymmetric Editorial Composition (7-5 and 5-7 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* 01 Luca Vane: Featured Large Card (7 cols) */}
          <div className="md:col-span-7 flex flex-col">
            <CreatorCard
              creator={luca}
              onOpenProfile={onOpenProfile}
              onOpenTelegram={onOpenTelegram}
              onOpenStory={onOpenStory}
              layoutVariant="featured"
            />
          </div>

          {/* 02 Noah Kai: Structured Tech Card (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <CreatorCard
              creator={noah}
              onOpenProfile={onOpenProfile}
              onOpenTelegram={onOpenTelegram}
              onOpenStory={onOpenStory}
              layoutVariant="standard"
            />
          </div>

          {/* 03 Mila Rose: High Fashion Card (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <CreatorCard
              creator={mila}
              onOpenProfile={onOpenProfile}
              onOpenTelegram={onOpenTelegram}
              onOpenStory={onOpenStory}
              layoutVariant="standard"
            />
          </div>

          {/* 04 Aria West: Outdoor Coastal Card (7 cols) */}
          <div className="md:col-span-7 flex flex-col">
            <CreatorCard
              creator={aria}
              onOpenProfile={onOpenProfile}
              onOpenTelegram={onOpenTelegram}
              onOpenStory={onOpenStory}
              layoutVariant="horizontal"
            />
          </div>
        </div>
      </div>
    );
  }

  // Standard responsive grid for filtered views
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {creators.map((creator) => (
        <CreatorCard
          key={creator.id}
          creator={creator}
          onOpenProfile={onOpenProfile}
          onOpenTelegram={onOpenTelegram}
          onOpenStory={onOpenStory}
          layoutVariant="standard"
        />
      ))}
    </div>
  );
};
