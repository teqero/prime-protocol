import { Calendar, ArrowUpRight, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const articles = [
  {
    title: 'Protocolo Diplomático em Angola: Guia Completo 2024',
    excerpt: 'Descubra as normas e práticas essenciais para recepções diplomáticas e visitas de Estado em território angolano.',
    date: '15 Jan 2024',
    readTime: '8 min',
    category: 'Protocolo',
    image: '/images/gallery-1.jpg',
  },
  {
    title: 'Cimeiras Tecnológicas: Como Organizar com Excelência',
    excerpt: 'As melhores práticas para o planeamento e execução de conferências e cimeiras no sector tecnológico.',
    date: '28 Fev 2024',
    readTime: '6 min',
    category: 'Eventos',
    image: '/images/gallery-3.jpg',
  },
  {
    title: 'Etiqueta Empresarial: Regras para Reuniões Executivas',
    excerpt: 'Um guia prático sobre comportamento, vestuário e protocolo em ambientes corporativos de alto nível.',
    date: '10 Mar 2024',
    readTime: '5 min',
    category: 'Formação',
    image: '/images/gallery-5.jpg',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="w-full bg-[#0d0f14] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-[#c9956b]" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
                  Conhecimento
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-serif text-[48px] lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1]">
                Blog & <span className="font-semibold">Notícias</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#c9956b] font-sans text-[12px] tracking-[0.15em] uppercase hover:text-[#d4a87a] transition-colors mt-6 lg:mt-0 group"
            >
              Ver Todos os Artigos
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </ScrollReveal>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <article className="group bg-[#111318] border border-[#2a2520]/40 overflow-hidden hover:border-[#c9956b]/20 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#c9956b] text-[#0d0f14] font-sans text-[9px] font-semibold px-3 py-1 tracking-[0.1em] uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4 text-[#6b6560] font-sans text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-[18px] lg:text-[20px] text-[#f5f0e8] font-semibold leading-[1.3] mb-3 group-hover:text-[#c9956b] transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-[#6b6560] font-sans text-[13px] leading-[1.6] mb-4">
                    {article.excerpt}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-[#c9956b] font-sans text-[11px] tracking-[0.1em] uppercase group-hover:gap-2.5 transition-all duration-300"
                  >
                    Ler Mais
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
