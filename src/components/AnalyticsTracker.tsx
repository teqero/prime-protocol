import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { supabase } from '../lib/supabase';

function generateSessionId() {
  const existing = sessionStorage.getItem('pp_session');
  if (existing) return existing;
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('pp_session', id);
  return id;
}

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const track = async () => {
      try {
        await supabase.from('page_views').insert({
          page: location.pathname + location.hash,
          session_id: generateSessionId(),
          referrer: document.referrer || null,
        });
      } catch {
        // Silently fail
      }
    };

    track();
  }, [location.pathname, location.hash]);

  return null;
}
