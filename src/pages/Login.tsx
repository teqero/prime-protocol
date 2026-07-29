import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { adminLogin } from '../lib/supabase';
import Logo from '../components/Logo';

export default function Login() {
  const { t } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { ok, data } = await adminLogin(email, password);

      if (!ok || !data.token) {
        setError(data.error || t('login.error'));
        setLoading(false);
        return;
      }

      localStorage.setItem('pp_admin_token', data.token);
      window.location.href = '/admin';
    } catch {
      setError(t('login.error'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
         style={{ backgroundColor: 'var(--pp-bg)' }}>
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full border border-[#c9956b]/40 flex items-center justify-center mx-auto mb-4">
            <Logo size={44} />
          </div>
          <h1 className="font-serif text-2xl font-semibold tracking-wide uppercase"
              style={{ color: 'var(--pp-text)' }}>
            Prime Protocol
          </h1>
          <p className="text-[#8a7e74] font-sans text-sm mt-2">
            Painel Administrativo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-sans text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
              {t('login.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-3 font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors"
              style={{ backgroundColor: 'var(--pp-bg-3)', borderColor: 'var(--pp-border)', color: 'var(--pp-text)' }}
              placeholder="admin@primeprotocol.ao"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
              {t('login.password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border px-4 py-3 pr-10 font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors"
                style={{ backgroundColor: 'var(--pp-bg-3)', borderColor: 'var(--pp-border)', color: 'var(--pp-text)' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6560] hover:text-[var(--pp-text)]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-8 py-3.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4a87a] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                A entrar...
              </span>
            ) : (
              <>
                {t('login.submit')}
                <LogIn size={14} className="ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-[#6b6560] font-sans text-[11px] hover:text-[#c9956b] transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
