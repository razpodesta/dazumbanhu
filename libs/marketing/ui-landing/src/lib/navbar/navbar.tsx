'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Wrench, ChevronRight, Phone } from 'lucide-react';
import { cn } from '@mobile-store/shared-ui-kit';
import { AssetManifest } from '@mobile-store/shared-util-assets';
import Image from 'next/image';

// Definición de enlaces de navegación
const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Conserto Rápido', href: '#reparo', isHighlight: true },
  { label: 'Acessórios', href: '#acessorios' },
  { label: 'Sobre Nós', href: '#historia' },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para cambiar el estilo
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-b border-white/20 py-3"
            : "bg-transparent py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* 1. LOGOTIPO & BRANDING */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            {/* Logo Icon */}
            <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transition-transform">
               {/* Usamos el AssetManifest para la fuente de la imagen */}
               <Image
                 src={AssetManifest.brand.logo}
                 alt="Dázum Banhu Logo"
                 width={40}
                 height={40}
                 className="object-cover"
               />
            </div>
            {/* Texto Logo */}
            <div className={cn("flex flex-col leading-none", isScrolled ? "text-zinc-900 dark:text-white" : "text-white")}>
              <span className="font-heading font-bold text-lg tracking-tight">Dázum Banhu</span>
              <span className="font-handwriting text-brand-primary text-sm font-bold -mt-1">Celulares</span>
            </div>
          </Link>

          {/* 2. MENÚ DESKTOP (Cápsula Flotante) */}
          <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  link.isHighlight
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-dark"
                    : isScrolled
                        ? "text-zinc-600 hover:text-brand-primary hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 3. ACCIONES (Carrito / Search / Menu) */}
          <div className="flex items-center gap-3">
            {/* Search (Desktop) */}
            <button
              className={cn(
                "hidden md:flex p-2.5 rounded-full transition-colors",
                isScrolled ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300" : "hover:bg-white/10 text-white"
              )}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {/* Cart (Desktop & Mobile) */}
            <button
              className={cn(
                "relative p-2.5 rounded-full transition-colors group",
                isScrolled ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300" : "hover:bg-white/10 text-white"
              )}
              aria-label="Ver Carrinho"
            >
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-brand-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-950 scale-0 group-hover:scale-100 transition-transform">
                0
              </span>
            </button>

            {/* Hamburger (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
              )}
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
            {/* Backdrop oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm md:hidden"
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-zinc-900 z-[70] shadow-2xl flex flex-col md:hidden"
            >
              {/* Header del Menú */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                <span className="font-heading font-bold text-xl text-zinc-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lista de Links */}
              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl text-lg font-medium transition-all active:scale-95",
                      link.isHighlight
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    )}
                  >
                    {link.label}
                    {link.isHighlight ? <Wrench size={18} /> : <ChevronRight size={18} className="opacity-30" />}
                  </Link>
                ))}
              </div>

              {/* Footer del Menú (CTA Emergencia) */}
              <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                <a
                  href="https://wa.me/5548984771608"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-transform"
                >
                  <Phone size={20} />
                  Falar no WhatsApp
                </a>
                <p className="text-center text-xs text-zinc-400 mt-4">
                  Trindade, Florianópolis - SC
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
