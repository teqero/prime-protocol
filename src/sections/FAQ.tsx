import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Que tipo de eventos a Prime Protocol organiza?',
    answer: 'Organizamos cimeiras tecnológicas, cerimónias de Estado, receções diplomáticas, eventos corporativos, lançamentos de produtos, conferências internacionais e formações em protocolo. Cada evento é personalizado conforme as necessidades específicas do cliente.',
  },
  {
    question: 'Qual é o prazo mínimo para agendar um evento?',
    answer: 'Recomendamos um prazo mínimo de 4 a 6 semanas para eventos corporativos e 3 a 6 meses para cerimónias de Estado ou receções diplomáticas. No entanto, a equipa está preparada para responder a solicitações urgentes consoante a disponibilidade.',
  },
  {
    question: 'A Prime Protocol atua apenas em Luanda?',
    answer: 'Embora a nossa sede seja em Luanda, prestamos serviços em todo o território angolano e na comunidade CPLP. Para eventos internacionais, trabalhamos em parceria com redes protocolares globais.',
  },
  {
    question: 'Como é feito o orçamento de um evento?',
    answer: 'O orçamento é elaborado após uma consulta inicial detalhada onde analisamos o tipo de evento, número de participantes, local, requisitos específicos de protocolo e serviços adicionais. Fornecemos um orçamento transparente e detalhado sem compromisso.',
  },
  {
    question: 'Oferecem serviços de formação em protocolo?',
    answer: 'Sim, temos programas de formação em protocolo corporativo, etiqueta diplomática e cerimonial executivo. As formações são personalizadas para empresas, instituições governamentais e particulares.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full bg-[#0d0f14] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#c9956b]" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
              Perguntas Frequentes
            </span>
            <div className="w-12 h-[1px] bg-[#c9956b]" />
          </div>
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1]">
            Dúvidas <span className="font-semibold">Comuns</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="max-w-[900px] mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#2a2520]/40 bg-[#111318]/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 lg:p-8 text-left group"
              >
                <span className="font-serif text-[18px] lg:text-[20px] text-[#f5f0e8] font-normal pr-4 group-hover:text-[#c9956b] transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-[#c9956b] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: openIndex === i ? '300px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <div className="w-12 h-[1px] bg-[#c9956b]/30 mb-4" />
                  <p className="text-[#8a7e74] font-sans text-[14px] leading-[1.7]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
