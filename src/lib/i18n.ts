import { useState, useEffect, useCallback } from 'react';

type Lang = 'pt' | 'en';

const translations = {
  pt: {
    nav: { about: 'Sobre', services: 'Serviços', founder: 'Fundadora', contact: 'Contactos', schedule: 'Agendar' },
    hero: {
      sector: 'Protocolo Corporativo · Tecnologia · Governo · Eventos Institucionais',
      founder: 'Fundadora & CEO',
      name: 'Lucíria Meury Rodrigues de Sousa',
      title1: 'PRIME',
      title2: 'PROTOCOL',
      desc: 'Excelência em protocolo, cerimonial e organização de eventos executivos. Transformamos cada ocasião numa experiência inesquecível de sofisticação e prestígio.',
      cta1: 'Solicitar Orçamento',
      cta2: 'Conheça-nos',
      stats: { events: 'Eventos Realizados', clients: 'Clientes Satisfeitos', years: 'Anos de Experiência' },
      badge: { since: 'Desde 2020', location: 'Luanda, Angola' },
    },
    about: {
      label: 'A Nossa Essência',
      title: 'Sobre a Prime Protocol',
      p1: 'A Prime Protocol é uma firma especializada em protocolo corporativo, cerimonial diplomático e organização de eventos institucionais, fundada para servir o mercado angolano com os mais elevados padrões internacionais.',
      p2: 'Servimos empresas de tecnologia, ministérios governamentais, embaixadas, organismos internacionais e grandes corporações. Cada evento — seja uma cimeira tecnológica, uma cerimónia de Estado, uma receção diplomática ou um encontro ministerial — é executado com rigor absoluto, discrição e mestria protocolar de nível mundial.',
      tags: ['Cimeiras Tecnológicas', 'Cerimónias de Estado', 'Receções Diplomáticas', 'Eventos Corporativos'],
      caption: { label: 'Evento Corporativo · Luanda', text: 'Excelência em cada detalhe institucional' },
    },
  },
  en: {
    nav: { about: 'About', services: 'Services', founder: 'Founder', contact: 'Contact', schedule: 'Book Now' },
    hero: {
      sector: 'Corporate Protocol · Technology · Government · Institutional Events',
      founder: 'Founder & CEO',
      name: 'Lucíria Meury Rodrigues de Sousa',
      title1: 'PRIME',
      title2: 'PROTOCOL',
      desc: 'Excellence in protocol, ceremonial, and executive event organization. We transform every occasion into an unforgettable experience of sophistication and prestige.',
      cta1: 'Request a Quote',
      cta2: 'Learn More',
      stats: { events: 'Events Delivered', clients: 'Satisfied Clients', years: 'Years of Experience' },
      badge: { since: 'Since 2020', location: 'Luanda, Angola' },
    },
    about: {
      label: 'Our Essence',
      title: 'About Prime Protocol',
      p1: 'Prime Protocol is a firm specialized in corporate protocol, diplomatic ceremonial, and institutional event organization, founded to serve the Angolan market with the highest international standards.',
      p2: 'We serve technology companies, government ministries, embassies, international organizations, and large corporations. Every event — whether a technology summit, a State ceremony, a diplomatic reception, or a ministerial meeting — is executed with absolute rigor, discretion, and world-class protocol mastery.',
      tags: ['Technology Summits', 'State Ceremonies', 'Diplomatic Receptions', 'Corporate Events'],
      caption: { label: 'Corporate Event · Luanda', text: 'Excellence in every institutional detail' },
    },
  },
};

let currentLang: Lang = 'pt';
const listeners: Set<() => void> = new Set();

export function useLang() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const cb = () => forceUpdate({});
    listeners.add(cb);
    return () => { listeners.delete(cb); };
  }, []);

  const setLang = useCallback((lang: Lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    listeners.forEach((cb) => cb());
  }, []);

  const t = useCallback(
    (path: string) => {
      const keys = path.split('.');
      let val: unknown = translations[currentLang];
      for (const k of keys) {
        if (val && typeof val === 'object' && k in val) {
          val = (val as Record<string, unknown>)[k];
        } else {
          return path;
        }
      }
      return val as string;
    },
    []
  );

  return { lang: currentLang, setLang, t };
}

export function initLang() {
  const saved = localStorage.getItem('lang') as Lang | null;
  if (saved === 'en' || saved === 'pt') {
    currentLang = saved;
  }
}
