'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWhatsAppLink, WhatsAppLinkContext } from './whatsapp-link';
import { cn } from '../utils';

export interface WhatsAppButtonProps {
  /** Número de teléfono de destino (con o sin formato) */
  phoneNumber: string;
  /** Nombre del producto (opcional). Si se provee, cambia el contexto del mensaje. */
  productName?: string;
  /** Clases CSS adicionales para posicionamiento o estilo */
  className?: string;
}

/**
 * @component WhatsAppButton
 * @description Botón de Acción Flotante (FAB) inteligente.
 * Muestra un tooltip proactivo después de unos segundos para incentivar la conversión.
 */
export function WhatsAppButton({
  phoneNumber,
  productName,
  className
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Efecto Proactivo: Mostrar tooltip automáticamente después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Construcción del contexto segura para TypeScript
  // Definimos explícitamente el tipo para evitar errores de inferencia
  const context: WhatsAppLinkContext = productName
    ? { type: 'product', data: productName }
    : { type: 'general' };

  const href = generateWhatsAppLink(phoneNumber, context);

  return (
    <div
      className={cn("fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Globo de Diálogo */}
      <AnimatePresence>
        {(showTooltip || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative mr-2 max-w-[200px] rounded-2xl border border-zinc-100 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
            role="tooltip"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug text-zinc-700 dark:text-zinc-200">
                {productName
                  ? `Dúvidas sobre o ${productName}?`
                  : 'Posso ajudar você?'}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                aria-label="Fechar dica"
              >
                <X size={14} />
              </button>
            </div>
            {/* Triángulo del globo (Tailwind puro) */}
            <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-zinc-100 bg-white dark:border-zinc-700 dark:bg-zinc-800"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Principal */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center rounded-full bg-[#22C55E] p-4 text-white shadow-lg shadow-green-500/30 transition-colors hover:bg-[#16A34A]"
        onClick={() => setShowTooltip(false)}
      >
        <MessageCircle size={28} className="fill-white text-white" />

        {/* Efecto Ping (Onda expansiva para llamar la atención) */}
        <span className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-20 duration-1000"></span>
      </motion.a>
    </div>
  );
}
