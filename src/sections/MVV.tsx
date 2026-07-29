import { useAppContext } from '../context/AppContext';
import { Target, Eye, Heart } from 'lucide-react';

export default function MVV() {
  const { t, theme } = useAppContext();
  const isDark = theme === 'dark';

  const cards = [
    {
      icon: Target,
      title: 'Missão',
      description:
        'Prestar serviços de protocolo, cerimonial diplomático e organização de eventos institucionais com padrões de excelência internacional — servindo empresas tecnológicas, ministérios governamentais, embaixadas e instituições de relevo no mercado angolano e além-fronteiras.',
    },
    {
      icon: Eye,
      title: 'Visão',
      description:
        'Ser a referência africana em protocolo corporativo e cerimonial diplomático — reconhecida pela excelência, rigor e impacto positivo em cada evento de Estado, cimeira tecnológica e receção diplomática realizada em território angolano e na comunidade CPLP.',
    },
    {
      icon: Heart,
      title: 'Valores',
      description: null,
      list: [
        'Excelência em cada detalhe',
        'Rigor protocolar absoluto',
        'Discrição e confidencialidade',
        'Inovação constante',
        'Compromisso com o cliente',
      ],
    },
  ];

  return (
    <section id="mvv" className="w-full py-24 lg:py-32 relative overflow-hidden"
             style={{ backgroundColor: 'var(--pp-bg)' }}>
      {/* Background seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <img src="/images/logo.png" alt="" className="w-[320px] h-[320px] object-contain" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#c9956b]" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
              Os Nossos Pilares Institucionais
            </span>
            <div className="w-12 h-[1px] bg-[#c9956b]" />
          </div>
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal leading-[1.1] mb-4"
              style={{ color: 'var(--pp-text)' }}>
            Missão, Visão & Valores
          </h2>
          <p className="text-[#6b6560] font-sans text-[13px] leading-relaxed max-w-[700px] mx-auto mb-6">
            Os princípios que norteiam a nossa conduta protocolar e definem o nosso compromisso com Angola e o mundo.
          </p>
          <div className="w-[60px] h-[1px] bg-[#c9956b] mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-0">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`p-10 lg:p-12 border relative group ${i === 2 ? '' : 'border-r-0'}`}
              style={{ 
                backgroundColor: i === 2 ? '#c9956b' : 'var(--pp-bg-2)', 
                borderColor: 'var(--pp-border)' 
              }}
            >
              {/* Top accent */}
              <div className="flex items-center justify-between mb-8">
                <h3 className={`font-serif text-[28px] font-semibold ${i === 2 ? 'text-[#0d0f14]' : ''}`}
                    style={{ color: i === 2 ? undefined : 'var(--pp-text)' }}>
                  {card.title}
                </h3>
                <div className={`w-10 h-10 flex items-center justify-center ${i === 2 ? 'bg-[#0d0f14]/20' : 'bg-[#c9956b]/10'}`}>
                  <card.icon size={20} className={i === 2 ? 'text-[#0d0f14]' : 'text-[#c9956b]'} />
                </div>
              </div>

              {card.description && (
                <p className="font-sans text-[14px] leading-[1.7]"
                   style={{ color: i === 2 ? '#3d2e20' : '#8a7e74' }}>
                  {card.description}
                </p>
              )}

              {card.list && (
                <ul className="space-y-3">
                  {card.list.map((item, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#0d0f14]" />
                      <span className="text-[#3d2e20] font-sans text-[13px]">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
