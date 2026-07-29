import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página Não Encontrada | Prime Protocol';
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full border border-[#c9956b]/40 flex items-center justify-center mx-auto mb-8">
          <img src="/images/logo-icon-120.png" alt="Prime Protocol" className="w-14 h-14 object-contain" />
        </div>
        <h1 className="font-serif text-[72px] lg:text-[96px] font-light text-[#c9956b] leading-none mb-4">404</h1>
        <h2 className="font-serif text-2xl text-[#f5f0e8] mb-4">Página Não Encontrada</h2>
        <p className="text-[#8a7e74] font-sans text-sm mb-8 leading-relaxed">
          A página que procura não existe ou foi movida. Verifique o endereço ou regresse à página inicial.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4a87a] transition-all duration-300"
        >
          <ArrowLeft size={14} />
          Voltar ao Início
        </a>
      </div>
    </div>
  );
}
