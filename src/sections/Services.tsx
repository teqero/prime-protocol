import { useAppContext } from '../context/AppContext';
import ScrollReveal from '../components/ScrollReveal';
import {
  PartyPopper, Mic, Shield, Building2, Plane, GraduationCap, ArrowRight
} from 'lucide-react';

const serviceList = [
  {
    icon: PartyPopper,
    number: '01',
    key: 'corporate',
    description:
      'Planeamento e execução de cimeiras tecnológicas, conferências executivas e eventos corporativos de alto nível com rigor protocolar internacional.',
  },
  {
    icon: Mic,
    number: '02',
    key: 'ceremonial',
    description:
      'Gestão completa de cerimónias oficiais, discursos institucionais e protocolos de comunicação governamental e corporativa.',
  },
  {
    icon: Shield,
    number: '03',
    key: 'diplomatic',
    description:
      'Coordenação de recepções diplomáticas, visitas de Estado e eventos internacionais com total conformidade protocolar.',
  },
  {
    icon: Building2,
    number: '04',
    key: 'government',
    description:
      'Organização de cerimónias governamentais, encontros ministeriais e eventos de Estado com discrição e excelência.',
  },
  {
    icon: Plane,
    number: '05',
    key: 'consulting',
    description:
      'Assessoria especializada em etiqueta internacional, normas protocolares e gestão de imagem institucional.',
  },
  {
    icon: GraduationCap,
    number: '06',
    key: 'training',
    description:
      'Programas de capacitação em protocolo corporativo, etiqueta diplomática e cerimonial executivo para equipas e instituições.',
  },
];

function scrollToContact() {
  const el = document.getElementById('contact');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Services() {
  const { t, theme } = useAppContext();
  const isDark = theme === 'dark';

  return (
    <section id="services" className="w-full py-24 lg:py-32"
             style={{ backgroundColor: 'var(--pp-bg-2)' }}>
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#c9956b]" />
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                {t('services.label')}
              </span>
              <div className="w-12 h-[1px] bg-[#c9956b]" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-serif text-[48px] lg:text-[56px] font-normal leading-[1.1] mb-4"
                style={{ color: 'var(--pp-text)' }}>
              {t('services.title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-[#6b6560] font-sans text-[13px] leading-relaxed max-w-[700px] mx-auto mb-6">
              {t('services.subtitle')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="w-[60px] h-[1px] bg-[#c9956b] mx-auto" />
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-[1px] bg-[#2a2520]/30">
          {serviceList.map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 100} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="p-10 lg:p-12 group transition-all duration-500 h-full flex flex-col"
                   style={{ backgroundColor: 'var(--pp-bg-2)' }}
                   onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isDark ? '#0d0f14' : '#ece6da'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--pp-bg-2)'; }}>
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[10px] font-sans text-[#c9956b] tracking-[0.2em]">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 bg-[#c9956b]/10 flex items-center justify-center group-hover:bg-[#c9956b]/20 transition-colors">
                    <service.icon size={18} className="text-[#c9956b]" />
                  </div>
                </div>

                <h3 className="font-serif text-[24px] lg:text-[28px] font-semibold leading-[1.2] mb-4 group-hover:text-[#c9956b] transition-colors duration-300"
                    style={{ color: 'var(--pp-text)' }}>
                  {t(`contact.services.${service.key}`)}
                </h3>

                <p className="text-[#6b6560] font-sans text-[13px] leading-[1.7] mb-6 flex-1">
                  {service.description}
                </p>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 text-[#c9956b] font-sans text-[11px] tracking-[0.1em] uppercase group-hover:gap-3 transition-all duration-300 bg-transparent border-none cursor-pointer self-start"
                >
                  {t('hero.cta1')}
                  <ArrowRight size={14} />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
