'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MapPin } from 'lucide-react';
import { Creator, StorySlide } from '@/types';

interface StoriesPlayerProps {
  creator: Creator | null;
  allCreators: Creator[];
  onClose: () => void;
  onOpenTelegram: (text?: string) => void;
  onSelectCreator: (creator: Creator) => void;
}

export const StoriesPlayer: React.FC<StoriesPlayerProps> = ({
  creator,
  allCreators,
  onClose,
  onOpenTelegram,
  onSelectCreator,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);

  const timerRef = useRef<any>(null);

  // Reset slide index when creator changes
  useEffect(() => {
    setSlideIndex(0);
    setProgress(0);
  }, [creator]);

  // Handle ESC and Arrow keys
  useEffect(() => {
    if (!creator) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [creator, slideIndex]);

  // Story slide duration timer (5 seconds)
  useEffect(() => {
    if (!creator || isPaused) return;

    const intervalMs = 50;
    const step = (intervalMs / 5000) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timerRef.current);
  }, [creator, slideIndex, isPaused]);

  if (!creator || !creator.stories || creator.stories.length === 0) return null;

  const currentSlide: StorySlide = creator.stories[slideIndex] || creator.stories[0];

  const handleNext = () => {
    if (slideIndex < creator.stories.length - 1) {
      setSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      // Advance to next creator
      const currentCreatorIndex = allCreators.findIndex((c) => c.id === creator.id);
      if (currentCreatorIndex < allCreators.length - 1) {
        onSelectCreator(allCreators[currentCreatorIndex + 1]);
      } else {
        onClose();
      }
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      // Go to previous creator
      const currentCreatorIndex = allCreators.findIndex((c) => c.id === creator.id);
      if (currentCreatorIndex > 0) {
        onSelectCreator(allCreators[currentCreatorIndex - 1]);
      }
    }
  };

  const handleAddReaction = (emoji: string) => {
    const newReaction = {
      id: Date.now(),
      emoji,
      left: 30 + Math.random() * 40,
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Player Container */}
      <div
        className="relative w-full max-w-md h-full sm:h-[88vh] max-h-[900px] bg-black sm:border border-white/15 overflow-hidden flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Slide Media */}
        <div className="absolute inset-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.caption}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Floating Animated Reaction Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {reactions.map((r) => (
            <div
              key={r.id}
              style={{ left: `${r.left}%` }}
              className="absolute bottom-20 text-3xl animate-[floatUp_1.5s_ease-out_forwards]"
            >
              {r.emoji}
            </div>
          ))}
        </div>

        {/* Top Controls & Timeline */}
        <div className="relative z-20 p-4 space-y-3">
          {/* Progress Bars */}
          <div className="flex items-center gap-1.5">
            {creator.stories.map((s, idx) => (
              <div
                key={s.id}
                className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-[#D4FF00] transition-all duration-75"
                  style={{
                    width:
                      idx === slideIndex
                        ? `${progress}%`
                        : idx < slideIndex
                        ? '100%'
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header Info */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full overflow-hidden border border-[#D4FF00]">
                <img
                  src={creator.mainPortraitUrl}
                  alt={creator.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-display text-xs font-bold flex items-center gap-1.5">
                  <span>{creator.name}</span>
                  <span className="text-[10px] text-[#D4FF00] font-mono font-normal">
                    {creator.stories[slideIndex]?.tag}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-white/70 flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5 text-[#D4FF00]" />
                  <span>{currentSlide.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white bg-black/40 rounded-full backdrop-blur-sm cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tap Navigation Zones (Left 40% = Prev, Right 60% = Next) */}
        <div className="absolute inset-y-24 inset-x-0 z-10 flex">
          <div
            className="w-2/5 h-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          />
          <div
            className="w-3/5 h-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          />
        </div>

        {/* Bottom Content & Reactions */}
        <div className="relative z-20 p-4 sm:p-5 space-y-3.5 bg-gradient-to-t from-black via-black/80 to-transparent">
          {/* Caption */}
          <p className="text-xs sm:text-sm font-sans text-white/95 leading-relaxed bg-black/40 backdrop-blur-md p-3 border-l-2 border-[#D4FF00]">
            {currentSlide.caption}
          </p>

          {/* Quick Reaction Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {['🔥', '⚡', '🖤', '👏'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleAddReaction(emoji)}
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-125 transition-transform flex items-center justify-center text-lg cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Reply in Telegram Button */}
            <button
              onClick={() =>
                onOpenTelegram(
                  `Здравствуйте! Увидел сторис «${currentSlide.caption}» у создателя ${creator.name}. Хочу обсудить похожую интеграцию для нашего бренда.`
                )
              }
              className="flex items-center gap-2 rounded-full bg-[#F5F5F0] hover:bg-white text-black px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              <Send className="h-3 w-3" />
              <span>В Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
