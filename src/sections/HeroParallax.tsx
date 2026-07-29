import { useRef, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ScrollReveal from '../components/ScrollReveal';
import Particles from '../components/Particles';
import Typewriter from '../components/Typewriter';
import { useSiteContent } from '../hooks/useSiteContent';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HeroParallax() {
  const { t, theme } = useAppContext();
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { content } = useSiteContent('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titlePrime = content.title_prime || t('hero.title1');
  const titleProtocol = content.title_protocol || t('hero.title2');
  const ceoLabel = content.ceo_label || t('hero.founder');
  const ceoName = content.ceo_name || t('hero.name');
  const tagline = content.tagline || t('hero.sector');
  const description = content.description || t('hero.desc');
  const ctaPrimary = content.cta_primary || t('hero.ctaPrimary');
  const ctaSecondary = content.cta_secondary || t('hero.ctaSecondary');
  const stat1Val = content.stat_1_value || '50+';
  const stat1Lbl = content.stat_1_label || t('hero.stats.events');
  const stat2Val = content.stat_2_value || 'Gov';
  const stat2Lbl = content.stat_2_label || t('hero.stats.clients');
  const stat3Val = content.stat_3_value || 'AOA';
  const stat3Lbl = content.stat_3_label || t('hero.badge.location');

  const badgeKeys = ['ceremonial', 'protocol', 'diplomatic', 'corporate', 'state'] as const;
  const badges = badgeKeys.map((k) => content[`badge_${k}`] || t(`hero.badge.${k}`));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--pp-bg)' }}
    >
      {/* Parallax background layers */}
      <div className="absolute inset-0 z-[0]" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full border border-[#c9956b]/[0.03]" />
        <div className="absolute bottom-40 left-10 w-[400px] h-[400px] rounded-full border border-[#c9956b]/[0.02]" />
      </div>

      <Particles />

      {/* Grid pattern */}
      <div className="absolute inset-0 z-[0] opacity-[0.015]" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNjOTk1NmIiLz48L3N2Zz4=')]" />
      </div>

      {/* Accent bars */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9956b]/60 hidden lg:block z-[5]" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#c9956b]/20 hidden lg:block z-[5]" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 relative z-10 pt-[100px] md:pt-[120px]">
        {/* Desktop: texto esquerda, foto direita. Mobile: foto topo, texto baixo */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-120px)]">
          
          {/* LEFT COLUMN — Text Content */}
          <div className="py-12 lg:py-24">
            <ScrollReveal delay={0}>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <div className="w-10 h-[1px] bg-[#c9956b]" />
                <span className="text-[9px] md:text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                  {tagline}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-serif text-[56px] md:text-[72px] lg:text-[88px] font-semibold leading-[0.95] tracking-tight mb-2"
                  style={{ color: 'var(--pp-text)' }}>
                {titlePrime}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1 className="font-serif text-[56px] md:text-[72px] lg:text-[88px] font-light leading-[0.95] tracking-tight mb-8 md:mb-10"
                  style={{ color: 'var(--pp-text)' }}>
                {titleProtocol}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mb-6">
                <p className="text-[10px] md:text-[11px] font-sans font-medium text-[#8a7e74] tracking-wide mb-1">
                  {ceoLabel}
                </p>
                <p className="font-serif text-[18px] md:text-[22px] font-normal text-[#c9956b]">
                  {ceoName}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-[#8a7e74] font-sans text-[14px] md:text-[15px] leading-[1.7] max-w-[520px] mb-8 md:mb-10 min-h-[52px]">
                <Typewriter
                  texts={[
                    description,
                    t('hero.desc'),
                    'Eventos executivos com sofisticação e prestígio.',
                    'Consultoria de protocolo para governos e empresas.',
                  ]}
                  speed={70}
                  deleteSpeed={35}
                  pause={2500}
                />
              </p>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-16">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4a87a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,149,107,0.3)] cursor-pointer border-none"
                >
                  {ctaPrimary}
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 border border-[#c9956b]/40 text-[#c9956b] font-sans font-medium text-[11px] tracking-[0.15em] uppercase hover:bg-[#c9956b]/10 hover:border-[#c9956b] transition-all duration-300 cursor-pointer bg-transparent"
                >
                  {ctaSecondary}
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="flex gap-6 md:gap-10 items-start">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-[24px] md:text-[28px] font-semibold"
                        style={{ color: 'var(--pp-text)' }}>{stat1Val}</span>
                  <p className="text-[9px] md:text-[10px] text-[#8a7e74] font-sans tracking-[0.1em] uppercase leading-tight">{stat1Lbl}</p>
                </div>
                <div className="w-px h-8 bg-[#2a2520]" />
                <div className="flex items-center gap-3">
                  <span className="font-serif text-[24px] md:text-[28px] font-semibold"
                        style={{ color: 'var(--pp-text)' }}>{stat2Val}</span>
                  <p className="text-[9px] md:text-[10px] text-[#8a7e74] font-sans tracking-[0.1em] uppercase leading-tight">{stat2Lbl}</p>
                </div>
                <div className="w-px h-8 bg-[#2a2520] hidden sm:block" />
                <div className="hidden sm:flex items-center gap-3">
                  <span className="font-serif text-[24px] md:text-[28px] font-semibold"
                        style={{ color: 'var(--pp-text)' }}>{stat3Val}</span>
                  <p className="text-[9px] md:text-[10px] text-[#8a7e74] font-sans tracking-[0.1em] uppercase leading-tight">{stat3Lbl}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN — CEO Photo */}
          <ScrollReveal delay={300} direction="scale">
            <div
              className="relative flex justify-center lg:justify-end"
              style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
            >
              <div className="relative w-full max-w-[380px] md:max-w-[480px] aspect-[3/4]">
                <div className="absolute -inset-3 border border-[#c9956b]/20" />
                <div className="absolute -inset-6 border border-[#c9956b]/10 hidden lg:block" />
                <img
                  src="/images/ceo-figma.png"
                  alt={t('hero.name')}
                  className="w-full h-full object-cover relative z-10"
                />
                <div className="absolute -bottom-4 -left-4 border px-5 py-4 z-20 max-w-[220px]"
                     style={{ backgroundColor: 'var(--pp-bg-2)', borderColor: 'var(--pp-border)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/images/emblem-figma.png" alt="" className="w-8 h-8 object-contain opacity-60" />
                    <span className="font-serif text-[#c9956b] text-sm font-semibold">{stat3Val}</span>
                  </div>
                  <p className="text-[10px] text-[#8a7e74] font-sans tracking-wide">{stat3Lbl}</p>
                  <p className="text-[9px] text-[#6b6560] font-sans mt-1 leading-relaxed">
                    Protocolo institucional e diplomático de elite para Angola e além-fronteiras.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Hero footer badges */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#2a2520]/30 backdrop-blur-sm"
           style={{ backgroundColor: isDark ? 'rgba(13,15,20,0.8)' : 'rgba(245,240,232,0.8)' }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#c9956b]/40 hidden md:block" />}
                <span className="text-[10px] font-sans text-[#6b6560] tracking-[0.1em] uppercase">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
