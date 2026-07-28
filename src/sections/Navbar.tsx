import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Serviços', href: '#services' },
  { label: 'Fundadora', href: '#founder' },
  { label: 'Contactos', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0d0f14]/95 backdrop-blur-md border-b border-[#2a2520]/40'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        <nav className="flex items-center justify-between h-[120px]">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-16 h-16 rounded-full border border-[#c9956b]/40 flex items-center justify-center">
              <Logo size={44} />
            </div>
            <div>
              <span className="font-serif text-[22px] font-semibold text-[#f5f0e8] tracking-[0.1em] uppercase">
                PRIME PROTOCOL
              </span>
              <span className="block text-[9px] text-[#c9956b] font-sans tracking-[0.2em] uppercase -mt-0.5">
                Angola · Since 2020
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[11px] font-sans font-medium tracking-[0.15em] uppercase text-[#b8b0a4] hover:text-[#f5f0e8] transition-colors duration-300"
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
                className="inline-flex items-center justify-center px-7 py-2.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-wider uppercase hover:bg-[#d4a87a] transition-all duration-300"
              >
                Agendar
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#f5f0e8]"
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
        <div className="w-full max-w-[1440px] mx-auto px-10 pb-8 pt-4 border-t border-[#2a2520]/30 bg-[#0d0f14]/95 backdrop-blur-md">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-sans font-medium tracking-[0.15em] uppercase text-[#b8b0a4] hover:text-[#f5f0e8] transition-colors py-2"
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
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center px-7 py-2.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-wider uppercase hover:bg-[#d4a87a] transition-all mt-6 w-full"
          >
            Agendar
          </a>
        </div>
      </div>
    </header>
  );
}
