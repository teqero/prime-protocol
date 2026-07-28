import ScrollReveal from '../components/ScrollReveal';
import {
  PartyPopper, Mic, Shield, Building2, Plane, GraduationCap
} from 'lucide-react';

const services = [
  {
    icon: PartyPopper,
    number: '01',
    title: 'Organização de Cimeiras e Eventos Corporativos',
    description:
      'Planeamento e execução de cimeiras tecnológicas, conferências executivas e eventos corporativos de alto nível com rigor protocolar internacional.',
  },
  {
    icon: Mic,
    number: '02',
    title: 'Cerimonial & Comunicação Institucional',
    description:
      'Gestão completa de cerimónias oficiais, discursos institucionais e protocolos de comunicação governamental e corporativa.',
  },
  {
    icon: Shield,
    number: '03',
    title: 'Protocolo Diplomático & Relações Internacionais',
    description:
      'Coordenação de recepções diplomáticas, visitas de Estado e eventos internacionais com total conformidade protocolar.',
  },
  {
    icon: Building2,
    number: '04',
    title: 'Eventos Governamentais e de Estado',
    description:
      'Organização de cerimónias governamentais, encontros ministeriais e eventos de Estado com discrição e excelência.',
  },
  {
    icon: Plane,
    number: '05',
    title: 'Consultoria Estratégica em Protocolo',
    description:
      'Assessoria especializada em etiqueta internacional, normas protocolares e gestão de imagem institucional.',
  },
  {
    icon: GraduationCap,
    number: '06',
    title: 'Formação em Protocolo & Etiqueta',
    description:
      'Programas de capacitação em protocolo corporativo, etiqueta diplomática e cerimonial executivo para equipas e instituições.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full bg-[#111318] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#c9956b]" />
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                Capacidades de Nível Mundial
              </span>
              <div className="w-12 h-[1px] bg-[#c9956b]" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-serif text-[48px] lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1] mb-4">
              Os Nossos Serviços
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-[#6b6560] font-sans text-[13px] leading-relaxed max-w-[700px] mx-auto mb-6">
              Soluções protocolares de elite para os sectores mais exigentes — governo, diplomacia, tecnologia e empresa.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="w-[60px] h-[1px] bg-[#c9956b] mx-auto" />
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-[1px] bg-[#2a2520]/30">
          {services.map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 100} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="bg-[#111318] p-10 lg:p-12 group hover:bg-[#0d0f14] transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[10px] font-sans text-[#c9956b] tracking-[0.2em]">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 bg-[#c9956b]/10 flex items-center justify-center group-hover:bg-[#c9956b]/20 transition-colors">
                    <service.icon size={18} className="text-[#c9956b]" />
                  </div>
                </div>

                <h3 className="font-serif text-[24px] lg:text-[28px] font-semibold text-[#f5f0e8] leading-[1.2] mb-4 group-hover:text-[#c9956b] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-[#6b6560] font-sans text-[13px] leading-[1.7]">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
