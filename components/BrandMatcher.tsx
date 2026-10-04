'use client';

import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { Creator } from '@/types';

interface BrandMatcherProps {
  creators: Creator[];
  onOpenProfile: (creator: Creator, initialTab?: 'feed' | 'collabs' | 'dialogue') => void;
  onOpenTelegram: (text?: string) => void;
}

export const BrandMatcher: React.FC<BrandMatcherProps> = ({
  creators,
  onOpenProfile,
  onOpenTelegram,
}) => {
  const [selectedNicheIndex, setSelectedNicheIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const niches = [
    {
      id: 'arch',
      label: 'Архитектура & Недвижимость',
      sub: 'Тихий люкс, дизайн интерьеров, премиум-девелопмент',
      creatorIndex: 0, // Luca Vane
      matchRate: '99%',
      targetER: '5.4%',
      bestFormat: 'Кинематографичный ролик на террасе (82 000 ₴)',
    },
    {
      id: 'tech',
      label: 'IT, SaaS, AI & Fintech',
      sub: 'Технологичные продукты, мобильные приложения, стартапы',
      creatorIndex: 1, // Noah Kai
      matchRate: '98%',
      targetER: '6.1%',
      bestFormat: 'Глубокий технологичный видеообзор (65 000 ₴)',
    },
    {
      id: 'fashion',
      label: 'Высокая мода & Бьюти',
      sub: 'Одежда, косметика, селективный парфюм, ювелирные изделия',
      creatorIndex: 2, // Mila Rose
      matchRate: '99%',
      targetER: '7.2%',
      bestFormat: 'Цифровой кутюрный лукбук (85 000 ₴)',
    },
    {
      id: 'sport',
      label: 'Спорт & Путешествия',
      sub: 'Activewear, экипировка, здоровое питание, автопутешествия',
      creatorIndex: 3, // Aria West
      matchRate: '97%',
      targetER: '6.8%',
      bestFormat: 'Динамичное экшн-видео у океана (70 000 ₴)',
    },
  ];

  const currentNiche = niches[selectedNicheIndex];
  const matchedCreator = creators[currentNiche.creatorIndex] || creators[0];

  const handleSelectNiche = (idx: number) => {
    if (idx === selectedNicheIndex) return;
    setIsScanning(true);
    setSelectedNicheIndex(idx);
    setTimeout(() => {
      setIsScanning(false);
    }, 350);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-white/[0.08] relative bg-[#090909]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-2">
            <span className="text-[#D4FF00]">03</span>
            <span>/</span>
            <span>AI-МАТЧИНГ АМБАССАДОРА</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F5F0] font-display">
            Подбор создателя под ДНК бренда
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#858585] font-mono">
            Выберите нишу вашего бизнеса, чтобы мгновенно определить идеального амбассадора с максимальным ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Niche Selector Options */}
          <div className="lg:col-span-6 space-y-2.5">
            {niches.map((niche, i) => {
              const isSelected = selectedNicheIndex === i;
              return (
                <button
                  key={niche.id}
                  type="button"
                  onClick={() => handleSelectNiche(i)}
                  className={`w-full p-4 sm:p-5 text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121212] border-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.12)]'
                      : 'bg-[#0B0B0B] border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display text-sm sm:text-base font-bold text-white">
                      {niche.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 border ${
                        isSelected
                          ? 'bg-[#D4FF00]/10 border-[#D4FF00] text-[#D4FF00]'
                          : 'border-white/10 text-[#858585]'
                      }`}
                    >
                      Совпадение {niche.matchRate}
                    </span>
                  </div>
                  <p className="text-xs text-[#858585] font-sans">{niche.sub}</p>
                </button>
              );
            })}
          </div>

          {/* Matched Result Card with Scanning Visual Effect */}
          <div className="lg:col-span-6 relative border border-white/15 bg-[#0D0D0D] p-6 sm:p-8 overflow-hidden">
            {/* Scanning line animation */}
            {isScanning && (
              <div className="absolute inset-0 bg-[#D4FF00]/5 z-30 pointer-events-none flex items-center justify-center">
                <div className="absolute top-0 inset-x-0 h-1 bg-[#D4FF00] animate-[marquee_0.35s_ease-in-out_infinite]" />
                <span className="font-mono text-xs text-[#D4FF00] bg-black px-3 py-1 border border-[#D4FF00]">
                  АНАЛИЗ ЦЕЛЕВОЙ АУДИТОРИИ...
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-white/[0.08]">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden border-2 border-[#D4FF00]">
                <img
                  src={matchedCreator.mainPortraitUrl}
                  alt={matchedCreator.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#D4FF00]">
                  <Sparkles className="h-3 w-3" />
                  <span>РЕКОМЕНДОВАННЫЙ АМБАССАДОР</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-display mt-0.5">
                  {matchedCreator.name}
                </h3>
                <div className="font-mono text-xs text-[#858585]">
                  {matchedCreator.handle} · {matchedCreator.categoryTag}
                </div>
              </div>
            </div>

            {/* Target Metrics */}
            <div className="grid grid-cols-2 gap-4 py-5 font-mono text-xs border-b border-white/[0.08]">
              <div>
                <div className="text-[10px] text-[#858585] uppercase">Совпадение по ДНК:</div>
                <div className="text-xl font-bold text-[#D4FF00] mt-0.5">{currentNiche.matchRate}</div>
              </div>

              <div>
                <div className="text-[10px] text-[#858585] uppercase">Вовлечённость (ER):</div>
                <div className="text-xl font-bold text-white mt-0.5">{currentNiche.targetER}</div>
              </div>

              <div className="col-span-2">
                <div className="text-[10px] text-[#858585] uppercase">Рекомендуемый стартовый формат:</div>
                <div className="text-xs text-white font-sans mt-0.5">{currentNiche.bestFormat}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenProfile(matchedCreator, 'feed')}
                className="w-full sm:flex-1 py-3 px-4 bg-white hover:bg-slate-100 text-black text-xs font-mono uppercase tracking-wider font-bold transition-all text-center cursor-pointer"
              >
                Смотреть профиль
              </button>

              <button
                type="button"
                onClick={() =>
                  onOpenTelegram(
                    `Здравствуйте! Наш бренд из ниши «${currentNiche.label}». Хотим запустить интеграцию с амбассадором ${matchedCreator.name}. Формат: ${currentNiche.bestFormat}.`
                  )
                }
                className="w-full sm:flex-1 py-3 px-4 bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-[#D4FF00] text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="h-3 w-3" />
                <span>Заказать в Telegram</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
