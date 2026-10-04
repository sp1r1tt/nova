'use client';

import React, { useState } from 'react';
import { X, Send, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledText?: string;
}

export const TelegramModal: React.FC<TelegramModalProps> = ({
  isOpen,
  onClose,
  prefilledText = 'Здравствуйте! Хочу обсудить бриф на сотрудничество с цифровыми создателями NOVA.',
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);

  if (!isOpen) return null;

  const botHandle = 'novacreators_bot';
  const encodedText = encodeURIComponent(prefilledText);
  const telegramUrl = `https://t.me/${botHandle}?text=${encodedText}`;

  const handleCopyText = () => {
    navigator.clipboard?.writeText(prefilledText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyHandle = () => {
    navigator.clipboard?.writeText(`@${botHandle}`);
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0D0D0D] border border-white/15 p-6 sm:p-7 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#858585] hover:text-white p-1 cursor-pointer transition-colors"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#D4FF00]">
            <Send className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#D4FF00]">
              NOVA TELEGRAM
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Продюсерский центр NOVA
            </h3>
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="bg-[#080808] border border-white/[0.08] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#858585]">
            <span>Готовое сообщение для отправки:</span>
            <button
              onClick={handleCopyText}
              className="text-[#D4FF00] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedText ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Копировать</span>
                </>
              )}
            </button>
          </div>
          <div className="text-xs text-white/90 font-mono max-h-24 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {prefilledText}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-[#F5F5F0] hover:bg-white text-black py-3.5 px-4 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Открыть диалог в Telegram</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>

          <button
            onClick={handleCopyHandle}
            className="w-full flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#858585] hover:text-white py-2.5 px-4 text-xs font-mono transition-all cursor-pointer"
          >
            {copiedHandle ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#D4FF00]" />
                <span className="text-[#D4FF00]">@{botHandle} скопирован в буфер</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Скопировать username @{botHandle}</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#858585] pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#D4FF00]" />
          <span>Ответ дежурного продюсера в течение 15 минут</span>
        </div>
      </div>
    </div>
  );
};
