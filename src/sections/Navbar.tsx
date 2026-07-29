import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';

function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Navbar() {
  const { t, theme } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileOpen(false);
  };

  const navLinks = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.founder'), href: '#founder' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-[#0d0f14]/95 backdrop-blur-md border-b border-[#2a2520]/40'
            : 'bg-[#f5f0e8]/95 backdrop-blur-md border-b border-[#d4cbbf]/40'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        <nav className="flex items-center justify-between h-[120px]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-16 h-16 rounded-full border border-[#c9956b]/40 flex items-center justify-center overflow-hidden">
              <img src="/images/logo-icon-120.png" alt="Prime Protocol" className="w-14 h-14 object-contain" />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-[11px] font-sans font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                      isDark
                        ? 'text-[#b8b0a4] hover:text-[#f5f0e8]'
                        : 'text-[#5c5348] hover:text-[#1a1a1a]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center justify-center px-7 py-2.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-wider uppercase hover:bg-[#d4a87a] transition-all duration-300"
              >
                {t('nav.schedule')}
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center ${isDark ? 'text-[#f5f0e8]' : 'text-[#1a1a1a]'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`w-full max-w-[1440px] mx-auto px-10 pb-8 pt-4 border-t backdrop-blur-md ${
            isDark
              ? 'border-[#2a2520]/30 bg-[#0d0f14]/95'
              : 'border-[#d4cbbf]/30 bg-[#f5f0e8]/95'
          }`}
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block text-sm font-sans font-medium tracking-[0.15em] uppercase transition-colors py-2 ${
                    isDark
                      ? 'text-[#b8b0a4] hover:text-[#f5f0e8]'
                      : 'text-[#5c5348] hover:text-[#1a1a1a]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#2a2520]/30">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center justify-center px-7 py-2.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-wider uppercase hover:bg-[#d4a87a] transition-all mt-6 w-full"
          >
            {t('nav.schedule')}
          </a>
        </div>
      </div>
    </header>
  );
}
