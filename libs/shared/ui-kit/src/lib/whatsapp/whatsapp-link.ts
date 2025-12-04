export const generateWhatsAppLink = (
  phone: string,
  context?: { type: 'product' | 'support' | 'general'; data?: string }
) => {
  // Limpiar el teléfono de caracteres no numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  const baseUrl = `https://wa.me/${cleanPhone}`;
  let message = '';

  switch (context?.type) {
    case 'product':
      message = `Olá! Estou vendo o *${context.data}* na loja e tenho uma dúvida.`;
      break;
    case 'support':
      message = `Preciso de ajuda com meu pedido #${context.data}.`;
      break;
    default:
      message = 'Olá! Gostaria de mais informações sobre a loja.';
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};
