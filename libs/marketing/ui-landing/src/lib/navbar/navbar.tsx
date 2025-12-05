'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Wrench, ChevronRight, Phone } from 'lucide-react';
import { cn } from '@mobile-store/shared-ui-kit';
import { AssetManifest } from '@mobile-store/shared-util-assets';
import { ContentDictionary, type NavbarContent } from '@mobile-store/shared-util-content';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const content = ContentDictionary.navbar;

  // Type-Safe Iteration: Convertimos el objeto de links en array preservando tipos
  const navLinks = Object.values(content.links);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  // Bloqueo de scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50 py-3"
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
                 alt={`${content.logoText} Logo`}
                 width={40}
                 height={40}
                 className="object-cover"
                 priority
               />
            </div>
            <div className={cn("flex flex-col leading-none transition-colors", isScrolled ? "text-zinc-900 dark:text-white" : "text-white")}>
              <span className="font-heading font-bold text-lg tracking-tight">
                {content.logoText}
              </span>
              <span className="font-handwriting text-[#00C2CB] text-sm font-bold -mt-1">
                {content.logoSubtext}
              </span>
            </div>
          </Link>

          {/* 2. MENÚ DESKTOP */}
          <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded-full border border-white/10 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  link.isHighlight
                    ? "bg-[#00C2CB] text-white shadow-lg shadow-teal-500/20 hover:bg-[#008B92]"
                    : isScrolled
                        ? "text-zinc-600 hover:text-[#00C2CB] hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
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
              aria-label={content.actions.search}
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
              aria-label={content.actions.cart}
            >
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-[#00C2CB] text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-950 scale-0 group-hover:scale-100 transition-transform duration-200">
                0
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors active:scale-95",
                isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
              )}
              aria-label={content.actions.menu}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 4. MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-zinc-900 z-[70] shadow-2xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                <span className="font-heading font-bold text-xl text-zinc-900 dark:text-white">
                  {content.mobile.menuTitle}
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-red-500 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl text-lg font-medium transition-all active:scale-95",
                      link.isHighlight
                        ? "bg-teal-50 dark:bg-teal-900/20 text-[#008B92] dark:text-[#00C2CB]"
                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {link.label}
                    </span>
                    {link.isHighlight
                      ? <Wrench size={18} className="text-[#00C2CB]" />
                      : <ChevronRight size={18} className="opacity-30" />
                    }
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                <a
                  href="https://wa.me/5548984771608"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#22C55E] hover:bg-[#16A34A] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                >
                  <Phone size={20} />
                  {content.mobile.emergencyCta}
                </a>
                <p className="text-center text-xs text-zinc-400 mt-4 font-medium">
                  {content.mobile.locationText}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
