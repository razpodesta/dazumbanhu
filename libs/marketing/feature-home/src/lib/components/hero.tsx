'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AssetManifest } from '@mobile-store/shared/util-assets';
import { WhatsAppButton } from '@mobile-store/shared/ui-kit';

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black text-white">
      {/* 1. Fondo / Imagen Principal (LCP Critical) */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: Vertical 9:16 */}
        <div className="block h-full w-full md:hidden">
            <Image
            src={AssetManifest.hero.homeMain.mobile}
            alt={AssetManifest.hero.homeMain.alt}
            fill
            priority
            className="object-cover opacity-80"
            sizes="100vw"
            />
        </div>

        {/* Desktop: Horizontal 16:9 */}
        <div className="hidden h-full w-full md:block">
            <Image
            src={AssetManifest.hero.homeMain.desktop}
            alt={AssetManifest.hero.homeMain.alt}
            fill
            priority
            className="object-cover opacity-80"
            sizes="100vw"
            />
        </div>
        {/* Gradiente para legibilidad de texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* 2. Contenido (Scrollytelling Entry) */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:justify-center md:pb-0 md:pl-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-black tracking-tighter sm:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Você merece
            </span>
            <br />
            o melhor da tecnologia.
          </h1>

          <p className="mt-6 text-lg text-gray-200 md:text-xl max-w-lg">
            Conserto especializado em 15 minutos, acessórios premium e a garantia de quem é #1 em Floripa.
          </p>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
               href="#servicos"
               className="rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105 active:scale-95"
            >
              Ver Serviços
            </a>
            <a
               href="#catalogo"
               className="rounded-full border border-white/30 bg-white/10 px-8 py-4 font-bold backdrop-blur-md transition-all hover:bg-white/20"
            >
              Loja Online
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* WhatsApp Flotante integrado en la feature */}
      <WhatsAppButton phoneNumber="5548984771608" />
    </section>
  );
}
