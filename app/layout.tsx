import React from 'react';
import './globals.css';

export const metadata = {
  title: 'NOVA — AI-Создатели | Четыре цифровые личности',
  description: 'Премиальная витрина виртуальных AI-блогеров нового поколения: Лука Вейн, Ноа Кай, Мила Роуз, Ария Вест. Открывайте цифровых создателей и переходите в Telegram.',
  openGraph: {
    title: 'NOVA — AI-Создатели',
    description: 'Люди, которых не существует. Четыре цифровые личности. Бесконечные истории.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0] antialiased selection:bg-[#D4FF00] selection:text-black">
      {children}
    </div>
  );
}
