import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const phone = '+244923456789';
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Prime Protocol.');
  const waLink = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 bg-[#111318] border border-[#2a2520] p-5 w-[280px] shadow-2xl animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-serif text-[16px] text-[#f5f0e8] font-semibold">Prime Protocol</h4>
            <button onClick={() => setOpen(false)} className="text-[#6b6560] hover:text-[#f5f0e8]">
              <X size={16} />
            </button>
          </div>
          <p className="text-[#8a7e74] font-sans text-[12px] mb-4 leading-relaxed">
            Olá! Como podemos ajudar? Envie-nos uma mensagem pelo WhatsApp.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2.5 bg-[#25D366] text-white font-sans font-semibold text-[11px] tracking-wider uppercase hover:bg-[#128C7E] transition-colors"
          >
            Iniciar Conversa
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
