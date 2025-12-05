//libs/marketing/ui-landing/src/lib/components/ui/NestedDropdownContent.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getLocalizedHref } from '@mobile-store/shared-util-routing';
import type { NavItemType } from '@mobile-store/shared-util-content';
import { getIconByKey } from '../icon-registry';
import { cn } from '@mobile-store/shared-ui-kit';

type NestedDropdownContentProps = {
  items: NavItemType[] | undefined;
  dictionary: Record<string, string>;
  level?: number;
};

/**
 * @component NestedDropdownContent
 * @description Motor de renderizado recursivo con Type Guards estrictos.
 */
export function NestedDropdownContent({ items, dictionary, level = 0 }: NestedDropdownContentProps) {
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] || 'pt-BR';

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {items.map((item, index) => {

        // GUARD: Separador
        if (item.isSeparator) {
          return <div key={`sep-${index}`} className="h-px w-full bg-zinc-100 dark:bg-zinc-800 my-2" />;
        }

        // GUARD: Sección Social
        if (item.isSocial && item.links) {
          return (
            <div key={`social-${index}`} className="flex items-center justify-center gap-2 py-2 px-1">
              {item.links.map((socialLink) => {
                const SocialIcon = getIconByKey(socialLink.iconKey);
                return (
                  <a
                    key={socialLink.label}
                    href={socialLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLink.label}
                    className="p-2 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-brand-primary dark:hover:bg-zinc-800 transition-colors"
                  >
                    <SocialIcon size={18} />
                  </a>
                );
              })}
            </div>
          );
        }

        // LÓGICA ESTÁNDAR: Enlace o Submenú
        // Aseguramos fallbacks seguros para propiedades opcionales
        const labelKey = item.labelKey || 'missing_key';
        const label = dictionary[labelKey] || labelKey;
        const Icon = getIconByKey(item.iconKey);
        const hasChildren = item.children && item.children.length > 0;

        const href = hasChildren ? '#' : getLocalizedHref(item.href, currentLang);

        // Renderizado Recursivo (Padre con hijos)
        if (hasChildren) {
          return (
            <div key={index} className="group/nested relative">
              <div className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-brand-primary dark:hover:text-white transition-all cursor-default">
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-zinc-400 group-hover/nested:text-brand-primary transition-colors" />
                  <span>{label}</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400" />
              </div>

              {/* Panel Recursivo Lateral */}
              <div className="absolute left-full top-0 ml-2 w-56 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 transform translate-x-[-10px] group-hover/nested:translate-x-0 z-50">
                 <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl p-2 overflow-hidden">
                    <NestedDropdownContent
                      items={item.children}
                      dictionary={dictionary}
                      level={level + 1}
                    />
                 </div>
              </div>
            </div>
          );
        }

        // Renderizado Final (Item hoja)
        return (
          <Link
            key={index}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              "text-zinc-600 dark:text-zinc-300",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-brand-primary dark:hover:text-white"
            )}
          >
            <Icon size={18} className="text-zinc-400 group-hover:text-brand-primary transition-colors" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
