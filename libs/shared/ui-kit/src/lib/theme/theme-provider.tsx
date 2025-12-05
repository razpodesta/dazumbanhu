'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

/**
 * @component ThemeProvider
 * @description Wrapper de infraestructura para manejar el contexto de tema (Light/Dark).
 * Utiliza 'next-themes' para inyectar la clase '.dark' en el elemento <html>.
 *
 * @integration Tailwind v4: Funciona en conjunto con '@custom-variant dark' en CSS.
 * @boundary Client Component
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
