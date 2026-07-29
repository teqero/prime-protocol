import { useAppContext } from '../context/AppContext';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  const { t, theme } = useAppContext();
  const isDark = theme === 'dark';

  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32"
             style={{ backgroundColor: 'var(--pp-bg)' }}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <ScrollReveal>
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#c9956b]" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                  {t('about.label')}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[52px] font-normal leading-[1.1] mb-8"
                  style={{ color: 'var(--pp-text)' }}>
                {t('about.title')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="w-20 h-[1px] bg-[#c9956b] mb-8" />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-[#8a7e74] font-sans text-[15px] md:text-[16px] leading-[1.7] mb-6">
                {t('about.p1')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-[#6b6560] font-sans text-[13px] md:text-[14px] leading-[1.7] mb-10">
                {t('about.p2')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {['Cimeiras Tecnológicas', 'Cerimónias de Estado', 'Receções Diplomáticas', 'Eventos Corporativos'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 border text-[#8a7e74] font-sans text-[10px] tracking-wide hover:border-[#c9956b]/40 hover:text-[#c9956b] transition-colors cursor-default"
                    style={{ borderColor: 'var(--pp-border)' }}
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
              <div className="absolute bottom-0 left-0 right-0 z-20 backdrop-blur-sm px-6 py-4"
                   style={{ backgroundColor: isDark ? 'rgba(13,15,20,0.6)' : 'rgba(245,240,232,0.6)' }}>
                <p className="text-[10px] font-sans text-[#c9956b] tracking-wide mb-1">
                  {t('about.caption.label')}
                </p>
                <p className="font-serif text-[14px] md:text-[16px] font-normal"
                   style={{ color: 'var(--pp-text)' }}>
                  {t('about.caption.text')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
