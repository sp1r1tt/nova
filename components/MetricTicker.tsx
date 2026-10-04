import React from 'react';

export const MetricTicker: React.FC = () => {
  const items = [
    '0% РЕПУТАЦИОННЫХ РИСКОВ',
    'ПРОДАКШН ЗА 48 ЧАСОВ',
    '1.9M+ СОВОКУПНЫЙ ОХВАТ',
    '6.8% СРЕДНИЙ ER ВОВЛЕЧЕНИЯ',
    '100% ВЛАДЕНИЕ АВТОРСКИМИ ПРАВАМИ',
    'СИНХРОНИЗАЦИЯ НА 15 ЯЗЫКАХ',
    'ОФИЦИАЛЬНЫЙ ДОГОВОР И ОПЛАТА В UAH (₴)',
  ];

  return (
    <div className="border-y border-white/[0.08] bg-[#0A0A0A] py-3.5 overflow-hidden whitespace-nowrap select-none">
      <div className="inline-flex animate-marquee gap-8 font-mono text-[11px] tracking-[0.2em] text-[#858585] uppercase">
        {items.concat(items).map((text, i) => (
          <div key={i} className="inline-flex items-center gap-6">
            <span className="text-[#F5F5F0]/90 hover:text-[#D4FF00] transition-colors">
              {text}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00]" />
          </div>
        ))}
      </div>
    </div>
  );
};
