'use client';

import { Wrench, Truck, ShieldCheck, Timer, LucideIcon } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';

const ICON_MAP: Record<string, LucideIcon> = {
  timer: Timer,
  truck: Truck,
  shield: ShieldCheck,
  wrench: Wrench
};

export function ServicesGrid() {
  const { titlePrefix, titleHighlight, items } = ContentDictionary.homePage.services;

  return (
    <section id="servicos" className="bg-zinc-950 py-24 text-white">
      <div className="container mx-auto px-6">

        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            {titlePrefix} <span className="text-brand-primary">{titleHighlight}</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-brand-primary/30" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((feature: any, index: number) => {
            const IconComponent = ICON_MAP[feature.iconKey];

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-brand-primary/10"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-primary/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

                <div className="mb-6 inline-flex rounded-2xl bg-brand-primary/10 p-4 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  {IconComponent ? <IconComponent size={32} /> : null}
                </div>

                <h3 className="mb-3 text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-zinc-400 group-hover:text-zinc-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
