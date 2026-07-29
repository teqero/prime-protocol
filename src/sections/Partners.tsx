import { useAppContext } from '../context/AppContext';

export default function Partners() {
  const { t, theme } = useAppContext();
  const partners = [
    'Sonangol', 'BFA', 'Unitel', 'BPC', 'TAAG',
    'Ministério das Finanças', 'Embaixada de Portugal', 'TotalEnergies',
  ];

  return (
    <section id="partners" className="w-full py-24 lg:py-32"
             style={{ backgroundColor: 'var(--pp-bg-2)' }}>
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
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal leading-[1.1]"
              style={{ color: 'var(--pp-text)' }}>
            Parceiros & <span className="font-semibold">Clientes de Confiança</span>
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px]"
             style={{ backgroundColor: 'var(--pp-border)' }}>
          {partners.map((partner, i) => (
            <div
              key={i}
              className="p-8 flex items-center justify-center group transition-colors"
              style={{ backgroundColor: 'var(--pp-bg-2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--pp-bg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--pp-bg-2)'; }}
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
