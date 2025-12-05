'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { AssetManifest } from '@mobile-store/shared-util-assets';

export function CategoryNav() {
  const { title, items } = ContentDictionary.homePage.categories;

  // Helper para obtener imagen (simulado)
  const getCatImage = (key: string) => {
    // En producción usaríamos AssetManifest.categories[key]
    return AssetManifest.ui.placeholders.product;
  };

  return (
    <section className="py-12 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <h3 className="text-center font-heading text-xl font-bold mb-8 text-zinc-900 dark:text-white">
          {title}
        </h3>

        {/* Scroll horizontal en móvil, Grid centrado en desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 md:justify-center md:overflow-visible scrollbar-hide">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group flex flex-col items-center gap-3 min-w-[80px] md:min-w-[120px]"
            >
              <div className="relative h-20 w-20 md:h-28 md:w-28 rounded-full p-[2px] border-2 border-transparent group-hover:border-brand-primary transition-all">
                <div className="relative h-full w-full rounded-full overflow-hidden bg-zinc-100">
                  <Image
                    src={getCatImage(item.imageKey)}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-zinc-600 group-hover:text-brand-primary dark:text-zinc-300 transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
