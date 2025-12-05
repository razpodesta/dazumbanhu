//libs/marketing/feature-home/src/lib/components/hero-slider.tsx
'use client';

import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { cn } from '@mobile-store/shared-ui-kit';
import { useCarousel } from '../hooks/use-carousel';
import { HeroSlide } from './hero-slide';

/**
 * @component HeroSlider
 * @description Versión interactiva del Hero. Orquesta múltiples átomos 'HeroSlide'.
 */
export function HeroSlider() {
  const { slides, autoPlayInterval } = ContentDictionary.homePage.hero;

  const {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume
  } = useCarousel({
    totalItems: slides.length,
    interval: autoPlayInterval,
    autoPlay: true
  });

  return (
    <section
      className="relative h-[85vh] w-full overflow-hidden bg-black group"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-label="Destaques Principais"
    >
      <AnimatePresence mode='popLayout'>
        {slides.map((slide, index) => (
          index === currentIndex && (
            <HeroSlide
              key={slide.id}
              title={slide.title}
              subtitle={slide.subtitle}
              ctaLabel={slide.cta.label}
              ctaHref={slide.cta.href}
              imageKey={slide.imageKey}
              theme={slide.theme}
              isActive={index === currentIndex}
              priority={index === 0} // Solo el primero es prioritario para LCP
            />
          )
        ))}
      </AnimatePresence>

      {/* Controles de Navegación (Glassmorphism) */}
      <div className="absolute bottom-8 right-6 flex gap-4 md:bottom-16 md:right-16 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicadores de Progreso */}
      <div className="absolute bottom-8 left-6 flex gap-2 md:bottom-16 md:left-16 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 shadow-sm",
              idx === currentIndex
                ? "w-12 bg-white"
                : "w-3 bg-white/30 hover:bg-white/60"
            )}
            aria-label={`Ir para o slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
