import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

type ContentMap = Record<string, string>;

export function useSiteContent(section: string) {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value')
        .eq('section', section);

      if (error) {
        console.error('Error fetching site content:', error);
        setLoading(false);
        return;
      }

      const map: ContentMap = {};
      data?.forEach((row: { key: string; value: string }) => {
        map[row.key] = row.value;
      });
      setContent(map);
      setLoading(false);
    };

    fetchContent();
  }, [section]);

  return { content, loading };
}

export async function updateSiteContent(section: string, key: string, value: string) {
  const { error } = await supabase
    .from('site_content')
    .upsert({ section, key, value }, { onConflict: 'section,key' });
  return { error };
}

export async function fetchAllSiteContent() {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .order('section')
    .order('key');
  return { data: data || [], error };
}
