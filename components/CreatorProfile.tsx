'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Heart,
  MessageSquare,
  MapPin,
  Share2,
  Check,
  Bot,
} from 'lucide-react';
import { Creator, CreatorPost } from '@/types';

interface CreatorProfileProps {
  creator: Creator | null;
  initialTab?: 'feed' | 'collabs' | 'dialogue';
  onClose: () => void;
  onOpenTelegram: (text?: string) => void;
}

export const CreatorProfile: React.FC<CreatorProfileProps> = ({
  creator,
  initialTab = 'feed',
  onClose,
  onOpenTelegram,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'collabs' | 'dialogue'>(initialTab);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ id: string; from: 'user' | 'creator'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Reset and initialize when creator changes
  useEffect(() => {
    if (!creator) return;
    setActiveTab(initialTab);
    setLikedPosts({});
    setChatMessages([
      {
        id: 'init-1',
        from: 'creator',
        text: creator.dialogue.welcome,
      },
    ]);
  }, [creator, initialTab]);

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (!creator) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [creator, onClose]);

  if (!creator) return null;

  const handleToggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendMessage = (customText?: string) => {
    const text = (customText || chatInput).trim();
    if (!text || isTyping) return;

    const newMsg = {
      id: `u-${Date.now()}`,
      from: 'user' as const,
      text,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    if (!customText) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const match = creator.dialogue.questions.find((item) => item.q === text);
      const reply =
        match?.a ||
        `Спасибо за интерес к моему образу! Для более детального обсуждения сценария и свободных дат напишите нашей команде в Telegram.`;

      setChatMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          from: 'creator',
          text: reply,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0A0A0A] border-y sm:border border-white/10 shadow-2xl flex flex-col min-h-screen sm:min-h-0 sm:max-h-[92vh] sm:rounded-none overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#858585]">
            <span className="text-[#D4FF00]">{creator.index}</span>
            <span>/</span>
            <span className="text-white">{creator.name}</span>
            <span>/</span>
            <span>{creator.categoryTag}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="text-[#858585] hover:text-white transition-colors p-1.5 cursor-pointer"
              title="Поделиться профилем"
            >
              {copiedLink ? <Check className="h-4 w-4 text-[#D4FF00]" /> : <Share2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-[#858585] hover:text-white transition-colors p-1.5 cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Banner & Portrait Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/[0.08]">
            {/* Main Portrait */}
            <div className="md:col-span-5 relative aspect-[3/4] md:aspect-auto md:min-h-[380px] bg-[#121212] overflow-hidden">
              <img
                src={creator.mainPortraitUrl}
                alt={creator.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:hidden" />
            </div>

            {/* Profile Overview Meta */}
            <div className="md:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D4FF00]">
                    Верифицированная цифровая персона
                  </span>
                  <span className="font-mono text-xs text-[#858585]">
                    {creator.age}
                  </span>
                </div>

                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F0] font-display">
                  {creator.name}
                </h2>
                <div className="font-mono text-sm text-[#858585] mt-1">{creator.handle}</div>

                <blockquote className="mt-4 border-l-2 border-[#D4FF00] pl-3 py-1 font-mono text-xs text-[#F5F5F0]/90 italic">
                  «{creator.quote}»
                </blockquote>

                <p className="mt-4 text-xs sm:text-sm text-[#858585] leading-relaxed font-sans">
                  {creator.bioRu}
                </p>
              </div>

              {/* Engagement Stats Strip */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] font-mono">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {creator.followers}
                  </div>
                  <div className="text-[10px] text-[#858585] uppercase tracking-wider">Подписчики</div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#D4FF00] tabular-nums">
                    {creator.er}
                  </div>
                  <div className="text-[10px] text-[#858585] uppercase tracking-wider">Вовлечённость (ER)</div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {creator.postsCount}
                  </div>
                  <div className="text-[10px] text-[#858585] uppercase tracking-wider">Публикации</div>
                </div>
              </div>

              {/* Demographics Note */}
              <div className="text-xs font-mono text-[#858585] bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="text-white/80">Аудитория: </span>
                {creator.audienceDemographics}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-[49px] z-10 bg-[#0A0A0A] border-b border-white/[0.08] px-4 sm:px-8 flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('feed')}
              className={`py-3.5 transition-colors cursor-pointer relative ${
                activeTab === 'feed' ? 'text-white' : 'text-[#858585] hover:text-white'
              }`}
            >
              Публикации ({creator.posts.length})
              {activeTab === 'feed' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4FF00]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('collabs')}
              className={`py-3.5 transition-colors cursor-pointer relative ${
                activeTab === 'collabs' ? 'text-white' : 'text-[#858585] hover:text-white'
              }`}
            >
              Форматы интеграций (₴)
              {activeTab === 'collabs' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4FF00]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('dialogue')}
              className={`py-3.5 transition-colors cursor-pointer relative flex items-center gap-1.5 ${
                activeTab === 'dialogue' ? 'text-[#D4FF00]' : 'text-[#858585] hover:text-white'
              }`}
            >
              <Bot className="h-3.5 w-3.5" />
              <span>AI-Диалог</span>
              {activeTab === 'dialogue' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4FF00]" />
              )}
            </button>
          </div>

          {/* Tab Content Areas */}
          <div className="p-4 sm:p-8">
            {/* 1. MICRO SOCIAL FEED */}
            {activeTab === 'feed' && (
              <div className="space-y-4">
                <div className="text-[11px] font-mono text-[#858585] uppercase tracking-widest mb-2">
                  ПОСЛЕДНИЕ СТОРИС И ПУБЛИКАЦИИ
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {creator.posts.map((post) => {
                    const isLiked = !!likedPosts[post.id];
                    return (
                      <div
                        key={post.id}
                        className="bg-[#0F0F0F] border border-white/[0.08] p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#858585]">
                          <span className="text-[#F5F5F0]">{creator.handle}</span>
                          <span>{post.date}</span>
                        </div>

                        {post.location && (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-[#858585]">
                            <MapPin className="h-3 w-3 text-[#D4FF00]" />
                            <span>{post.location}</span>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-[#F5F5F0]/90 leading-relaxed font-sans">
                          {post.caption}
                        </p>

                        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                          <button
                            onClick={() => handleToggleLike(post.id)}
                            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isLiked ? 'text-rose-400' : 'text-[#858585] hover:text-white'
                            }`}
                          >
                            <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                            <span className="tabular-nums">{post.likesFormatted}</span>
                          </button>

                          <div className="flex items-center gap-1 text-[#858585]">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span className="tabular-nums">{post.commentsCount}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. COMMERCIAL FORMATS IN UAH */}
            {activeTab === 'collabs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#858585] uppercase tracking-widest mb-2">
                  <span>ПРАЙС-ЛИСТ И ФОРМАТЫ ИНТЕГРАЦИИ</span>
                  <span className="text-[#D4FF00]">ВАЛЮТА: UAH (₴)</span>
                </div>

                <div className="space-y-3">
                  {creator.collabs.map((collab) => (
                    <div
                      key={collab.id}
                      className="bg-[#0F0F0F] border border-white/[0.08] hover:border-white/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white font-display">
                          {collab.title}
                        </div>
                        <div className="font-mono text-xs text-[#D4FF00]">{collab.format}</div>
                        <p className="text-xs text-[#858585] max-w-lg leading-relaxed pt-1 font-sans">
                          {collab.description}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] font-mono text-[#858585] pt-1">
                          <span>Охват: <strong className="text-white">{collab.estReach}</strong></span>
                          <span>·</span>
                          <span>Срок: <strong className="text-white">{collab.delivery}</strong></span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                        <div className="text-xl sm:text-2xl font-bold font-mono text-[#F5F5F0] tabular-nums">
                          {collab.priceFormatted}
                        </div>
                        <button
                          onClick={() =>
                            onOpenTelegram(
                              `Здравствуйте! Хочу заказать формат «${collab.title}» у блогера ${creator.name} (${collab.priceFormatted}). Пришлите бриф и договор.`
                            )
                          }
                          className="mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 hover:border-[#D4FF00]/50 text-white hover:text-[#D4FF00] px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                        >
                          <Send className="h-3 w-3 text-[#D4FF00]" />
                          <span>Заказать в Telegram</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. INTERACTIVE AI DIALOGUE */}
            {activeTab === 'dialogue' && (
              <div className="space-y-4 font-mono">
                <div className="text-[11px] text-[#858585] uppercase tracking-widest mb-1">
                  ПРЯМОЙ ДИАЛОГ С {creator.name}
                </div>

                <div className="bg-[#0F0F0F] border border-white/[0.08] p-4 rounded-none min-h-[260px] max-h-[360px] overflow-y-auto space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.from === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                          msg.from === 'user'
                            ? 'bg-white text-black'
                            : 'bg-white/[0.06] text-[#F5F5F0] border border-white/10'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="text-xs text-[#858585] italic flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
                      <span>{creator.name} печатает ответ...</span>
                    </div>
                  )}
                </div>

                {/* Quick Prompts */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-[#858585] uppercase tracking-wider">
                    Предложенные вопросы:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {creator.dialogue.questions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.q)}
                        className="text-left text-xs text-[#858585] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-2.5 py-1.5 transition-colors cursor-pointer"
                      >
                        {item.q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input field */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    placeholder={`Напишите вопрос для ${creator.name}...`}
                    className="flex-1 bg-white/[0.05] border border-white/10 px-3 py-2 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#D4FF00]"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!chatInput.trim() || isTyping}
                    className="bg-[#F5F5F0] hover:bg-white text-black px-4 py-2 text-xs font-semibold uppercase disabled:opacity-40 cursor-pointer"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Sticky Bottom Telegram CTA */}
        <div className="sticky bottom-0 z-20 bg-[#080808] border-t border-white/[0.08] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs font-mono text-[#F5F5F0]">
              Продолжите историю в Telegram.
            </div>
            <div className="text-[11px] text-[#858585]">
              Официальный канал и менеджер: @{creator.telegramHandle}
            </div>
          </div>

          <button
            onClick={() =>
              onOpenTelegram(
                `Здравствуйте! Хочу обсудить бриф на коллаборацию с ${creator.name} (${creator.handle}).`
              )
            }
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-full bg-[#F5F5F0] hover:bg-white text-black px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Перейти в Telegram</span>
          </button>
        </div>
      </div>
    </div>
  );
};
