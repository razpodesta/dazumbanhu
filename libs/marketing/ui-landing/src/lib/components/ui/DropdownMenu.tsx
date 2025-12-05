//libs/marketing/ui-landing/src/lib/components/ui/DropdownMenu.tsx
'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { cn } from '@mobile-store/shared-ui-kit';

type DropdownMenuProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Variantes de animación optimizadas para la GPU.
 * Utiliza transformaciones simples (scale, y, opacity) para 60fps.
 */
const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.15, ease: "easeIn" }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.15, ease: "easeIn" }
  },
};

/**
 * @component DropdownMenu
 * @description Contenedor interactivo que gestiona la visibilidad de submenús.
 * Implementa lógica de "Click Outside" y eventos de mouse para desktop.
 */
export function DropdownMenu({ trigger, children, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Manejo robusto de interacciones (Mouse Enter/Leave con delay para UX)
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150); // Pequeño delay de gracia
  };

  // Cierre al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Element (Botón del Navbar) */}
      <div className="cursor-pointer h-full flex items-center">
        {trigger}
      </div>

      {/* Panel Flotante Animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute top-full left-0 pt-4 z-50", // pt-4 crea un puente invisible para el mouse
              className
            )}
          >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden p-2 min-w-[220px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
