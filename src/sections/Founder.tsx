import { Linkedin, Instagram, Mail, Award, Globe } from 'lucide-react';

export default function Founder() {
  return (
    <section id="founder" className="w-full bg-[#0d0f14] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-[480px] mx-auto lg:mx-0 overflow-hidden">
              <div className="absolute -top-3 -left-3 w-full h-full border border-[#c9956b]/20" />
              <img
                src="/images/founder.jpg"
                alt="Lucíria Meury Rodrigues de Sousa"
                className="w-full h-full object-cover relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14]/40 via-transparent to-transparent z-10" />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[#c9956b]" />
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                A Nossa Fundadora
              </span>
            </div>

            <h2 className="font-serif text-[42px] lg:text-[48px] font-normal text-[#f5f0e8] leading-[1.1] mb-1">
              Lucíria Meury
            </h2>
            <h3 className="font-serif text-[28px] lg:text-[32px] font-semibold text-[#c9956b] mb-8">
              Rodrigues de Sousa
            </h3>

            <p className="text-[#8a7e74] font-sans text-[15px] leading-[1.7] mb-6">
              Fundadora e Diretora Executiva da Prime Protocol, Lucíria é uma
              profissional com vasta experiência em protocolo internacional e
              relações institucionais. Com formação em Relações Internacionais e
              especialização em Cerimonial e Protocolo, dedica-se a elevar os
              padrões de excelência no setor de eventos executivos em Angola.
            </p>

            <p className="text-[#6b6560] font-sans text-[14px] leading-[1.7] mb-8">
              A sua visão estratégica e liderança inspiradora têm sido fundamentais
              para o crescimento da Prime Protocol, posicionando a empresa como
              referência em serviços de protocolo no país.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-[#8a7e74]">
                <Award size={16} className="text-[#c9956b]" />
                <span className="text-xs font-sans">15+ Anos de Experiência</span>
              </div>
              <div className="flex items-center gap-2 text-[#8a7e74]">
                <Globe size={16} className="text-[#c9956b]" />
                <span className="text-xs font-sans">Protocolo Internacional</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/luciria-meury-rodrigues-de-sousa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-[#2a2520] flex items-center justify-center text-[#6b6560] hover:text-[#c9956b] hover:border-[#c9956b]/40 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/primeprotocol.ao"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-[#2a2520] flex items-center justify-center text-[#6b6560] hover:text-[#c9956b] hover:border-[#c9956b]/40 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:info@primeprotocol.ao"
                aria-label="Email"
                className="w-10 h-10 border border-[#2a2520] flex items-center justify-center text-[#6b6560] hover:text-[#c9956b] hover:border-[#c9956b]/40 transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
