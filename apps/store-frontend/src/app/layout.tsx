import './global.css';
import { Inter, Outfit, Caveat } from 'next/font/google';
import { ThemeProvider } from 'next-themes'; // Necesitarás instalarlo si no está
import { cn } from '@mobile-store/shared-ui-kit';

// 1. Configuración de Fuentes Optimizadas
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap'
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap'
});

export const metadata = {
  title: 'Dázum Banhu | Assistência Técnica Premium',
  description: 'Você merece o melhor da tecnologia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Inyectamos las variables CSS de las fuentes en el HTML
    <html lang="pt-BR" suppressHydrationWarning className={cn(
      inter.variable,
      outfit.variable,
      caveat.variable
    )}>
      <body>
        {/* Provider para Dark Mode (System preference default) */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
