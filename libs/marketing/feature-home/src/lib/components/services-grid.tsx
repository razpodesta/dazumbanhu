//libs/marketing/feature-home/src/lib/components/services-grid.tsx
'use client';

import { Wrench, Truck, ShieldCheck, Timer, LucideIcon, Smartphone, Headphones, Laptop } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';

// Interfaces Locales
interface ServiceItem {
  title: string;
  description: string;
  iconKey: string;
  features?: string[];
  ctaLabel?: string;
}

interface ServicesSectionData {
  titlePrefix: string;
  titleHighlight: string;
  items: ServiceItem[];
}

// Mapa de iconos expandido
const ICON_MAP: Record<string, LucideIcon> = {
  timer: Timer,
  truck: Truck,
  shield: ShieldCheck,
  wrench: Wrench,
  smartphone: Smartphone,
  headphones: Headphones,
  laptop: Laptop
};

function ServiceCard({ item }: { item: ServiceItem }) {
  const IconComponent = ICON_MAP[item.iconKey] || Wrench;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/10">
      {/* Efecto de luz ambiental */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-primary/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

      <div className="mb-6 inline-flex rounded-2xl bg-brand-primary/10 p-4 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
        <IconComponent size={32} />
      </div>

      <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
        {item.title}
      </h3>
      <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
        {item.description}
      </p>

      {/* Lista de Features Opcional */}
      {item.features && (
        <ul className="mt-6 space-y-2">
          {item.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ServicesGrid() {
  // Acceso seguro
  const homeData = ContentDictionary.homePage as unknown as { services: ServicesSectionData };

  if (!homeData?.services) return null;

  const { titlePrefix, titleHighlight, items } = homeData.services;

  return (
    <section id="servicos" className="bg-zinc-50 dark:bg-zinc-950 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-zinc-900 dark:text-white">
            {titlePrefix} <span className="text-brand-primary">{titleHighlight}</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-brand-primary/30" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: ServiceItem, index: number) => (
            <ServiceCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
