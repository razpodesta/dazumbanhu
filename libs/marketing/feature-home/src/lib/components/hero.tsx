'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AssetManifest } from '@mobile-store/shared-util-assets';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { cn } from '@mobile-store/shared-ui-kit';

/**
 * @component Hero (Static Variant)
 * @description Versión estática de la sección principal.
 * Útil para pruebas A/B de rendimiento o cuando se desea una experiencia sin carrusel.
 * Consume automáticamente el primer slide definido en el Content Engine.
 */
export function Hero() {
  // Estrategia: Tomamos el primer slide como "Single Truth" para la versión estática
  const slideData = ContentDictionary.homePage.hero.slides[0];

  // Acceso seguro a los assets usando la clave del slide
  const getAssetSource = (type: 'mobile' | 'desktop') => {
    const heroAssets = AssetManifest.hero as any;
    const assetKey = slideData.imageKey;
    return heroAssets[assetKey]?.[type] || AssetManifest.ui.placeholders.banner;
  };

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-black text-white">
      {/* 1. Capa de Imagen (Optimizada para LCP) */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: Vertical 9:16 */}
        <div className="block h-full w-full md:hidden">
          <Image
            src={getAssetSource('mobile')}
            alt={slideData.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Desktop: Horizontal 16:9 */}
        <div className="hidden h-full w-full md:block">
          <Image
            src={getAssetSource('desktop')}
            alt={slideData.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Overlay Gradiente Inteligente basado en el tema del slide */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t",
            slideData.theme === 'dark'
              ? "from-black/90 via-black/40 to-transparent"
              : "from-white/80 via-white/20 to-transparent"
          )}
        />
      </div>

      {/* 2. Contenido Textual Animado */}
      <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-6 pb-32 md:justify-center md:pb-0 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "max-w-xl",
            slideData.theme === 'dark' ? "text-white" : "text-zinc-900"
          )}
        >
          <h1 className="font-heading text-5xl font-black tracking-tighter leading-tight sm:text-7xl mb-6">
            {slideData.title}
          </h1>

          <p className="mb-8 text-lg font-medium opacity-90 md:text-xl max-w-md leading-relaxed">
            {slideData.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href={slideData.cta.href}
              className={cn(
                "group inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold transition-all transform hover:scale-105 active:scale-95",
                slideData.theme === 'dark'
                  ? "bg-white text-black hover:bg-brand-primary hover:text-white"
                  : "bg-black text-white hover:bg-brand-primary"
              )}
            >
              {slideData.cta.label}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
