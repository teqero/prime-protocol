import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Tipos                                                             */
/* ------------------------------------------------------------------ */

export type Lang = 'pt' | 'en';
export type Theme = 'dark' | 'light';

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
  theme: Theme;
  toggleTheme: () => void;
}

/* ------------------------------------------------------------------ */
/*  Traduções (copiadas de i18n.ts)                                   */
/* ------------------------------------------------------------------ */

const translations = {
  pt: {
    nav: { about: 'Sobre', services: 'Serviços', founder: 'Fundadora', contact: 'Contactos', schedule: 'Agendar', login: 'Entrar' },
    hero: {
      sector: 'Protocolo Corporativo · Tecnologia · Governo · Eventos Institucionais',
      founder: 'Fundadora & CEO',
      name: 'Lucíria Meury Rodrigues de Sousa',
      title1: 'PRIME',
      title2: 'PROTOCOL',
      desc: 'Excelência em protocolo, cerimonial e organização de eventos executivos. Transformamos cada ocasião numa experiência inesquecível de sofisticação e prestígio.',
      cta1: 'Solicitar Orçamento',
      cta2: 'Conheça-nos',
      ctaPrimary: 'Agendar Evento',
      ctaSecondary: 'Explorar Portfólio',
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
    services: {
      label: 'O Que Fazemos',
      title: 'Serviços de Excelência',
      subtitle: 'Soluções completas em protocolo, cerimonial e organização de eventos para o sector público e privado.',
    },
    founder: {
      label: 'A Nossa Liderança',
      title: 'Fundadora & CEO',
    },
    contact: {
      label: 'Entre em Contacto',
      title: 'Contactos',
      subtitle: 'Vamos Conversar',
      desc: 'Estamos prontos para transformar o seu próximo evento numa experiência inesquecível. Entre em contacto connosco para um orçamento personalizado.',
      formTitle: 'Solicitar Orçamento',
      name: 'Nome Completo',
      email: 'Email',
      phone: 'Telefone',
      service: 'Tipo de Serviço',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      sending: 'A Enviar...',
      successTitle: 'Mensagem Enviada!',
      successDesc: 'A nossa equipa entrará em contacto brevemente.',
      error: 'Ocorreu um erro ao enviar. Por favor, tente novamente.',
      location: 'Localização',
      locValue: 'Luanda, Angola',
      phoneLabel: 'Telefone',
      phoneValue: '+244 936 004 912',
      emailLabel: 'Email',
      emailValue: 'primeprotocol.ao@gmail.com',
      hoursLabel: 'Horário',
      hoursValue: 'Seg — Sex: 08h00 — 18h00',
      selectService: 'Selecione um serviço',
      services: {
        corporate: 'Organização de Cimeiras e Eventos Corporativos',
        ceremonial: 'Cerimonial & Comunicação Institucional',
        diplomatic: 'Protocolo Diplomático',
        government: 'Eventos Governamentais e de Estado',
        consulting: 'Consultoria Estratégica em Protocolo',
        training: 'Formação em Protocolo & Etiqueta',
        other: 'Outro',
      },
    },
    footer: {
      company: 'Empresa',
      services: 'Serviços',
      legal: 'Legal',
      about: 'Sobre Nós',
      team: 'Equipa',
      contact: 'Contactos',
      corpEvents: 'Eventos Corporativos',
      ceremonial: 'Cerimonial',
      diplomatic: 'Protocolo Diplomático',
      training: 'Formação',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
      cookies: 'Cookies',
      rights: 'Todos os direitos reservados.',
      soon: 'Em breve — Documento em preparação',
      desc: 'Excelência em protocolo, cerimonial e organização de eventos executivos em Angola desde 2020.',
    },
    newsletter: {
      title: 'Receba as Nossas Novidades',
      desc: 'Subscreva a nossa newsletter para receber actualizações sobre eventos, dicas de protocolo e novidades institucionais.',
      placeholder: 'O seu email',
      button: 'Subscrever',
      success: 'Subscrição realizada com sucesso!',
    },
    login: {
      title: 'Área Administrativa',
      email: 'Email',
      password: 'Palavra-passe',
      submit: 'Entrar',
      error: 'Credenciais inválidas',
    },
  },
  en: {
    nav: { about: 'About', services: 'Services', founder: 'Founder', contact: 'Contact', schedule: 'Book Now', login: 'Login' },
    hero: {
      sector: 'Corporate Protocol · Technology · Government · Institutional Events',
      founder: 'Founder & CEO',
      name: 'Lucíria Meury Rodrigues de Sousa',
      title1: 'PRIME',
      title2: 'PROTOCOL',
      desc: 'Excellence in protocol, ceremonial, and executive event organization. We transform every occasion into an unforgettable experience of sophistication and prestige.',
      cta1: 'Request a Quote',
      cta2: 'Learn More',
      ctaPrimary: 'Book Event',
      ctaSecondary: 'Explore Portfolio',
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
    services: {
      label: 'What We Do',
      title: 'Excellence Services',
      subtitle: 'Complete solutions in protocol, ceremonial, and event organization for the public and private sectors.',
    },
    founder: {
      label: 'Our Leadership',
      title: 'Founder & CEO',
    },
    contact: {
      label: 'Get in Touch',
      title: 'Contact',
      subtitle: "Let's Talk",
      desc: 'We are ready to transform your next event into an unforgettable experience. Get in touch with us for a personalized quote.',
      formTitle: 'Request a Quote',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Service Type',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successDesc: 'Our team will contact you shortly.',
      error: 'An error occurred while sending. Please try again.',
      location: 'Location',
      locValue: 'Luanda, Angola',
      phoneLabel: 'Phone',
      phoneValue: '+244 936 004 912',
      emailLabel: 'Email',
      emailValue: 'primeprotocol.ao@gmail.com',
      hoursLabel: 'Hours',
      hoursValue: 'Mon — Fri: 08:00 — 18:00',
      selectService: 'Select a service',
      services: {
        corporate: 'Corporate Summits & Events Organization',
        ceremonial: 'Ceremonial & Institutional Communication',
        diplomatic: 'Diplomatic Protocol',
        government: 'Government & State Events',
        consulting: 'Strategic Protocol Consulting',
        training: 'Protocol & Etiquette Training',
        other: 'Other',
      },
    },
    footer: {
      company: 'Company',
      services: 'Services',
      legal: 'Legal',
      about: 'About Us',
      team: 'Team',
      contact: 'Contact',
      corpEvents: 'Corporate Events',
      ceremonial: 'Ceremonial',
      diplomatic: 'Diplomatic Protocol',
      training: 'Training',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      cookies: 'Cookies',
      rights: 'All rights reserved.',
      soon: 'Coming soon — Document in preparation',
      desc: 'Excellence in protocol, ceremonial, and executive event organization in Angola since 2020.',
    },
    newsletter: {
      title: 'Subscribe to Our Newsletter',
      desc: 'Subscribe to our newsletter to receive updates on events, protocol tips, and institutional news.',
      placeholder: 'Your email',
      button: 'Subscribe',
      success: 'Subscription successful!',
    },
    login: {
      title: 'Admin Area',
      email: 'Email',
      password: 'Password',
      submit: 'Login',
      error: 'Invalid credentials',
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Contexto                                                          */
/* ------------------------------------------------------------------ */

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    return saved === 'en' || saved === 'pt' ? saved : 'pt';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    return saved === 'light' ? 'light' : 'dark';
  });

  /* Sincronizar tema com body */
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem('lang', next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const t = useCallback(
    (path: string) => {
      const keys = path.split('.');
      let val: unknown = translations[lang];
      for (const k of keys) {
        if (val && typeof val === 'object' && k in val) {
          val = (val as Record<string, unknown>)[k];
        } else {
          return path;
        }
      }
      return (val as string) ?? path;
    },
    [lang]
  );

  return (
    <AppContext.Provider value={{ lang, setLang, t, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}
