import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. António Silva',
    role: 'Embaixador',
    text: 'A Prime Protocol demonstrou um nível de profissionalismo excecional na organização do nosso evento diplomático. Cada detalhe foi cuidadosamente planeado e executado com perfeição.',
  },
  {
    name: 'Eng. Maria Fernandes',
    role: 'Diretora Executiva',
    text: 'Trabalhar com a Prime Protocol foi uma experiência transformadora. A sua capacidade de entender as nossas necessidades e superar expectativas é verdadeiramente notável.',
  },
  {
    name: 'Dr. Pedro dos Santos',
    role: 'Ministro',
    text: 'Recomendo vivamente os serviços da Prime Protocol. A sua equipa garantiu que o nosso evento governamental decorreu sem qualquer contratempo, com elegância e sofisticação.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-[#0d0f14] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#c9956b]" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
              Testemunhos
            </span>
            <div className="w-12 h-[1px] bg-[#c9956b]" />
          </div>
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1]">
            O Que Dizem os <span className="font-semibold">Nossos Clientes</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#111318] border border-[#2a2520]/40 p-10 relative"
            >
              <Quote size={32} className="text-[#c9956b]/20 mb-6" />
              <p className="text-[#8a7e74] font-sans leading-[1.7] mb-8 text-[14px]">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9956b]/10 flex items-center justify-center">
                  <span className="font-serif text-sm text-[#c9956b] font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-serif text-base font-semibold text-[#f5f0e8]">{t.name}</p>
                  <p className="text-[11px] text-[#6b6560] font-sans">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
