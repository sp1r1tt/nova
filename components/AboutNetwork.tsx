import React from 'react';

export const AboutNetwork: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Цифровые личности',
      desc: 'Каждый персонаж NOVA обладает продуманным бэкграундом, эстетикой, тоном голоса и лояльным комьюнити. Это не безликие 3D-модели, а самостоятельные медиа-персоны.',
    },
    {
      num: '02',
      title: 'Нулевой репутационный риск',
      desc: '100% контроль над визуалом, сценарием и контекстом бренда. Никаких непредвиденных скандалов, выгорания, срывов дедлайнов или форс-мажоров.',
    },
    {
      num: '03',
      title: 'Кинематографичный продакшн',
      desc: 'Создание контента в любой точке мира за 48 часов без логистических затрат на авиабилеты, отели и съёмочные группы. Любые правки ракурса в один клик.',
    },
    {
      num: '04',
      title: 'Официальное оформление',
      desc: 'Прозрачные договоры, закрывающие документы для юридических лиц и ФОП, расчёты в гривне (UAH ₴) и бессрочные права на использование рекламных материалов.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-3">
            <span className="text-[#D4FF00]">02</span>
            <span>/</span>
            <span>ФИЛОСОФИЯ И ТЕХНОЛОГИИ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F0] font-display">
            Виртуальные инфлюенсеры как новое медиа.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#858585] font-sans leading-relaxed">
            NOVA переосмысливает инфлюенс-маркетинг: мы объединяем генеративный AI нового поколения, высокую эстетику моды и архитектуры с предсказуемым результатом для бизнеса.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.num}
              className="bg-[#0B0B0B] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
            >
              <div className="font-mono text-xs text-[#D4FF00] tracking-widest">
                {item.num}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#F5F5F0] font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-[#858585] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
