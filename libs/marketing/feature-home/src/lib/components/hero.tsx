//libs/marketing/feature-home/src/lib/components/hero.tsx
'use client';

import { ContentDictionary } from '@mobile-store/shared-util-content';
import { HeroSlide } from './hero-slide';

/**
 * @component Hero (Static)
 * @description Versión simplificada del Hero para entornos donde JS es limitado
 * o para pruebas A/B. Reutiliza el átomo visual 'HeroSlide'.
 */
export function Hero() {
  // Single Truth: Usamos siempre el primer slide para la versión estática
  const slideData = ContentDictionary.homePage.hero.slides[0];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-black">
      <HeroSlide
        title={slideData.title}
        subtitle={slideData.subtitle}
        ctaLabel={slideData.cta.label}
        ctaHref={slideData.cta.href}
        imageKey={slideData.imageKey}
        theme={slideData.theme}
        isActive={true} // Siempre visible
        priority={true} // Siempre LCP
      />
    </section>
  );
}
