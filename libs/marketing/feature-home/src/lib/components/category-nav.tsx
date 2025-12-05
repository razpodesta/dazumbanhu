//libs/marketing/feature-home/src/lib/components/category-nav.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { AssetManifest, type CategoryAssetKeys } from '@mobile-store/shared-util-assets';

// Sub-componente atómico (SRP)
function CategoryItem({ label, href, imageKey }: { label: string, href: string, imageKey: string }) {
  // Type Guard implícito gracias a los tipos exportados
  const imgSrc = AssetManifest.categories[imageKey as CategoryAssetKeys] || AssetManifest.ui.placeholders.product;

  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 min-w-[80px] md:min-w-[120px]"
    >
      <div className="relative h-20 w-20 md:h-28 md:w-28 rounded-full p-[2px] border-2 border-transparent group-hover:border-brand-primary transition-all">
        <div className="relative h-full w-full rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={imgSrc}
            alt={label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100px, 150px"
          />
        </div>
      </div>
      <span className="text-sm font-medium text-zinc-600 group-hover:text-brand-primary dark:text-zinc-400 group-hover:dark:text-brand-primary transition-colors">
        {label}
      </span>
    </Link>
  );
}

export function CategoryNav() {
  const { title, items } = ContentDictionary.homePage.categories;

  return (
    <section className="py-12 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <h3 className="text-center font-heading text-xl font-bold mb-8 text-zinc-900 dark:text-white">
          {title}
        </h3>

        <div className="flex gap-6 overflow-x-auto pb-4 md:justify-center md:overflow-visible scrollbar-hide">
          {items.map((item, index) => (
            <CategoryItem
              key={index}
              label={item.label}
              href={item.href}
              imageKey={item.imageKey}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
