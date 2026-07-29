import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('pp_admin_token');
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('verify_session_token', {
          p_token: token,
        });

        if (error || !data || data.length === 0 || !data[0].valid) {
          localStorage.removeItem('pp_admin_token');
          setIsAuth(false);
          return;
        }

        setIsAuth(true);
      } catch {
        localStorage.removeItem('pp_admin_token');
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9956b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
