'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { AssetManifest } from '@mobile-store/shared-util-assets';
import { cn } from '@mobile-store/shared-ui-kit';

export function HeroSlider() {
  const { slides, autoPlayInterval } = ContentDictionary.homePage.hero;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Lógica de Autoplay con limpieza segura
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Mapeo seguro de imágenes desde el Manifest
  const getImageSrc = (key: string, type: 'mobile' | 'desktop') => {
    const assets = AssetManifest.hero as any;
    return assets[key]?.[type] || AssetManifest.ui.placeholders.product;
  };

  return (
    <section
      className="relative h-[85vh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsAutoPlaying(false)} // Pausa al hacer hover (Mejor UX)
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode='popLayout'>
        {slides.map((slide, index) => (
          index === currentIndex && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }} // Fusión lenta de 3s (ajustado visualmente a 1.2s para que no sea eterno)
              className="absolute inset-0 h-full w-full"
            >
              {/* Capa de Imagen (Mobile & Desktop) */}
              <div className="relative h-full w-full">
                <Image
                  src={getImageSrc(slide.imageKey, 'desktop')}
                  alt={slide.title}
                  fill
                  priority={index === 0} // Solo LCP para el primero
                  className="hidden object-cover md:block"
                  sizes="100vw"
                />
                <Image
                  src={getImageSrc(slide.imageKey, 'mobile')}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="block object-cover md:hidden"
                  sizes="100vw"
                />

                {/* Overlay Gradiente para legibilidad */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t",
                  slide.theme === 'dark' ? "from-black/80 via-black/20 to-transparent" : "from-white/60 via-white/10 to-transparent"
                )} />
              </div>

              {/* Contenido Textual */}
              <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6 md:justify-center md:pb-0 md:px-20 container mx-auto">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className={cn("max-w-xl", slide.theme === 'dark' ? "text-white" : "text-zinc-900")}
                >
                  <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl font-medium mb-8 opacity-90 max-w-md">
                    {slide.subtitle}
                  </p>

                  <Link
                    href={slide.cta.href}
                    className={cn(
                      "inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95",
                      slide.theme === 'dark'
                        ? "bg-white text-black hover:bg-brand-primary hover:text-white"
                        : "bg-black text-white hover:bg-brand-primary"
                    )}
                  >
                    {slide.cta.label}
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Controles de Navegación (Flechas) */}
      <div className="absolute bottom-10 right-6 flex gap-4 md:bottom-20 md:right-20 z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicadores de Progreso (Puntos) */}
      <div className="absolute bottom-10 left-6 flex gap-2 md:bottom-20 md:left-20 z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 transition-all duration-500 rounded-full",
              idx === currentIndex ? "w-12 bg-white" : "w-4 bg-white/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}
