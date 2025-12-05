//libs/marketing/feature-home/src/lib/components/hero/hero-slide.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@mobile-store/shared-ui-kit';
import { AssetManifest } from '@mobile-store/shared-util-assets';

// Definimos tipos estrictos para las props del Slide, desacoplándolos del diccionario global
// para hacer el componente más puro y testeable.
export interface HeroSlideProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageKey: string; // Clave para buscar en AssetManifest
  theme: 'dark' | 'light';
  isActive: boolean;
  priority?: boolean;
}

/**
 * @component HeroSlide
 * @description Componente presentacional puro para un slide del Hero.
 * Responsable de la renderización de imagen, textos y animaciones de entrada.
 */
export function HeroSlide({
  title, subtitle, ctaLabel, ctaHref, imageKey, theme, isActive, priority = false
}: HeroSlideProps) {

  // Acceso seguro a assets
  const getAsset = (type: 'mobile' | 'desktop') => {
    const assets = AssetManifest.hero as any;
    return assets[imageKey]?.[type] || AssetManifest.ui.placeholders.banner;
  };

  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      aria-hidden={!isActive}
    >
      {/* Capa de Imagen */}
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

        {/* Overlay Gradiente */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t",
          theme === 'dark'
            ? "from-black/80 via-black/20 to-transparent"
            : "from-white/60 via-white/10 to-transparent"
        )} />
      </div>

      {/* Contenido Textual */}
      <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6 md:justify-center md:pb-0 md:px-20 container mx-auto pointer-events-none">
        <div className="pointer-events-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={cn("max-w-xl", theme === 'dark' ? "text-white" : "text-zinc-900")}
          >
            <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl font-medium mb-8 opacity-90 max-w-md">
              {subtitle}
            </p>

            <Link
              href={ctaHref}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95",
                theme === 'dark'
                  ? "bg-white text-black hover:bg-brand-primary hover:text-white"
                  : "bg-black text-white hover:bg-brand-primary"
              )}
            >
              {ctaLabel}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
