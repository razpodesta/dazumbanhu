import { Wrench, Truck, ShieldCheck, Timer } from 'lucide-react';

const features = [
  {
    icon: Timer,
    title: 'Conserto em 15 min',
    desc: 'Troca de tela e bateria express enquanto você toma um café.'
  },
  {
    icon: Truck,
    title: 'Busca e Entrega',
    desc: 'Delivery grátis para consertos em toda Trindade e região.'
  },
  {
    icon: ShieldCheck,
    title: 'Garantia Premium',
    desc: '4 meses de garantia em serviços e 1 ano em produtos selecionados.'
  },
  {
    icon: Wrench,
    title: 'Peças Originais',
    desc: 'Qualidade máxima para manter seu iPhone valorizado.'
  }
];

export function ServicesGrid() {
  return (
    <section id="servicos" className="bg-zinc-950 py-20 text-white">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Por que somos a <span className="text-teal-400">#1 de Floripa?</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-teal-500/10">
              <div className="mb-4 inline-flex rounded-2xl bg-teal-500/20 p-4 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <f.icon size={32} />
              </div>
              <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
