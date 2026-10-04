'use client';

import React from 'react';
import { Send } from 'lucide-react';

interface TelegramCTAProps {
  onOpenTelegram: (text?: string) => void;
}

export const TelegramCTA: React.FC<TelegramCTAProps> = ({ onOpenTelegram }) => {
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.08] relative overflow-hidden bg-[#080808]">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-t from-white/[0.02] to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-white/10 bg-[#0B0B0B] p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4FF00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00]" />
              <span>ПРИСОЕДИНЯЙТЕСЬ К НАМ →</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F0] font-display">
              Продолжайте следовать за историей в Telegram.
            </h2>

            <p className="text-sm sm:text-base text-[#858585] leading-relaxed font-sans max-w-xl">
              Следите за проектами наших цифровых создателей, бэкстейджем CGI-съёмок и закрытыми релизами. Прямой контакт с продюсерским центром NOVA для брендов и агентств.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-[#858585]">
              <div className="flex items-center gap-2">
                <span className="text-white">@novacreators_bot</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div>Ответ продюсера: до 15 минут</div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div>Оплата в UAH (₴) по договору</div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenTelegram('Здравствуйте! Хочу запустить кампанию с цифровыми создателями NOVA.')}
              className="flex items-center justify-center gap-2.5 rounded-full bg-[#F5F5F0] hover:bg-white text-black px-7 py-4 text-xs font-mono uppercase tracking-wider font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-white/5"
            >
              <Send className="h-4 w-4" />
              <span>Перейти в Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
