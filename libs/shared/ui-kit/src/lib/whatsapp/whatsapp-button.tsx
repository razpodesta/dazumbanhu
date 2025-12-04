'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWhatsAppLink } from './whatsapp-link';
import { cn } from '../utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  productName?: string;
  className?: string;
}

export function WhatsAppButton({ phoneNumber, productName, className }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Efecto Proactivo: Mostrar tooltip después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const link = generateWhatsAppLink(phoneNumber, {
    type: productName ? 'product' : 'general',
    data: productName,
  });

  return (
    <div className={cn("fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2", className)}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white dark:bg-zinc-800 shadow-xl rounded-xl p-3 mb-2 max-w-[200px] border border-gray-100 dark:border-zinc-700 relative"
          >
            <div className="flex justify-between items-start gap-2">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-tight">
                {productName
                  ? `Dúvidas sobre o ${productName}?`
                  : 'Posso ajudar você?'}
              </p>
              <button onClick={() => setShowTooltip(false)} aria-label="Fechar dica">
                <X size={14} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            {/* Triángulo del globo */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white dark:bg-zinc-800 rotate-45 border-r border-b border-gray-100 dark:border-zinc-700"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors group relative"
        aria-label="Falar no WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        <MessageCircle size={28} className="fill-white text-white" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-30 animate-ping -z-10"></span>
      </motion.a>
    </div>
  );
}
