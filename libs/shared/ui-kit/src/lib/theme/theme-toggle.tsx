'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';

interface ThemeToggleProps {
  className?: string;
  /** Textos de accesibilidad inyectados desde el Content Engine para i18n */
  labels: {
    light: string;
    dark: string;
  };
}

/**
 * @component ThemeToggle
 * @description Interruptor de modo oscuro/claro con animaciones avanzadas.
 * Gestiona el ciclo de vida de React para evitar discrepancias de hidratación (Hydration Mismatch).
 */
export function ThemeToggle({ className, labels }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Efecto de montaje para asegurar que estamos en el cliente antes de renderizar iconos
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder invisible del mismo tamaño para mantener el layout estable (CLS 0)
    return <div className={cn("h-10 w-10", className)} aria-hidden="true" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
        "hover:bg-black/5 dark:hover:bg-white/10 active:scale-90",
        className
      )}
      aria-label={isDark ? labels.light : labels.dark}
      title={isDark ? labels.light : labels.dark}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {isDark ? (
            <Moon size={20} className="text-brand-primary drop-shadow-[0_0_8px_rgba(0,194,203,0.5)]" />
          ) : (
            <Sun size={20} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
