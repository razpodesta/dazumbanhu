//libs/marketing/ui-landing/src/lib/navbar/navbar.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ShoppingBag, Phone } from 'lucide-react';
import { cn } from '@mobile-store/shared-ui-kit';
import { AssetManifest } from '@mobile-store/shared-util-assets';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { getLocalizedHref } from '@mobile-store/shared-util-routing';

// Imports de Arquitectura
import { mainNavStructure, socialNavLinks } from '../config/navigation-structure';
import { DropdownMenu } from '../components/ui/DropdownMenu';
import { NestedDropdownContent } from '../components/ui/NestedDropdownContent';
import { getIconByKey } from '../components/icon-registry';

// --- 1. ÁTOMO: LOGOTIPO (Brand Identity) ---
const BrandLogo = ({
  t,
  isScrolled,
  onClick
}: {
  t: Record<string, string>;
  isScrolled: boolean;
  onClick?: () => void
}) => (
  <Link href="/" className="flex items-center gap-2 group relative z-50" onClick={onClick}>
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
);

// --- 2. ÁTOMO: NAVEGACIÓN DESKTOP (Recursive Trigger) ---
const DesktopNav = ({ t, isScrolled }: { t: Record<string, string>; isScrolled: boolean }) => (
  <nav className="hidden lg:flex items-center gap-1">
    {mainNavStructure.map((item, idx) => {
      const label = t[item.labelKey || ''] || item.labelKey || 'Menu';
      const Icon = getIconByKey(item.iconKey);
      const href = getLocalizedHref(item.href, 'pt');

      // Caso A: Botón Destacado (CTA)
      if (item.isHighlight) {
        return (
          <Link
            key={idx}
            href={href}
            className="ml-2 px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-dark text-white text-sm font-bold shadow-lg shadow-brand-primary/20 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            {item.iconKey && <Icon size={16} />}
            {label}
          </Link>
        );
      }

      // Caso B: Dropdown Recursivo
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

      // Caso C: Link Simple
      return (
        <Link
          key={idx}
          href={href}
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
);

// --- 3. ÁTOMO: ACCIONES (Cart & Mobile Trigger) ---
const ActionButtons = ({
  isScrolled,
  onOpenMobile
}: {
  isScrolled: boolean;
  onOpenMobile: () => void;
}) => (
  <div className="flex items-center gap-3">
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
      onClick={onOpenMobile}
      className={cn(
        "lg:hidden p-2 rounded-lg transition-colors active:scale-95",
        isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
      )}
      aria-label="Menu"
    >
      <Menu size={28} />
    </button>
  </div>
);

// --- 4. ÁTOMO: MENÚ MÓVIL (Sidebar Overlay) ---
const MobileMenuOverlay = ({
  isOpen,
  onClose,
  t,
  menuTitle
}: {
  isOpen: boolean;
  onClose: () => void;
  t: Record<string, string>;
  menuTitle: string
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
              {menuTitle}
            </span>
            <button
              onClick={onClose}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
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
);

// --- COMPONENTE PRINCIPAL (ORQUESTADOR) ---
export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Construcción robusta del diccionario plano
  const t = useMemo(() => ({
    ...(ContentDictionary as any).nav_links,
    ...ContentDictionary.navbar.links,
    ...ContentDictionary.navbar
  } as Record<string, string>), []);

  const mobileMenuTitle = ContentDictionary.navbar.mobile?.menuTitle || "Menu";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 10;
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
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-sm border-b border-zinc-200/50 py-2"
            : "bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 py-4"
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <BrandLogo t={t} isScrolled={true} onClick={() => setIsMobileMenuOpen(false)} />

          <DesktopNav t={t} isScrolled={true} />

          <ActionButtons
            isScrolled={true}
            onOpenMobile={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </motion.header>

      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        t={t}
        menuTitle={mobileMenuTitle}
      />
    </>
  );
}
