//libs/marketing/feature-home/src/lib/hooks/use-carousel.ts
import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps {
  totalItems: number;
  interval?: number;
  autoPlay?: boolean;
}

/**
 * @hook useCarousel
 * @description Hook agnóstico para la gestión de estado de carruseles y sliders.
 * Maneja ciclos infinitos, pausas al hacer hover y navegación manual.
 */
export function useCarousel({ totalItems, interval = 5000, autoPlay = true }: UseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoPlay);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  }, [totalItems]);

  // Gestión del ciclo de vida del Autoplay
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [isPaused, interval, nextSlide, totalItems]);

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
    isFirst: currentIndex === 0,
    isLast: currentIndex === totalItems - 1,
  };
}
