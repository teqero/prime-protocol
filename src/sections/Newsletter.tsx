import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="w-full bg-[#0d0f14] py-20 lg:py-24 border-y border-[#2a2520]/30">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        <div className="max-w-[700px] mx-auto text-center">
          <h3 className="font-serif text-[28px] lg:text-[32px] text-[#f5f0e8] font-semibold mb-3">
            Newsletter
          </h3>
          <p className="text-[#8a7e74] font-sans text-[14px] leading-relaxed mb-8">
            Receba as últimas novidades, dicas de protocolo e convites para eventos exclusivos directamente no seu email.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 text-[#c9956b]">
              <CheckCircle size={20} />
              <span className="font-sans text-[14px]">Subscrição confirmada! Obrigado.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[500px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O seu email"
                required
                className="flex-1 bg-[#16181d] border border-[#2a2520] px-5 py-3 text-[#f5f0e8] font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4a87a] transition-all disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    Subscrever
                    <Send size={12} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
