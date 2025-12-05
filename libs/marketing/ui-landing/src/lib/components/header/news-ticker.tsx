//libs/marketing/ui-landing/src/lib/components/header/news-ticker.tsx
'use client';

import { useEffect, useState } from 'react';
import { cn } from '@mobile-store/shared-ui-kit';

interface NewsTickerProps {
  messages: readonly string[];
  className?: string;
}

/**
 * @component NewsTicker
 * @description Barra de noticias con desplazamiento infinito horizontal.
 * Se pausa automáticamente al pasar el mouse para mejorar la accesibilidad y lectura.
 */
export function NewsTicker({ messages, className }: NewsTickerProps) {
  const [isClient, setIsClient] = useState(false);

  // Evitar hidratación incorrecta en animaciones
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || messages.length === 0) return null;

  return (
    <div
      className={cn(
        "relative flex overflow-hidden h-10 bg-brand-dark text-white items-center",
        className
      )}
      role="marquee"
      aria-label="Anuncios importantes"
    >
      {/* Gradientes laterales para suavizar la entrada/salida */}
      <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none" />

      {/* Contenedor Animado */}
      <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
        {/* Renderizamos los mensajes dos veces para el efecto de loop infinito sin saltos */}
        {[...messages, ...messages, ...messages].map((msg, idx) => (
          <span
            key={idx}
            className="mx-8 text-xs font-medium tracking-wide uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
