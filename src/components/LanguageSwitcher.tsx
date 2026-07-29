import { useAppContext } from '../context/AppContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useAppContext();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLang('pt')}
        className={`px-2 py-1 text-[10px] font-sans font-semibold tracking-wider uppercase transition-colors ${
          lang === 'pt'
            ? 'text-[#c9956b]'
            : 'text-[#6b6560] hover:text-[#8a7e74]'
        }`}
      >
        PT
      </button>
      <span className="text-[#2a2520] text-[10px]">|</span>
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 text-[10px] font-sans font-semibold tracking-wider uppercase transition-colors ${
          lang === 'en'
            ? 'text-[#c9956b]'
            : 'text-[#6b6560] hover:text-[#8a7e74]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
