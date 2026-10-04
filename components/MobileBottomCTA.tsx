'use client';

import React from 'react';
import { Send } from 'lucide-react';

interface MobileBottomCTAProps {
  onScrollToCreators: () => void;
  onOpenTelegram: (text?: string) => void;
}

export const MobileBottomCTA: React.FC<MobileBottomCTAProps> = ({
  onScrollToCreators,
  onOpenTelegram,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
      <button
        onClick={onScrollToCreators}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[#858585] hover:text-white transition-colors cursor-pointer"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00]" />
        <span>04 Создателя</span>
      </button>

      <button
        onClick={() => onOpenTelegram('Здравствуйте! Хочу обсудить бриф на рекламу с AI-блогером.')}
        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#F5F5F0] hover:bg-white text-black py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer"
      >
        <Send className="h-3.5 w-3.5" />
        <span>Перейти в Telegram</span>
      </button>
    </div>
  );
};
