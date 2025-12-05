//libs/marketing/ui-landing/src/lib/footer/footer-links.tsx
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface LinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumnProps {
  title: string;
  links: readonly LinkItem[]; // Readonly para compatibilidad con el diccionario as const
}

/**
 * @component FooterColumn
 * @description Renderiza una columna de enlaces de navegación en el footer.
 */
export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        {title}
      </h3>
      <nav>
        <ul className="flex flex-col gap-3">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-brand-primary dark:text-zinc-400 dark:hover:text-brand-primary"
              >
                {link.label}
                {link.isExternal && <ArrowUpRight size={12} className="opacity-50" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
