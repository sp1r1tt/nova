'use client';

import React, { useState } from 'react';
import { Send, Check, ShieldCheck } from 'lucide-react';
import { CREATORS } from '@/data/creators';

interface CampaignCalculatorProps {
  onOpenTelegram: (customText?: string) => void;
}

export const CampaignCalculator: React.FC<CampaignCalculatorProps> = ({ onOpenTelegram }) => {
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>([CREATORS[0].id]);
  const [selectedFormat, setSelectedFormat] = useState<'single' | 'series' | 'ambassador'>('series');
  const [includeTelegram, setIncludeTelegram] = useState(true);
  const [includeCGI, setIncludeCGI] = useState(true);
  const [includeWhitelist, setIncludeWhitelist] = useState(false);

  const toggleCreator = (id: string) => {
    if (selectedCreatorIds.includes(id)) {
      if (selectedCreatorIds.length > 1) {
        setSelectedCreatorIds(selectedCreatorIds.filter((bId) => bId !== id));
      }
    } else {
      setSelectedCreatorIds([...selectedCreatorIds, id]);
    }
  };

  // Calculations in UAH (₴)
  let basePrice = 0;
  let baseReach = 0;

  selectedCreatorIds.forEach((id) => {
    const creator = CREATORS.find((c) => c.id === id);
    if (!creator) return;

    if (selectedFormat === 'single') {
      basePrice += creator.collabs[0].priceUah;
      baseReach += 85000;
    } else if (selectedFormat === 'series') {
      basePrice += Math.round(creator.collabs[0].priceUah * 2.2);
      baseReach += 220000;
    } else if (selectedFormat === 'ambassador') {
      basePrice += creator.collabs[2]?.priceUah || 260000;
      baseReach += 550000;
    }
  });

  // Extras in UAH (₴)
  if (includeTelegram) basePrice += 25000 * selectedCreatorIds.length;
  if (includeCGI) basePrice += 40000 * selectedCreatorIds.length;
  if (includeWhitelist) basePrice += 35000 * selectedCreatorIds.length;

  const handleLaunchCampaign = () => {
    const creatorNames = selectedCreatorIds
      .map((id) => CREATORS.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const formatName =
      selectedFormat === 'single'
        ? 'Одиночный ролик (Reels / Shorts)'
        : selectedFormat === 'series'
        ? 'Серия из 3 публикаций + Stories'
        : 'Месячное амбассадорство';

    const message = `Здравствуйте! Хочу запустить кампанию:\n• Создатели: ${creatorNames}\n• Формат: ${formatName}\n• Опции: ${includeTelegram ? 'Telegram (+), ' : ''}${includeCGI ? 'CGI продукт (+), ' : ''}${includeWhitelist ? 'Whitelist (+)' : ''}\n• Расчётный бюджет: ${basePrice.toLocaleString()} ₴\n• Прогнозный охват: ~${(baseReach / 1000).toFixed(0)}K.\nПришлите договор и свободные даты старта!`;

    onOpenTelegram(message);
  };

  return (
    <section id="campaign-calculator" className="py-16 sm:py-24 border-t border-white/[0.08] relative bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-2">
            <span className="text-[#D4FF00]">04</span>
            <span>/</span>
            <span>МЕДИАПЛАН И КАЛЬКУЛЯТОР</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F5F0] font-display">
            Рассчитайте бюджет и охват кампании
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#858585] font-mono">
            Соберите состав амбассадоров, выберите формат и получите ориентировочную смету в гривне (₴).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 border border-white/[0.08] bg-[#0C0C0C] p-5 sm:p-7">
            {/* Step 1: Select Creators */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#858585] block mb-3">
                1. Выберите создателей для проекта:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CREATORS.map((c) => {
                  const isSelected = selectedCreatorIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCreator(c.id)}
                      className={`flex items-center gap-3 p-3 border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#141414] border-[#D4FF00]'
                          : 'bg-[#0A0A0A] border-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <img
                        src={c.mainPortraitUrl}
                        alt={c.name}
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate font-display">{c.name}</div>
                        <div className="text-[10px] font-mono text-[#D4FF00] truncate">{c.categoryTag}</div>
                      </div>
                      <div
                        className={`h-4 w-4 flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#D4FF00] border-[#D4FF00] text-black'
                            : 'border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Campaign Format */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#858585] block mb-3">
                2. Формат размещения:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono">
                {[
                  { id: 'single', title: '1 Ролик', desc: 'Reels / Экшн-видео' },
                  { id: 'series', title: 'Серия ×3', desc: 'Видео + Stories + Пост' },
                  { id: 'ambassador', title: 'Амбассадор', desc: 'Контракт на 1 месяц' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id as any)}
                    className={`p-3.5 border text-left transition-all cursor-pointer ${
                      selectedFormat === fmt.id
                        ? 'bg-white text-black border-white'
                        : 'bg-[#0A0A0A] border-white/[0.06] text-[#858585] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{fmt.title}</div>
                    <div className={`text-[10px] mt-0.5 ${selectedFormat === fmt.id ? 'text-black/70' : 'text-[#858585]'}`}>
                      {fmt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Options */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#858585] block mb-3">
                3. Дополнительные опции:
              </label>
              <div className="space-y-2 font-mono text-xs">
                {[
                  {
                    checked: includeTelegram,
                    toggle: () => setIncludeTelegram(!includeTelegram),
                    title: 'Кросс-постинг в Telegram-каналах создателей',
                    price: '+25 000 ₴ / создатель',
                  },
                  {
                    checked: includeCGI,
                    toggle: () => setIncludeCGI(!includeCGI),
                    title: '3D/CGI моделирование и интеграция продукта в руки персонажа',
                    price: '+40 000 ₴ / создатель',
                  },
                  {
                    checked: includeWhitelist,
                    toggle: () => setIncludeWhitelist(!includeWhitelist),
                    title: 'Бессрочные рекламные права (таргет и маркетплейсы)',
                    price: '+35 000 ₴ / создатель',
                  },
                ].map((opt, i) => (
                  <div
                    key={i}
                    onClick={opt.toggle}
                    className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-white/[0.06] hover:border-white/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-4 w-4 flex items-center justify-center border transition-all ${
                          opt.checked
                            ? 'bg-[#D4FF00] border-[#D4FF00] text-black'
                            : 'border-white/30'
                        }`}
                      >
                        {opt.checked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span className="text-white text-xs font-sans">{opt.title}</span>
                    </div>
                    <span className="text-[#858585] text-[10px] tabular-nums whitespace-nowrap ml-2">{opt.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 border border-white/15 bg-[#0C0C0C] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] font-mono text-xs">
              <span className="text-[#D4FF00] uppercase tracking-wider">
                ПРОГНОЗ ЭФФЕКТИВНОСТИ
              </span>
              <span className="text-[#858585]">
                {selectedCreatorIds.length} {selectedCreatorIds.length === 1 ? 'создатель' : 'создателя'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-mono text-[#858585] uppercase">
                  Ориентировочный бюджет:
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white font-mono tabular-nums mt-1 text-[#D4FF00]">
                  {basePrice.toLocaleString()} ₴
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                <div className="p-3 bg-[#080808] border border-white/[0.06]">
                  <div className="text-[10px] text-[#858585] uppercase">Прогнозный охват:</div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">
                    ~{(baseReach / 1000).toFixed(0)} 000
                  </div>
                </div>

                <div className="p-3 bg-[#080808] border border-white/[0.06]">
                  <div className="text-[10px] text-[#858585] uppercase">Гарантия запуска:</div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">
                    48 часов
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#858585] pt-2 font-sans">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4FF00] shrink-0" />
                  <span>100% согласование раскадровки и сценария</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4FF00] shrink-0" />
                  <span>Официальный договор для юридических лиц и ФОП</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4FF00] shrink-0" />
                  <span>Детальный отчёт об охвате через 7 дней</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLaunchCampaign}
                className="w-full flex items-center justify-center gap-2 bg-[#F5F5F0] hover:bg-white text-black py-3.5 px-4 font-mono uppercase tracking-wider text-xs font-bold transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Оформить бриф в Telegram</span>
              </button>
              <p className="text-[10px] font-mono text-[#858585] text-center mt-2.5">
                Менеджер ответит в Telegram в течение 15 минут
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
