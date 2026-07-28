import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado pelo seu contacto! A nossa equipa entrará em contacto brevemente.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="w-full bg-[#111318] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#c9956b]" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
              Entre em Contacto
            </span>
            <div className="w-12 h-[1px] bg-[#c9956b]" />
          </div>
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1]">
            Contactos
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-[24px] font-semibold text-[#f5f0e8] mb-6">
              Vamos Conversar
            </h3>
            <p className="text-[#8a7e74] font-sans text-[14px] leading-[1.7] mb-10">
              Estamos prontos para transformar o seu próximo evento numa experiência
              inesquecível. Entre em contacto connosco para um orçamento personalizado.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, label: 'Localização', value: 'Luanda, Angola' },
                { icon: Phone, label: 'Telefone', value: '+244 923 456 789' },
                { icon: Mail, label: 'Email', value: 'info@primeprotocol.ao' },
                { icon: Clock, label: 'Horário', value: 'Seg — Sex: 08h00 — 18h00' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#c9956b]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-[#c9956b]" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-[#f5f0e8] text-[13px] mb-0.5">{item.label}</p>
                    <p className="text-[#8a7e74] font-sans text-[13px]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="relative aspect-video overflow-hidden border border-[#2a2520]/40">
              <img
                src="/images/map.jpg"
                alt="Mapa Luanda"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-serif text-lg text-[#c9956b]">Luanda, Angola</p>
                <p className="text-[11px] text-[#8a7e74] font-sans">Talatona · Belas</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-[#0d0f14] border border-[#2a2520]/40 p-10">
              <h3 className="font-serif text-[20px] font-semibold text-[#f5f0e8] mb-8">
                Solicitar Orçamento
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#16181d] border border-[#2a2520] px-4 py-3 text-[#f5f0e8] font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors"
                    placeholder="O seu nome"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#16181d] border border-[#2a2520] px-4 py-3 text-[#f5f0e8] font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#16181d] border border-[#2a2520] px-4 py-3 text-[#f5f0e8] font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors"
                      placeholder="+244 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
                    Tipo de Serviço
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#16181d] border border-[#2a2520] px-4 py-3 text-[#f5f0e8] font-sans text-[13px] focus:border-[#c9956b]/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#16181d]">Selecione um serviço</option>
                    <option value="eventos-corporativos" className="bg-[#16181d]">Organização de Cimeiras e Eventos Corporativos</option>
                    <option value="cerimonial" className="bg-[#16181d]">Cerimonial & Comunicação Institucional</option>
                    <option value="protocolo" className="bg-[#16181d]">Protocolo Diplomático</option>
                    <option value="governamentais" className="bg-[#16181d]">Eventos Governamentais e de Estado</option>
                    <option value="consultoria" className="bg-[#16181d]">Consultoria Estratégica em Protocolo</option>
                    <option value="formacao" className="bg-[#16181d]">Formação em Protocolo & Etiqueta</option>
                    <option value="outro" className="bg-[#16181d]">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#16181d] border border-[#2a2520] px-4 py-3 text-[#f5f0e8] font-sans text-[13px] placeholder:text-[#6b6560]/50 focus:border-[#c9956b]/50 focus:outline-none transition-colors resize-none"
                    placeholder="Descreva o seu evento ou necessidade..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-3.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4a87a] transition-all duration-300"
                >
                  Enviar Mensagem
                  <Send size={14} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
