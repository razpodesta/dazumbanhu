import { HomePage } from '@mobile-store/marketing/feature-home';

// Metadados para SEO (Probando o Manifesto)
export const metadata = {
  title: 'Dázum Banhu | Conserto de Celular e Acessórios em Floripa',
  description: 'A assistência técnica #1 de Florianópolis. Conserto de iPhone em 15 minutos, acessórios premium e entrega grátis na Trindade.',
};

export default function Index() {
  return (
    // Renderizamos diretamente a Feature Home do módulo Marketing
    <HomePage />
  );
}
