//libs/marketing/ui-landing/src/lib/footer/footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Facebook, MapPin, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { AssetManifest } from '@mobile-store/shared-util-assets';
import { FooterColumn, type LinkItem } from './footer-links';

export function Footer() {
  const content = ContentDictionary.footer;
  const brandData = ContentDictionary.navbar;
  const currentYear = new Date().getFullYear();

  const renderSocialIcon = (platform: string) => {
    const props = { size: 20 };
    switch (platform) {
      case 'instagram': return <Instagram {...props} />;
      case 'whatsapp': return <MessageCircle {...props} />;
      case 'facebook': return <Facebook {...props} />;
      default: return <ArrowUpRight {...props} />;
    }
  };

  return (
    <footer className="relative border-t border-zinc-200 bg-white pt-20 pb-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto px-6">

        {/* GRID PRINCIPAL */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

          {/* COLUMNA 1: IDENTIDAD DE MARCA */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={AssetManifest.brand.logo}
                  alt={`${brandData.logoText} Logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl font-bold text-zinc-900 dark:text-white">
                  {brandData.logoText}
                </span>
                <span className="text-sm font-medium text-brand-primary">
                  {brandData.logoSubtext}
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              {content.brandColumn.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <MapPin className="mt-0.5 shrink-0 text-brand-primary" size={18} />
                <address className="not-italic">{content.brandColumn.address}</address>
              </div>
              <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Clock className="mt-0.5 shrink-0 text-brand-primary" size={18} />
                <span>{content.brandColumn.workingHours}</span>
              </div>
            </div>
          </div>

          {/* COLUMNAS 2-4: NAVEGACIÓN DINÁMICA Y SOCIAL */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4 lg:pl-12">

            {/* Renderizado dinámico de columnas de enlaces */}
            {content.navigationColumns.map((col, idx) => (
              <FooterColumn
                key={idx}
                title={col.title}
                links={col.links as unknown as readonly LinkItem[]}
              />
            ))}

            {/* COLUMNA SOCIAL (Puede ser extraída también si crece) */}
            <div className="col-span-2 flex flex-col gap-6 lg:col-span-2">
              <div>
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Social
                </h3>
                <div className="flex gap-3">
                  {content.socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-brand-primary hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-brand-primary dark:hover:text-white"
                    >
                      {renderSocialIcon(social.platform)}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                  <ShieldCheck className="text-brand-primary" size={24} />
                  <div>
                    <p className="text-xs font-bold">Garantia Verificada</p>
                    <p className="text-[10px] text-zinc-500">Loja Oficial & Peças Originais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEGAL */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-100 pt-8 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500 md:flex-row">
          <p>{content.legal.copyrightText.replace('2025', String(currentYear))}</p>

          <div className="flex items-center gap-6">
            {content.legal.policies.map((policy, idx) => (
              <Link key={idx} href={policy.href} className="hover:text-zinc-800 dark:hover:text-zinc-300">
                {policy.label}
              </Link>
            ))}
            <span className="hidden h-3 w-px bg-zinc-200 dark:bg-zinc-800 md:block" />
            <a
              href={content.legal.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-brand-primary"
            >
              {content.legal.developerCredit}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
