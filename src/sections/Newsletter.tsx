import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Newsletter() {
  const { t, theme } = useAppContext();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })
        .select();

      if (error) {
        if (error.message.includes('duplicate')) {
          setErrorMsg('Este email já está subscrito.');
        } else {
          setErrorMsg('Ocorreu um erro. Tente novamente.');
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setErrorMsg('Ocorreu um erro. Tente novamente.');
      setStatus('error');
    }
  };

  return (
    <section className="w-full py-20 lg:py-24 border-y"
             style={{ backgroundColor: 'var(--pp-bg)', borderColor: 'var(--pp-border)' }}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="max-w-[700px] mx-auto text-center">
          <h3 className="font-serif text-[28px] lg:text-[32px] font-semibold mb-3"
              style={{ color: 'var(--pp-text)' }}>
            Newsletter
          </h3>
          <p className="text-[#8a7e74] font-sans text-[14px] leading-relaxed mb-8">
            {t('newsletter.desc')}
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 text-[#c9956b]">
              <CheckCircle size={20} />
              <span className="font-sans text-[14px]">{t('newsletter.success')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[500px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                required
                className="flex-1 border px-5 py-3 font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors"
                style={{ backgroundColor: 'var(--pp-bg-3)', borderColor: 'var(--pp-border)', color: 'var(--pp-text)' }}
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
                    {t('newsletter.button')}
                    <Send size={12} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
          {status === 'error' && errorMsg && (
            <p className="text-red-400 text-sm mt-3 font-sans">{errorMsg}</p>
          )}
        </div>
      </div>
    </section>
  );
}
