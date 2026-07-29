import { useAppContext } from '../context/AppContext';
import ScrollReveal from '../components/ScrollReveal';
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
  const { t, theme } = useAppContext();

  return (
    <section id="testimonials" className="w-full py-24 lg:py-32"
             style={{ backgroundColor: 'var(--pp-bg)' }}>
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#c9956b]" />
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                Testemunhos
              </span>
              <div className="w-12 h-[1px] bg-[#c9956b]" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-serif text-[48px] lg:text-[56px] font-normal leading-[1.1]"
                style={{ color: 'var(--pp-text)' }}>
              O Que Dizem os <span className="font-semibold">Nossos Clientes</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <ScrollReveal key={i} delay={i * 150} direction="up">
              <div className="border p-10 relative group hover:border-[#c9956b]/20 transition-colors duration-500 h-full"
                   style={{ backgroundColor: 'var(--pp-bg-2)', borderColor: 'var(--pp-border)' }}>
                <Quote size={32} className="text-[#c9956b]/20 mb-6 group-hover:text-[#c9956b]/30 transition-colors" />
                <p className="text-[#8a7e74] font-sans leading-[1.7] mb-8 text-[14px]">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9956b]/10 flex items-center justify-center">
                    <span className="font-serif text-sm text-[#c9956b] font-semibold">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-serif text-base font-semibold"
                       style={{ color: 'var(--pp-text)' }}>{item.name}</p>
                    <p className="text-[11px] text-[#6b6560] font-sans">{item.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
