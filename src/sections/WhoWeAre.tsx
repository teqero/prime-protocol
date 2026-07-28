export default function WhoWeAre() {
  return (
    <section id="whoweare" className="w-full bg-[#111318] py-16 md:py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden">
              {/* Decorative border offset */}
              <div className="absolute -top-3 -left-3 w-full h-full border border-[#c9956b]/20" />
              <img
                src="/images/whoweare.jpg"
                alt="Receção Diplomática Prime Protocol"
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            {/* Tag */}
            <div className="absolute bottom-6 left-6 z-20 bg-[#c9956b] px-5 py-2">
              <p className="text-[9px] font-sans font-semibold text-[#0d0f14] tracking-[0.15em] uppercase">
                Receção Diplomática · Angola
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[#c9956b]" />
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                Compromisso & Trajetória
              </span>
            </div>

            <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[52px] font-normal text-[#f5f0e8] leading-[1.1] mb-8">
              Quem Somos
            </h2>

            <div className="w-20 h-[1px] bg-[#c9956b] mb-8" />

            <p className="text-[#8a7e74] font-sans text-[15px] md:text-[16px] leading-[1.7] mb-6">
              A Prime Protocol nasceu da paixão pela ordem, pela precisão e pelo compromisso inabalável com a excelência protocolar em Angola e a nível internacional.
            </p>

            <p className="text-[#6b6560] font-sans text-[13px] md:text-[14px] leading-[1.7] mb-10">
              Sob a liderança da sua fundadora e CEO, Lucíria Meury Rodrigues de Sousa, a Prime Protocol serve ministérios, embaixadas, corporações tecnológicas e organismos internacionais — transformando cada cerimónia, cada cimeira e cada evento de Estado numa demonstração de sofisticação e rigor absolutos.
            </p>

            {/* Quote box */}
            <div className="bg-[#16181d] p-6 md:p-8 border-l-2 border-[#c9956b]">
              <p className="text-[11px] md:text-[12px] font-serif font-semibold text-[#c9956b] tracking-wide uppercase mb-4">
                Declaração de Missão
              </p>
              <p className="font-serif text-[18px] md:text-[20px] lg:text-[22px] text-[#f5f0e8] font-normal leading-[1.5]">
                "Garantimos que a identidade e a dignidade das instituições que servimos sejam perpetuadas com absoluta precisão e delicadeza em cada momento formal."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
