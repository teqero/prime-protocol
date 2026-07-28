import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 border border-[#2a2520] flex items-center justify-center text-[#8a7e74] hover:text-[#c9956b] hover:border-[#c9956b]/40 transition-all"
      aria-label={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
