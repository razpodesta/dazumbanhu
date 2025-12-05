//libs/marketing/feature-home/src/lib/components/about-section.tsx
'use client';

import { Users, Award, Star, ThumbsUp, LucideIcon } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';

// Interfaces Locales
interface AboutCard {
  title: string;
  description: string;
  iconKey: string;
}

interface AboutStat {
  value: string;
  label: string;
}

interface AboutSectionData {
  title: string;
  description: string;
  cards: AboutCard[];
  stats: AboutStat[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  history: Users,
  mission: Award,
  star: Star,
  thumbsup: ThumbsUp
};

export function AboutSection() {
  // Acceso Tipado Seguro
  const homeData = ContentDictionary.homePage as unknown as { about: AboutSectionData };

  if (!homeData?.about) return null;

  const { title, description, cards, stats } = homeData.about;

  return (
    <section id="sobre" className="relative py-24 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-dark/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Cards: Historia & Misión */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {cards.map((card: AboutCard, idx: number) => {
            const Icon = ICON_MAP[card.iconKey] || Users;
            return (
              <div key={idx} className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-xl border border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-light dark:bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{card.title}</h3>
                </div>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat: AboutStat, idx: number) => (
            <div key={idx} className="group bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg text-center border border-transparent hover:border-brand-primary/30 transition-all hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-black text-brand-primary mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
