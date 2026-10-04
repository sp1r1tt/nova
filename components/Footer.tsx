'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onScrollToCreators: () => void;
  onOpenTelegram: (text?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToCreators, onOpenTelegram }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#060606] py-14 sm:py-20 text-[#858585] text-xs font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base font-bold text-white font-display">
              <span className="h-2 w-2 rounded-full bg-[#D4FF00]" />
              <span>NOVA</span>
            </div>
            <p className="text-xs text-[#858585] max-w-sm">
              «Цифровые личности. Реальные истории.»
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider">
            <button
              onClick={onScrollToCreators}
              className="text-[#858585] hover:text-white transition-colors cursor-pointer"
            >
              Создатели
            </button>
            <a
              href="#about"
              className="text-[#858585] hover:text-white transition-colors"
            >
              О проекте
            </a>
            <button
              onClick={() => onOpenTelegram()}
              className="text-[#D4FF00] hover:underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Telegram</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
            <span className="text-[#858585]">Instagram</span>
            <span className="text-white">2026</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#858585]">
          <div>
            © 2026 NOVA AI Creators. Все права защищены. Все персонажи являются авторскими цифровыми личностями.
          </div>
          <div className="flex items-center gap-4">
            <span>Коммерческая лицензия</span>
            <span>·</span>
            <span>Расчёты в гривне UAH (₴)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
