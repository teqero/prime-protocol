export default function Partners() {
  const partners = [
    'Sonangol', 'BFA', 'Unitel', 'BPC', 'TAAG',
    'Ministério das Finanças', 'Embaixada de Portugal', 'TotalEnergies',
  ];

  return (
    <section id="partners" className="w-full bg-[#111318] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#c9956b]" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
              Parcerias
            </span>
            <div className="w-12 h-[1px] bg-[#c9956b]" />
          </div>
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1]">
            Parceiros & <span className="font-semibold">Clientes de Confiança</span>
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#2a2520]/30">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="bg-[#111318] p-8 flex items-center justify-center group hover:bg-[#0d0f14] transition-colors"
            >
              <span className="font-sans text-sm font-medium text-[#6b6560] group-hover:text-[#8a7e74] transition-colors tracking-wide">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
