import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowUp, X } from 'lucide-react';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/prime-protocol-ao', abbr: 'in' },
  { label: 'Instagram', href: 'https://www.instagram.com/primeprotocol.ao', abbr: 'ig' },
  { label: 'Facebook', href: 'https://www.facebook.com/primeprotocol.ao', abbr: 'fb' },
];

function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Footer() {
  const { t, theme } = useAppContext();
  const isDark = theme === 'dark';
  const [comingSoon, setComingSoon] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = [
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '#about', scroll: true },
        { label: t('footer.team'), href: '#founder', scroll: true },
        { label: t('footer.services'), href: '#services', scroll: true },
        { label: t('footer.contact'), href: '#contact', scroll: true },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { label: t('footer.corpEvents'), href: '#services', scroll: true },
        { label: t('footer.ceremonial'), href: '#services', scroll: true },
        { label: t('footer.diplomatic'), href: '#services', scroll: true },
        { label: t('footer.training'), href: '#services', scroll: true },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.terms'), href: '#', legal: true },
        { label: t('footer.privacy'), href: '#', legal: true },
        { label: t('footer.cookies'), href: '#', legal: true },
      ],
    },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: { href: string; scroll?: boolean; legal?: boolean }) => {
    if (link.legal) {
      e.preventDefault();
      setComingSoon(true);
      setTimeout(() => setComingSoon(false), 2500);
    } else if (link.scroll) {
      e.preventDefault();
      scrollToSection(link.href);
    }
  };

  return (
    <footer className="w-full border-t relative"
            style={{ backgroundColor: 'var(--pp-bg)', borderColor: 'var(--pp-border)' }}>
      {/* Coming Soon Toast */}
      {comingSoon && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-[#c9956b] text-[#0d0f14] px-6 py-3 font-sans text-sm font-semibold tracking-wide shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-3">
          <span>{t('footer.soon')}</span>
          <button onClick={() => setComingSoon(false)} className="hover:opacity-70">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-12 lg:mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-[#c9956b]/40 flex items-center justify-center">
                <img src="/images/logo-icon-120.png" alt="Prime Protocol" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-serif text-lg font-semibold tracking-wide uppercase"
                    style={{ color: 'var(--pp-text)' }}>
                Prime Protocol
              </span>
            </div>
            <p className="text-[#6b6560] font-sans text-[13px] leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 border border-[#2a2520] flex items-center justify-center text-[#6b6560] hover:text-[#c9956b] hover:border-[#c9956b]/40 transition-all text-[10px] font-sans font-semibold uppercase"
                >
                  {social.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-serif text-[13px] font-semibold uppercase tracking-[0.1em] mb-6"
                  style={{ color: 'var(--pp-text)' }}>
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="text-[#6b6560] font-sans text-[13px] hover:text-[#c9956b] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#2a2520]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6b6560] font-sans text-[11px]">
            © {new Date().getFullYear()} Prime Protocol. {t('footer.rights')}
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-[#2a2520] flex items-center justify-center text-[#6b6560] hover:text-[#c9956b] hover:border-[#c9956b]/40 transition-all"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
