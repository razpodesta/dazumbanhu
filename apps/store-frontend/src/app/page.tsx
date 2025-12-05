// apps/store-frontend/src/app/page.tsx
import { HomePage } from '@mobile-store/marketing-feature-home';

/**
 * @page Home Index
 * @description Punto de entrada principal. Delega la lógica a la Feature Library
 * para mantener el patrón DDD y evitar lógica de negocio en la capa de enrutamiento.
 */
export default function Index() {
  return <HomePage />;
}
