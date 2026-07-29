import { useAppContext } from '../context/AppContext';
import { Check } from 'lucide-react';

const reasons = [
  'Experiência comprovada em eventos de alto nível',
  'Equipa multidisciplinar e altamente qualificada',
  'Atendimento personalizado e dedicado',
  'Rede de parceiros de excelência',
  'Compromisso com prazos e orçamentos',
  'Confidencialidade e discrição absolutas',
];

export default function WhyChoose() {
  const { t, theme } = useAppContext();

  return (
    <section id="whychoose" className="w-full py-24 lg:py-32"
             style={{ backgroundColor: 'var(--pp-bg)' }}>
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[#c9956b]" />
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                Por Que Escolher
              </span>
            </div>

            <h2 className="font-serif text-[48px] lg:text-[52px] font-normal leading-[1.1] mb-8"
                style={{ color: 'var(--pp-text)' }}>
              A Prime
              <span className="block font-semibold">Protocol?</span>
            </h2>

            <p className="text-[#8a7e74] font-sans text-[15px] leading-[1.7] mb-10">
              Escolher a Prime Protocol significa optar pela excelência, pela
              dedicação e por uma equipa que coloca o seu evento no centro de tudo.
              Somos mais do que uma empresa de protocolo — somos parceiros no seu
              sucesso.
            </p>

            <ul className="space-y-4 mb-10">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#c9956b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-[#c9956b]" />
                  </div>
                  <span className="text-[#8a7e74] font-sans text-[14px]">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden">
              <div className="absolute -top-3 -right-3 w-full h-full border border-[#c9956b]/20" />
              <img
                src="/images/gallery-3.jpg"
                alt="Evento Prime Protocol"
                className="w-full h-full object-cover relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14]/60 via-transparent to-transparent z-10" />
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20 grid grid-cols-2 gap-4">
              <div className="backdrop-blur-sm border p-4"
                   style={{ backgroundColor: 'rgba(13,15,20,0.8)', borderColor: 'var(--pp-border)' }}>
                <p className="font-serif text-[28px] font-semibold text-[#c9956b]">98%</p>
                <p className="text-[10px] text-[#8a7e74] font-sans tracking-wide uppercase">Taxa de Satisfação</p>
              </div>
              <div className="backdrop-blur-sm border p-4"
                   style={{ backgroundColor: 'rgba(13,15,20,0.8)', borderColor: 'var(--pp-border)' }}>
                <p className="font-serif text-[28px] font-semibold text-[#c9956b]">50+</p>
                <p className="text-[10px] text-[#8a7e74] font-sans tracking-wide uppercase">Parceiros Globais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
