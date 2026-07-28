import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="w-full bg-[#0d0f14] py-16 md:py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <ScrollReveal>
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#c9956b]" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                  A Nossa Essência
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[52px] font-normal text-[#f5f0e8] leading-[1.1] mb-8">
                Sobre a Prime Protocol
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="w-20 h-[1px] bg-[#c9956b] mb-8" />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-[#8a7e74] font-sans text-[15px] md:text-[16px] leading-[1.7] mb-6">
                A Prime Protocol é uma firma especializada em protocolo corporativo, cerimonial diplomático e organização de eventos institucionais, fundada para servir o mercado angolano com os mais elevados padrões internacionais.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-[#6b6560] font-sans text-[13px] md:text-[14px] leading-[1.7] mb-10">
                Servimos empresas de tecnologia, ministérios governamentais, embaixadas, organismos internacionais e grandes corporações. Cada evento — seja uma cimeira tecnológica, uma cerimónia de Estado, uma receção diplomática ou um encontro ministerial — é executado com rigor absoluto, discrição e mestria protocolar de nível mundial.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {['Cimeiras Tecnológicas', 'Cerimónias de Estado', 'Receções Diplomáticas', 'Eventos Corporativos'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 border border-[#2a2520] text-[#8a7e74] font-sans text-[10px] tracking-wide hover:border-[#c9956b]/40 hover:text-[#c9956b] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image */}
          <ScrollReveal delay={200} direction="right">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Decorative border */}
                <div className="absolute -top-3 -left-3 w-full h-full border border-[#c9956b]/20" />
                <img
                  src="/images/about.jpg"
                  alt="Evento Corporativo Prime Protocol"
                  className="w-full h-full object-cover relative z-10"
                />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0d0f14]/60 backdrop-blur-sm px-6 py-4">
                <p className="text-[10px] font-sans text-[#c9956b] tracking-wide mb-1">
                  Evento Corporativo · Luanda
                </p>
                <p className="font-serif text-[14px] md:text-[16px] text-[#f5f0e8] font-normal">
                  Excelência em cada detalhe institucional
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
