import { useAppContext } from '../context/AppContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 border flex items-center justify-center transition-all ${
        isDark
          ? 'border-[#2a2520] text-[#8a7e74] hover:text-[#c9956b] hover:border-[#c9956b]/40'
          : 'border-[#d4cbbf] text-[#5c5348] hover:text-[#a67c52] hover:border-[#a67c52]/40'
      }`}
      aria-label={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
