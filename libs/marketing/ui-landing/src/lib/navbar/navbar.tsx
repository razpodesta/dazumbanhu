//libs/marketing/ui-landing/src/lib/navbar/navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Phone } from 'lucide-react';
import { cn } from '@mobile-store/shared-ui-kit';
import { AssetManifest } from '@mobile-store/shared-util-assets';
import { ContentDictionary } from '@mobile-store/shared-util-content';

// Importaciones de Arquitectura Elite
import { mainNavStructure, socialNavLinks } from '../config/navigation-structure';
import { DropdownMenu } from '../components/ui/DropdownMenu';
import { NestedDropdownContent } from '../components/ui/NestedDropdownContent';
import { getIconByKey } from '../components/icon-registry';
import { getLocalizedHref } from '@mobile-store/shared-util-routing';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Diccionario Plano para Traducciones (Merge de fuentes para robustez)
  // En un caso real, 'nav_links' debería estar poblado en el diccionario generado.
  // Aquí hacemos un fallback seguro a los valores raw o al objeto navbar antiguo si nav_links no existe.
  const t = {
    ...(ContentDictionary as any).nav_links, // Intentar leer nuevo diccionario flat
    ...ContentDictionary.navbar.links,      // Fallback a links antiguos
    ...ContentDictionary.navbar             // Fallback a textos generales
  } as Record<string, string>;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50 py-3"
            : "bg-transparent py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* 1. LOGOTIPO */}
          <Link href="/" className="flex items-center gap-2 group relative z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
               <Image
                 src={AssetManifest.brand.logo}
                 alt={t['logoText'] || "Dázum Banhu"}
                 width={40}
                 height={40}
                 className="object-cover"
                 priority
               />
            </div>
            <div className={cn("flex flex-col leading-none transition-colors", isScrolled ? "text-zinc-900 dark:text-white" : "text-white")}>
              <span className="font-heading font-bold text-lg tracking-tight">
                {t['logoText'] || "Dázum Banhu"}
              </span>
              <span className="font-handwriting text-brand-primary text-sm font-bold -mt-1">
                {t['logoSubtext'] || "Celulares"}
              </span>
            </div>
          </Link>

          {/* 2. MENÚ DESKTOP (Sistema Recursivo) */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavStructure.map((item, idx) => {
              const label = t[item.labelKey || ''] || item.labelKey || 'Menu';
              const Icon = getIconByKey(item.iconKey);

              // A. Botón Destacado (CTA)
              if (item.isHighlight) {
                return (
                  <Link
                    key={idx}
                    href={getLocalizedHref(item.href, 'pt')} // Default locale
                    className="ml-2 px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-dark text-white text-sm font-bold shadow-lg shadow-brand-primary/20 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    {item.iconKey && <Icon size={16} />}
                    {label}
                  </Link>
                );
              }

              // B. Menú con Dropdown
              if (item.children && item.children.length > 0) {
                return (
                  <DropdownMenu
                    key={idx}
                    trigger={
                      <button className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 group",
                        isScrolled
                          ? "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}>
                        {item.iconKey && <Icon size={16} className="opacity-80" />}
                        {label}
                      </button>
                    }
                  >
                    <NestedDropdownContent items={item.children} dictionary={t} />
                  </DropdownMenu>
                );
              }

              // C. Enlace Simple
              return (
                <Link
                  key={idx}
                  href={getLocalizedHref(item.href, 'pt')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                    isScrolled
                      ? "text-zinc-600 hover:text-brand-primary hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.iconKey && <Icon size={16} className="opacity-80" />}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* 3. ACCIONES */}
          <div className="flex items-center gap-3">
            <button
              className={cn(
                "hidden md:flex p-2.5 rounded-full transition-colors",
                isScrolled
                  ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  : "hover:bg-white/10 text-white"
              )}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            <button
              className={cn(
                "relative p-2.5 rounded-full transition-colors group",
                isScrolled
                  ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  : "hover:bg-white/10 text-white"
              )}
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-brand-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-950 scale-0 group-hover:scale-100 transition-transform duration-200">
                0
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors active:scale-95",
                isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
              )}
              aria-label="Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 4. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-zinc-900 z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                <span className="font-heading font-bold text-xl text-zinc-900 dark:text-white">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                {/* Reutilizamos el motor recursivo para el móvil */}
                <NestedDropdownContent items={mainNavStructure} dictionary={t} />

                <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 my-6" />

                <div className="flex justify-center gap-4">
                  {socialNavLinks.map((social) => {
                    const SocialIcon = getIconByKey(social.iconKey);
                    return (
                      <a key={social.label} href={social.href} className="p-3 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:text-brand-primary transition-colors">
                        <SocialIcon size={20} />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                <a
                  href="https://wa.me/5548984771608"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#22C55E] hover:bg-[#16A34A] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                >
                  <Phone size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
