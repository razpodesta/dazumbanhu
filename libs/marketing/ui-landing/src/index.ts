//libs/marketing/ui-landing/src/index.ts
/**
 * @file index.ts
 * @description API Pública de la librería UI Landing.
 * Expone los componentes orquestadores listos para ser consumidos por la App.
 */

// Navbar System (V2.5 Dual Layer)
export * from './lib/navbar/navbar';
export * from './lib/components/header/top-bar'; // Nuevo componente exportado

// Footer System
export * from './lib/footer/footer';

// Hooks (Opcional, si la app necesita acceso directo a la lógica de búsqueda)
export * from './lib/hooks/use-product-search';
