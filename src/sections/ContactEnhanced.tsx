import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import emailjs from 'emailjs-com';

// EmailJS config — substituir com os seus valores reais do dashboard EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || '';

async function sendAdminNotification(data: { name: string; email: string; phone: string; service: string; message: string }) {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
    console.warn('EmailJS não configurado. Configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID e VITE_EMAILJS_USER_ID no .env');
    return;
  }
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'N/A',
        service: data.service,
        message: data.message || 'Sem mensagem',
        to_email: 'primeprotocol.ao@gmail.com',
      },
      EMAILJS_USER_ID
    );
  } catch (err) {
    console.error('Erro ao enviar email:', err);
  }
}

export default function ContactEnhanced() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { error: supaError } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          service: formData.service,
          message: formData.message || null,
        });

      if (supaError) throw supaError;

      // Send email notification to admin
      await sendAdminNotification(formData);

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Ocorreu um erro ao enviar. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#111318] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
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
          {/* Contact Info + Map */}
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
                { icon: Phone, label: 'Telefone', value: '+244 936 004 912' },
                { icon: Mail, label: 'Email', value: 'primeprotocol.ao@gmail.com' },
                { icon: Mail, label: 'Email', value: 'info@primeprotocol.ao' },
                { icon: Clock, label: 'Horário', value: 'Seg — Sex: 08h00 — 18h00' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-[#c9956b]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9956b]/20 transition-colors">
                    <item.icon size={18} className="text-[#c9956b]" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-[#f5f0e8] text-[13px] mb-0.5">{item.label}</p>
                    <p className="text-[#8a7e74] font-sans text-[13px]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Embed */}
            <div className="relative aspect-video overflow-hidden border border-[#2a2520]/40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126140.2488255816!2d13.1603998!3d-8.8534986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x31932f6db1e0a5c1!2sLuanda%2C%20Angola!5e0!3m2!1sen!2s!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Luanda"
              />
              <div className="absolute bottom-4 left-4 bg-[#111318]/90 border border-[#2a2520] px-4 py-2 backdrop-blur-sm">
                <p className="font-serif text-base text-[#c9956b]">Luanda, Angola</p>
                <p className="text-[10px] text-[#8a7e74] font-sans">Talatona · Belas</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-[#0d0f14] border border-[#c9956b]/30 p-10 text-center">
                <CheckCircle size={48} className="text-[#c9956b] mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-[#f5f0e8] mb-2">Mensagem Enviada!</h3>
                <p className="text-[#8a7e74] font-sans text-sm">A nossa equipa entrará em contacto brevemente.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#0d0f14] border border-[#2a2520]/40 p-10">
                <h3 className="font-serif text-[20px] font-semibold text-[#f5f0e8] mb-8">
                  Solicitar Orçamento
                </h3>

                {error && (
                  <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-sans">
                    {error}
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-sans font-medium text-[#6b6560] uppercase tracking-[0.15em] mb-2">
                      Nome Completo *
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
                        Email *
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
                      Tipo de Serviço *
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
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center px-8 py-3.5 bg-[#c9956b] text-[#0d0f14] font-sans font-semibold text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4a87a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        A Enviar...
                      </span>
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send size={14} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
