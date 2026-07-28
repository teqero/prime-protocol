import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0d0f14]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full border border-[#c9956b]/[0.03]" />
      </div>
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNjOTk1NmIiLz48L3N2Zz4=')]" />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9956b]/60 hidden lg:block" />
      {/* Right accent bar */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#c9956b]/20 hidden lg:block" />

      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20 relative z-10 pt-[120px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="py-16 lg:py-24">
            {/* Sector strip */}
            <ScrollReveal delay={0}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-[1px] bg-[#c9956b]" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                  Protocolo Corporativo · Tecnologia · Governo · Eventos Institucionais
                </span>
              </div>
            </ScrollReveal>

            {/* CEO subtitle */}
            <ScrollReveal delay={100}>
              <div className="mb-8">
                <p className="text-[11px] font-sans font-medium text-[#8a7e74] tracking-wide mb-1">
                  Fundadora & CEO
                </p>
                <p className="font-serif text-[22px] font-normal text-[#c9956b]">
                  Luciria Meury Rodrigues de Sousa
                </p>
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal delay={200}>
              <h1 className="font-serif text-[80px] lg:text-[96px] font-semibold text-[#f5f0e8] leading-[0.95] tracking-tight mb-6">
                PRIME
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <h1 className="font-serif text-[80px] lg:text-[96px] font-light text-[#f5f0e8] leading-[0.95] tracking-tight mb-10">
                PROTOCOL
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={400}>
              <p className="text-[#8a7e74] font-sans text-[15px] leading-[1.7] max-w-[520px] mb-10">
                Excelência em protocolo, cerimonial e organização de eventos
                executivos. Transformamos cada ocasião numa experiência
                inesquecível de sofisticação e prestígio.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={500}>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4a87a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,149,107,0.3)]"
                >
                  Solicitar Orçamento
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-[#c9956b]/40 text-[#c9956b] font-sans font-medium text-[11px] tracking-[0.15em] uppercase hover:bg-[#c9956b]/10 hover:border-[#c9956b] transition-all duration-300"
                >
                  Conheça-nos
                </a>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={600}>
              <div className="flex gap-12">
                <div>
                  <span className="font-serif text-[36px] font-semibold text-[#f5f0e8]">
                    <CountUp end={500} suffix="+" />
                  </span>
                  <p className="text-[10px] text-[#8a7e74] font-sans tracking-[0.15em] uppercase mt-1">Eventos Realizados</p>
                </div>
                <div>
                  <span className="font-serif text-[36px] font-semibold text-[#f5f0e8]">
                    <CountUp end={200} suffix="+" />
                  </span>
                  <p className="text-[10px] text-[#8a7e74] font-sans tracking-[0.15em] uppercase mt-1">Clientes Satisfeitos</p>
                </div>
                <div>
                  <span className="font-serif text-[36px] font-semibold text-[#f5f0e8]">
                    <CountUp end={5} />
                  </span>
                  <p className="text-[10px] text-[#8a7e74] font-sans tracking-[0.15em] uppercase mt-1">Anos de Experiência</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image */}
          <ScrollReveal delay={300} direction="scale">
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] aspect-[3/4]">
                {/* Gold border frames */}
                <div className="absolute -inset-3 border border-[#c9956b]/20" />
                <div className="absolute -inset-6 border border-[#c9956b]/10 hidden lg:block" />

                <img
                  src="/images/hero-ceo.png"
                  alt="Luciria Meury Rodrigues de Sousa - Fundadora & CEO"
                  className="w-full h-full object-cover"
                />

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-[#111318] border border-[#2a2520] px-5 py-3 hidden lg:block">
                  <p className="font-serif text-[#c9956b] text-lg font-semibold">Desde 2020</p>
                  <p className="text-[10px] text-[#8a7e74] font-sans tracking-wide">Luanda, Angola</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
