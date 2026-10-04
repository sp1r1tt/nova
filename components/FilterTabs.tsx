'use client';

import React from 'react';
import { CreatorCategory } from '@/types';

interface FilterTabsProps {
  activeCategory: CreatorCategory | 'ALL';
  onChange: (category: CreatorCategory | 'ALL') => void;
  counts: Record<string, number>;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeCategory,
  onChange,
  counts,
}) => {
  const tabs: { id: CreatorCategory | 'ALL'; labelRu: string }[] = [
    { id: 'ALL', labelRu: 'ВСЕ' },
    { id: 'LIFESTYLE', labelRu: 'ЛАЙФСТАЙЛ' },
    { id: 'TECH', labelRu: 'ТЕХНОЛОГИИ' },
    { id: 'FASHION', labelRu: 'МОДА' },
    { id: 'SPORT', labelRu: 'СПОРТ' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-white/[0.08]">
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        const count = tab.id === 'ALL' ? counts.all : counts[tab.id.toLowerCase()];

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`group relative flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'text-[#F5F5F0]'
                : 'text-[#858585] hover:text-[#F5F5F0]'
            }`}
          >
            {isActive && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00]" />
            )}
            <span>{tab.labelRu}</span>
            <span className="text-[10px] text-[#858585] group-hover:text-white/60">
              ({count ?? 0})
            </span>

            {/* Active bottom line */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4FF00]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
