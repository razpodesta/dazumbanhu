//libs/marketing/feature-home/src/lib/components/differentials-section.tsx
'use client';

import { Zap, ShieldCheck, Award, Star, MapPin, Gift, Cake, Clock, LucideIcon } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';

// 1. Definición de Tipos Locales (Contrato de Interfaz)
interface DifferentialItem {
  title: string;
  description: string;
  iconKey: string;
}

interface DifferentialsSectionData {
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  items: DifferentialItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  'shield-check': ShieldCheck,
  award: Award,
  star: Star,
  'map-pin': MapPin,
  gift: Gift,
  cake: Cake,
  clock: Clock
};

export function DifferentialsSection() {
  // 2. Acceso Seguro y Tipado (Solución a TS2339)
  // Usamos un casting intermedio para garantizar que TypeScript reconozca la nueva estructura
  // incluso si el archivo dictionary.ts no se ha regenerado todavía.
  const homeData = ContentDictionary.homePage as unknown as { differentials: DifferentialsSectionData };

  // Guardián de seguridad: Si los datos no existen aún, no renderizamos nada para evitar crash.
  if (!homeData?.differentials) return null;

  const { titlePrefix, titleHighlight, subtitle, items } = homeData.differentials;

  return (
    <section id="diferenciais" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6">
            {titlePrefix} <span className="text-brand-primary">{titleHighlight}</span>
          </h2>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 3. Tipado Explícito en Iteradores (Solución a TS7006) */}
          {items.map((item: DifferentialItem, idx: number) => {
            const Icon = ICON_MAP[item.iconKey] || Star;

            return (
              <div key={idx} className="group relative p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 hover:border-brand-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-light/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="absolute top-0 right-0 text-4xl font-black text-zinc-100 dark:text-zinc-800 group-hover:text-brand-primary/10 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-950 shadow-lg flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
