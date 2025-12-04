import { z } from 'zod';

// Schema base para teléfonos brasileños (Mobile First, Brasil Context)
export const phoneSchema = z
  .string()
  .min(10, 'Telefone inválido')
  .max(15, 'Telefone muito longo')
  .regex(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, 'Formato inválido. Use (XX) 9XXXX-XXXX');

// Schema para emails
export const emailSchema = z
  .string()
  .email('Email inválido')
  .min(5)
  .max(100);

// Schema base para IDs (UUIDs o IDs numéricos de Shopify)
export const idSchema = z.string().min(1, 'ID obrigatório');

// Tipo inferido para uso en TypeScript
export type Phone = z.infer<typeof phoneSchema>;
