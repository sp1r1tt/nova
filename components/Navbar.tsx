'use client';

import React, { useState } from 'react';
import { Send, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onScrollToCreators: () => void;
  onScrollToAbout: () => void;
  onOpenTelegram: (text?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToCreators,
  onScrollToAbout,
  onOpenTelegram,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#080808]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Zone (Only NOVA in English) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#F5F5F0] font-display group"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_rgba(212,255,0,0.8)]" />
          <span className="tracking-widest">NOVA</span>
          <span className="text-[10px] font-mono tracking-widest text-[#858585] uppercase hidden sm:inline-block border-l border-white/10 pl-2.5">
            AI-СОЗДАТЕЛИ
          </span>
        </a>

        {/* Clean Editorial Nav Links (Desktop) in Russian */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#858585] font-mono">
          <button
            onClick={onScrollToCreators}
            className="hover:text-[#F5F5F0] transition-colors cursor-pointer"
          >
            Создатели
          </button>
          <button
            onClick={onScrollToAbout}
            className="hover:text-[#F5F5F0] transition-colors cursor-pointer"
          >
            О проекте
          </button>
          <button
            onClick={() => onOpenTelegram('Здравствуйте! Хочу обсудить сотрудничество с цифровыми создателями NOVA.')}
            className="hover:text-[#D4FF00] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Telegram</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenTelegram('Здравствуйте! Интересует запуск интеграции с виртуальными блогерами NOVA.')}
            className="flex items-center gap-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-[#D4FF00]/50 text-[#F5F5F0] hover:text-[#D4FF00] px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <Send className="h-3 w-3 text-[#D4FF00]" />
            <span>Перейти в Telegram</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#858585] hover:text-white transition-colors cursor-pointer"
            aria-label="Меню навигации"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0A0A] px-4 py-5 space-y-4 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={() => {
              onScrollToCreators();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-[#858585] hover:text-white"
          >
            01 / Создатели
          </button>
          <button
            onClick={() => {
              onScrollToAbout();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-[#858585] hover:text-white"
          >
            02 / О проекте
          </button>
          <button
            onClick={() => {
              onOpenTelegram();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full text-left py-2 text-[#D4FF00]"
          >
            <span>03 / Telegram-канал</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
