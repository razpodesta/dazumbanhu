/**
 * @file whatsapp-link.ts
 * @description Utilidad pura para la generación de enlaces profundos de WhatsApp.
 * Implementa saneamiento de números y codificación de URL segura.
 */

export type WhatsAppContextType = 'product' | 'support' | 'general';

export interface WhatsAppLinkContext {
  type: WhatsAppContextType;
  /** Datos adicionales opcionales (Nombre del producto, ID de pedido, etc.) */
  data?: string;
}

/**
 * Genera una URL de API de WhatsApp con un mensaje pre-formateado.
 *
 * @param phoneNumber Número de teléfono en cualquier formato (se limpiará automáticamente).
 * @param context Contexto de la conversación para personalizar el mensaje inicial.
 */
export const generateWhatsAppLink = (
  phoneNumber: string,
  context: WhatsAppLinkContext = { type: 'general' }
): string => {
  // 1. Saneamiento: Eliminar todo lo que no sea dígito
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  // 2. Lógica de Mensajes (Copywriting Persuasivo)
  let message = '';

  switch (context.type) {
    case 'product':
      // Si hay datos, usamos el mensaje específico, si no, fallback a general
      if (context.data) {
        message = `Olá! Estou vendo o *${context.data}* na loja e gostaria de tirar uma dúvida.`;
      } else {
        message = 'Olá! Gostaria de saber mais sobre um produto da loja.';
      }
      break;

    case 'support':
      if (context.data) {
        message = `Olá, preciso de ajuda com o pedido #${context.data}.`;
      } else {
        message = 'Olá, preciso de suporte técnico.';
      }
      break;

    case 'general':
    default:
      message = 'Olá! Gostaria de mais informações sobre a Dázum Banhu.';
      break;
  }

  // 3. Construcción de URL segura
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
