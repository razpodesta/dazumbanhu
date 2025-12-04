import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { v4 as uuidv4 } from 'uuid';

/**
 * Genera una firma HMAC para validar la integridad de los datos.
 * @param payload Objeto de datos a firmar (ej: el carrito de compras)
 * @param secret Clave secreta (Variable de entorno)
 * @param nonce Identificador único de la transacción (para evitar replay attacks)
 */
export const generateSignature = (payload: unknown, secret: string, nonce: string): string => {
  const message = `${JSON.stringify(payload)}:${nonce}`;
  const signature = HmacSHA256(message, secret);
  return Base64.stringify(signature);
};

/**
 * Verifica si una firma recibida es válida.
 */
export const verifySignature = (
  payload: unknown,
  receivedSignature: string,
  secret: string,
  nonce: string
): boolean => {
  const expectedSignature = generateSignature(payload, secret, nonce);
  return expectedSignature === receivedSignature;
};

/**
 * Genera un ID único para la transacción.
 */
export const generateNonce = (): string => {
  return uuidv4();
};
