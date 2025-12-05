//libs/marketing/feature-home/src/lib/components/hero-slide.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@mobile-store/shared-ui-kit';
import { AssetManifest } from '@mobile-store/shared-util-assets';

export interface HeroSlideProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageKey: string;
  theme: 'dark' | 'light';
  isActive?: boolean; // Opcional, por defecto true para uso estático
  priority?: boolean;
}

/**
 * @component HeroSlide
 * @description Componente de presentación atómico.
 * Centraliza el diseño visual del Hero para garantizar consistencia
 * tanto en la versión estática como en el carrusel dinámico.
 */
export function HeroSlide({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageKey,
  theme,
  isActive = true,
  priority = false
}: HeroSlideProps) {

  // Acceso seguro a assets (Adapter Pattern)
  const getAsset = (type: 'mobile' | 'desktop') => {
    const assets = AssetManifest.hero as any;
    // Fallback defensivo
    return assets[imageKey]?.[type] || AssetManifest.ui.placeholders.banner;
  };

  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      // Animación condicional: Si es estático, no anima opacidad de entrada/salida agresivamente
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      aria-hidden={!isActive}
    >
      {/* 1. Capa de Imagen (LCP Optimizado) */}
      <div className="relative h-full w-full">
        <Image
          src={getAsset('desktop')}
          alt={title}
          fill
          priority={priority}
          className="hidden object-cover md:block"
          sizes="100vw"
        />
        <Image
          src={getAsset('mobile')}
          alt={title}
          fill
          priority={priority}
          className="block object-cover md:hidden"
          sizes="100vw"
        />

        {/* Overlay Gradiente Inteligente */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t",
          theme === 'dark'
            ? "from-black/90 via-black/20 to-transparent"
            : "from-white/80 via-white/10 to-transparent"
        )} />
      </div>

      {/* 2. Contenido Textual */}
      <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6 md:justify-center md:pb-0 md:px-20 container mx-auto pointer-events-none">
        <div className="pointer-events-auto">
          <motion.div
            // Animación de entrada del texto solo cuando se activa el slide
            initial={{ y: 40, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className={cn("max-w-xl", theme === 'dark' ? "text-white" : "text-zinc-900")}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              {title}
            </h1>
            <p className="text-lg md:text-xl font-medium mb-8 opacity-90 max-w-md leading-relaxed">
              {subtitle}
            </p>

            <Link
              href={ctaHref}
              className={cn(
                "group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl",
                theme === 'dark'
                  ? "bg-white text-black hover:bg-brand-primary hover:text-white"
                  : "bg-black text-white hover:bg-brand-primary"
              )}
            >
              {ctaLabel}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
