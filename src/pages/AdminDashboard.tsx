import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Calendar, Users, BarChart3, Settings, Bell, Search, Menu, X, PenLine,
  TrendingUp, TrendingDown, DollarSign, Briefcase, CheckCircle, Clock, AlertCircle,
  ArrowLeft, LogOut, Plus, FileText, X as XIcon, Shield, Trash2, UserPlus, Pencil,
} from 'lucide-react';
import { supabase, adminLogout, listAdminUsers, createAdminUser, deleteAdminUser, createEvent, createContact, updateEvent, deleteEvent, updateContact, deleteContact } from '../lib/supabase';
} from 'lucide-react';
import { supabase, adminLogout, listAdminUsers, createAdminUser, deleteAdminUser, createEvent, createContact } from '../lib/supabase';
import { fetchAllSiteContent, updateSiteContent } from '../hooks/useSiteContent';
import Logo from '../components/Logo';

type EventItem = { id: string; name: string; event_date: string; status: string; client: string; event_type: string };
type TaskItem = { id: string; task: string; deadline: string; priority: string; status: string };
type ContactItem = { id: string; name: string; email: string; service: string; status: string; created_at: string };
type AdminUser = { id: string; email: string; created_at: string };

const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-green-400', completed: 'bg-pp-gold', pending: 'bg-yellow-400', cancelled: 'bg-red-400',
};
const STATUS_TEXT: Record<string, string> = {
  confirmed: 'text-green-400', completed: 'text-pp-gold', pending: 'text-yellow-400', cancelled: 'text-red-400',
};
const PRIORITY_STYLES: Record<string, string> = {
  high: 'bg-red-500/10 text-red-400', medium: 'bg-yellow-500/10 text-yellow-400', low: 'bg-green-500/10 text-green-400',
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [allContacts, setAllContacts] = useState<ContactItem[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState({ eventsMonth: 24, revenue: '4.2M', activeClients: 48, completionRate: '96%' });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showNewAdminModal, setShowNewAdminModal] = useState(false);

  // Forms
  const [eventForm, setEventForm] = useState({ name: '', client: '', event_type: 'corporate', event_date: '', description: '', status: 'pending' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [adminForm, setAdminForm] = useState({ email: '', password: '' });

  // Content
  const [siteContent, setSiteContent] = useState<Array<{id: string; section: string; key: string; value: string}>>([]);
  const [contentLoading, setContentLoading] = useState(false);

  // Editing states
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editingContact, setEditingContact] = useState<ContactItem | null>(null);
  const [siteContent, setSiteContent] = useState<Array<{id: string; section: string; key: string; value: string}>>([]);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, tasksRes, contactsRes, allContactsRes] = await Promise.all([
        supabase.from('events').select('*').order('event_date', { ascending: false }),
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
      ]);
      if (eventsRes.data) setEvents(eventsRes.data);
      if (tasksRes.data) setTasks(tasksRes.data);
      if (contactsRes.data) setContacts(contactsRes.data);
      if (allContactsRes.data) setAllContacts(allContactsRes.data);

      const confirmed = eventsRes.data?.filter((e: EventItem) => e.status === 'confirmed').length || 0;
      const completed = eventsRes.data?.filter((e: EventItem) => e.status === 'completed').length || 0;
      const total = eventsRes.data?.length || 1;
      setStats({
        eventsMonth: eventsRes.data?.length || 0,
        revenue: '4.2M',
        activeClients: eventsRes.data ? [...new Set(eventsRes.data.map((e: EventItem) => e.client).filter(Boolean))].length : 0,
        completionRate: `${Math.round(((completed + confirmed) / total) * 100)}%`,
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('pp_admin_token');
    if (token) { await adminLogout(token); }
    localStorage.removeItem('pp_admin_token');
    window.location.href = '/login';
  };

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const loadSiteContent = async () => {
    setContentLoading(true);
    const { data, error } = await fetchAllSiteContent();
    if (!error) setSiteContent(data);
    setContentLoading(false);
  };

  const handleContentSave = async (_id: string, section: string, key: string, value: string) => {
    const { error } = await updateSiteContent(section, key, value);
    if (error) { showToast('Erro ao guardar'); }
    else { showToast('Conteúdo actualizado'); loadSiteContent(); }
  };

  const handleCreateEvent = async () => {
    if (!eventForm.name || !eventForm.client || !eventForm.event_date) {
      showToast('Preencha os campos obrigatórios'); return;
    }
    if (editingEvent) {
      const { error } = await updateEvent(editingEvent.id, eventForm);
      if (error) { showToast('Erro ao actualizar evento'); }
      else { showToast('Evento actualizado'); setEditingEvent(null); }
    } else {
      const { error } = await createEvent(eventForm);
      if (error) { showToast('Erro ao criar evento'); }
      else { showToast('Evento criado com sucesso'); }
    }
    setShowNewEventModal(false);
    setEventForm({ name: '', client: '', event_type: 'corporate', event_date: '', description: '', status: 'pending' });
    fetchData();
  };

  const handleCreateContact = async () => {
    if (!contactForm.name || !contactForm.email) {
      showToast('Preencha nome e email'); return;
    }
    if (editingContact) {
      const { error } = await updateContact(editingContact.id, { ...contactForm, status: editingContact.status });
      if (error) { showToast('Erro ao actualizar contacto'); }
      else { showToast('Contacto actualizado'); setEditingContact(null); }
    } else {
      const { error } = await createContact({ ...contactForm, status: 'new' });
      if (error) { showToast('Erro ao criar contacto'); }
      else { showToast('Contacto criado com sucesso'); }
    }
    setShowNewClientModal(false);
    setContactForm({ name: '', email: '', phone: '', service: '', message: '' });
    fetchData();
  };

  const loadAdminUsers = async () => {
    const { data, error } = await listAdminUsers();
    if (!error && data) setAdminUsers(data);
  };

  const handleCreateAdmin = async () => {
    if (!adminForm.email || !adminForm.password) {
      showToast('Preencha email e password'); return;
    }
    const { error } = await createAdminUser(adminForm.email, adminForm.password);
    if (error) { showToast('Erro ao criar administrador: ' + error.message); }
    else {
      showToast('Administrador criado com sucesso');
      setShowNewAdminModal(false);
      setAdminForm({ email: '', password: '' });
      loadAdminUsers();
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este administrador?')) return;
    const { data, error } = await deleteAdminUser(id);
    if (error || !data) { showToast('Erro ao eliminar administrador'); }
    else {
      showToast('Administrador eliminado');
      loadAdminUsers();
    }
  };

  const handleEditEvent = (event: EventItem) => {
    setEditingEvent(event);
    setEventForm({
      name: event.name,
      client: event.client,
      event_type: event.event_type || 'corporate',
      event_date: event.event_date,
      description: '',
      status: event.status || 'pending',
    });
    setShowNewEventModal(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este evento?')) return;
    const { error } = await deleteEvent(id);
    if (error) { showToast('Erro ao eliminar evento'); }
    else { showToast('Evento eliminado'); fetchData(); }
  };

  const handleEditContact = (contact: ContactItem) => {
    setEditingContact(contact);
    setContactForm({
      name: contact.name,
      email: contact.email,
      phone: '',
      service: contact.service || '',
      message: '',
    });
    setShowNewClientModal(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este contacto?')) return;
    const { error } = await deleteContact(id);
    if (error) { showToast('Erro ao eliminar contacto'); }
    else { showToast('Contacto eliminado'); fetchData(); }
  };
    if (!confirm('Tem certeza que deseja eliminar este administrador?')) return;
    const { data, error } = await deleteAdminUser(id);
    if (error || !data) { showToast('Erro ao eliminar administrador'); }
    else {
      showToast('Administrador eliminado');
      loadAdminUsers();
    }
  };

  const statCards = [
    { label: 'Eventos do Mês', value: stats.eventsMonth.toString(), change: '+12%', up: true, icon: Calendar },
    { label: 'Receita (AOA)', value: stats.revenue, change: '+8%', up: true, icon: DollarSign },
    { label: 'Clientes Ativos', value: stats.activeClients.toString(), change: '+5%', up: true, icon: Users },
    { label: 'Taxa de Conclusão', value: stats.completionRate, change: '+2%', up: true, icon: CheckCircle },
  ];

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Calendar, label: 'Eventos', id: 'events' },
    { icon: Users, label: 'Clientes', id: 'clients' },
    { icon: Shield, label: 'Utilizadores', id: 'users' },
    { icon: BarChart3, label: 'Relatórios', id: 'reports' },
    { icon: PenLine, label: 'Conteúdo', id: 'content' },
    { icon: Settings, label: 'Configurações', id: 'settings' },
  ];

  const filteredEvents = events.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.client.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredContacts = allContacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const tabTitles: Record<string, { pre: string; post: string }> = {
    dashboard: { pre: 'Painel de ', post: 'Controlo' },
    events: { pre: 'Gestão de ', post: 'Eventos' },
    clients: { pre: 'Gestão de ', post: 'Clientes' },
    users: { pre: 'Gestão de ', post: 'Utilizadores' },
    reports: { pre: 'Relatórios ', post: 'e Estatísticas' },
    content: { pre: 'Gestão de ', post: 'Conteúdo' },
    settings: { pre: 'Configurações ', post: 'do Sistema' },
  };

  return (
    <div className="min-h-screen bg-pp-dark-2 text-pp-cream font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[70] bg-pp-gold text-pp-dark px-5 py-3 font-sans text-sm font-semibold shadow-lg flex items-center gap-3">
          <span>{toast}</span>
          <button onClick={() => setToast(null)}><XIcon size={14} /></button>
        </div>
      )}

      {/* Modal: Novo Evento */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-pp-dark border border-pp-border/30 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-semibold text-pp-cream">{editingEvent ? `Editar Evento` : `Novo Evento`}</h3>
              <button onClick={() => setShowNewEventModal(false)} className="text-pp-cream-dim hover:text-pp-cream"><XIcon size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Nome do Evento *</label>
                <input type="text" value={eventForm.name} onChange={e => setEventForm({...eventForm, name: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" placeholder="Ex: Gala Empresarial 2025" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Cliente *</label>
                  <input type="text" value={eventForm.client} onChange={e => setEventForm({...eventForm, client: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" placeholder="Nome do cliente" />
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Data *</label>
                  <input type="date" value={eventForm.event_date} onChange={e => setEventForm({...eventForm, event_date: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Tipo</label>
                  <select value={eventForm.event_type} onChange={e => setEventForm({...eventForm, event_type: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none">
                    <option value="corporate">Corporativo</option>
                    <option value="social">Social</option>
                    <option value="diplomatic">Diplomático</option>
                    <option value="cultural">Cultural</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Estado</label>
                  <select value={eventForm.status} onChange={e => setEventForm({...eventForm, status: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none">
                    <option value="pending">Pendente</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="completed">Concluído</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Descrição</label>
                <textarea value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} rows={3} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none resize-y" placeholder="Detalhes do evento..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowNewEventModal(false)} className="flex-1 py-2.5 border border-pp-border/30 text-pp-cream-dim font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-dark-3 transition-all">Cancelar</button>
              <button onClick={handleCreateEvent} className="flex-1 py-2.5 bg-pp-gold text-pp-dark font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-gold-light transition-all">{editingEvent ? `Guardar Alterações` : `Criar Evento`}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Novo Cliente */}
      {showNewClientModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-pp-dark border border-pp-border/30 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-semibold text-pp-cream">{editingContact ? `Editar Contacto` : `Novo Contacto`}</h3>
              <button onClick={() => setShowNewClientModal(false)} className="text-pp-cream-dim hover:text-pp-cream"><XIcon size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Nome *</label>
                  <input type="text" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Email *</label>
                  <input type="email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" placeholder="email@exemplo.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Telefone</label>
                  <input type="text" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" placeholder="+244..." />
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Serviço</label>
                  <select value={contactForm.service} onChange={e => setContactForm({...contactForm, service: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none">
                    <option value="">Selecionar...</option>
                    <option value="protocolo">Protocolo</option>
                    <option value="eventos">Eventos</option>
                    <option value="consultoria">Consultoria</option>
                    <option value="formacao">Formação</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Mensagem</label>
                <textarea value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} rows={3} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none resize-y" placeholder="Notas ou mensagem..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowNewClientModal(false)} className="flex-1 py-2.5 border border-pp-border/30 text-pp-cream-dim font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-dark-3 transition-all">Cancelar</button>
              <button onClick={handleCreateContact} className="flex-1 py-2.5 bg-pp-gold text-pp-dark font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-gold-light transition-all">{editingContact ? `Guardar Alterações` : `Criar Contacto`}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Novo Administrador */}
      {showNewAdminModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-pp-dark border border-pp-border/30 w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-semibold text-pp-cream">Novo Administrador</h3>
              <button onClick={() => setShowNewAdminModal(false)} className="text-pp-cream-dim hover:text-pp-cream"><XIcon size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Email *</label>
                <input type="email" value={adminForm.email} onChange={e => setAdminForm({...adminForm, email: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" placeholder="admin@primeprotocol.ao" />
              </div>
              <div>
                <label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Password *</label>
                <input type="password" value={adminForm.password} onChange={e => setAdminForm({...adminForm, password: e.target.value})} className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream focus:border-pp-gold/50 focus:outline-none" placeholder="Mínimo 6 caracteres" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowNewAdminModal(false)} className="flex-1 py-2.5 border border-pp-border/30 text-pp-cream-dim font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-dark-3 transition-all">Cancelar</button>
              <button onClick={handleCreateAdmin} className="flex-1 py-2.5 bg-pp-gold text-pp-dark font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-gold-light transition-all">Criar Admin</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-pp-dark border-b border-pp-border/20 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-pp-gold/40 flex items-center justify-center"><Logo size={28} /></div>
          <span className="font-serif text-sm font-semibold uppercase">Prime Protocol</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-pp-cream">{sidebarOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-pp-dark border-r border-pp-border/20 flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 border-b border-pp-border/20 hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-pp-gold/40 flex items-center justify-center"><Logo size={32} /></div>
            <div>
              <span className="font-serif text-sm font-semibold uppercase block">Prime Protocol</span>
              <span className="text-[10px] text-pp-cream-dim tracking-wider">Painel Administrativo</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); if (item.id === 'users') loadAdminUsers(); if (item.id === 'content') loadSiteContent(); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-pp-gold/10 text-pp-gold' : 'text-pp-cream-muted hover:bg-pp-dark-3 hover:text-pp-cream'}`}>
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-pp-border/20">
            <a href="/" className="flex items-center gap-2 px-4 py-2 text-[11px] text-pp-cream-dim hover:text-pp-gold transition-colors mb-2"><ArrowLeft size={14} /> Voltar ao site</a>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-[11px] text-red-400 hover:text-red-300 transition-colors mb-2 w-full"><LogOut size={14} /> Sair</button>
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-pp-gold/20 flex items-center justify-center"><span className="font-serif text-sm text-pp-gold font-semibold">LM</span></div>
              <div>
                <p className="text-sm font-medium text-pp-cream">Lucíria Meury Rodrigues de Sousa</p>
                <p className="text-[10px] text-pp-cream-dim">Administrador</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-2xl lg:text-3xl font-light text-pp-cream">
                {tabTitles[activeTab]?.pre}<span className="font-semibold">{tabTitles[activeTab]?.post}</span>
              </h1>
              <p className="text-pp-cream-dim text-sm mt-1">Bem-vinda de volta, Lucíria</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pp-cream-dim" />
                <input type="text" placeholder="Pesquisar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-pp-dark-3 border border-pp-border/30 rounded-sm pl-9 pr-4 py-2 text-sm text-pp-cream placeholder:text-pp-cream-dim/50 focus:border-pp-gold/50 focus:outline-none w-64" />
              </div>
              <button className="w-10 h-10 rounded-sm bg-pp-dark-3 border border-pp-border/30 flex items-center justify-center text-pp-cream-dim hover:text-pp-gold relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pp-gold rounded-full" />
              </button>
            </div>
          </div>

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat, i) => (
                  <div key={i} className="card-dark p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-sm bg-pp-gold/10 flex items-center justify-center"><stat.icon size={18} className="text-pp-gold" /></div>
                      <div className={`flex items-center gap-1 text-xs ${stat.up ? 'text-green-400' : 'text-red-400'}`}>{stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{stat.change}</div>
                    </div>
                    <p className="font-serif text-2xl font-semibold text-pp-cream">{stat.value}</p>
                    <p className="text-xs text-pp-cream-dim font-sans mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="card-dark p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-lg font-semibold text-pp-cream">Eventos Recentes</h3>
                    <button onClick={() => setActiveTab('events')} className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todos</button>
                  </div>
                  {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : events.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">Sem eventos</div> : (
                    <div className="space-y-3">
                      {events.slice(0, 5).map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 rounded-sm bg-pp-dark-3/50 hover:bg-pp-dark-3 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[event.status] || 'bg-gray-400'}`} />
                            <div>
                              <p className="text-sm font-medium text-pp-cream">{event.name}</p>
                              <p className="text-[10px] text-pp-cream-dim">{event.client} · {event.event_type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-pp-cream-muted">{event.event_date}</p>
                            <span className={`text-[10px] uppercase tracking-wider ${STATUS_TEXT[event.status] || 'text-gray-400'}`}>{event.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-dark p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-lg font-semibold text-pp-cream">Tarefas Pendentes</h3>
                    <button onClick={() => showToast('Gestão de tarefas em desenvolvimento')} className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todas</button>
                  </div>
                  {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : tasks.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">Sem tarefas</div> : (
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div key={task.id} className="flex items-start gap-3 p-3 rounded-sm bg-pp-dark-3/50 hover:bg-pp-dark-3 transition-colors">
                          <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${PRIORITY_STYLES[task.priority]?.split(' ')[0] || 'bg-green-500/10'}`}>
                            {task.priority === 'high' ? <AlertCircle size={14} className="text-red-400" /> : task.priority === 'medium' ? <Clock size={14} className="text-yellow-400" /> : <CheckCircle size={14} className="text-green-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-pp-cream truncate">{task.task}</p>
                            <p className="text-[10px] text-pp-cream-dim mt-0.5">Prazo: {task.deadline}</p>
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${PRIORITY_STYLES[task.priority] || 'bg-green-500/10 text-green-400'}`}>{task.priority}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="card-dark p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg font-semibold text-pp-cream">Contactos Recentes</h3>
                  <button onClick={() => setActiveTab('clients')} className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todos</button>
                </div>
                {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : contacts.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">Sem contactos</div> : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-[10px] text-pp-cream-dim uppercase tracking-wider border-b border-pp-border/20">
                          <th className="pb-3 font-medium">Nome</th><th className="pb-3 font-medium">Email</th><th className="pb-3 font-medium">Serviço</th><th className="pb-3 font-medium">Data</th><th className="pb-3 font-medium">Estado</th><th className="pb-3 font-medium text-right">Acções</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {contacts.map((c) => (
                          <tr key={c.id} className="border-b border-pp-border/10 hover:bg-pp-dark-3/30 transition-colors">
                            <td className="py-3 text-pp-cream">{c.name}</td>
                            <td className="py-3 text-pp-cream-muted">{c.email}</td>
                            <td className="py-3 text-pp-cream-muted capitalize">{c.service || '-'}</td>
                            <td className="py-3 text-pp-cream-muted">{new Date(c.created_at).toLocaleDateString('pt-AO')}</td>
                            <td className="py-3">
                              <span className={`text-[10px] uppercase px-2 py-0.5 rounded-sm ${c.status === 'new' ? 'bg-yellow-500/10 text-yellow-400' : c.status === 'read' ? 'bg-blue-500/10 text-blue-400' : c.status === 'replied' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{c.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="card-dark p-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream mb-4">Ações Rápidas</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <button onClick={() => setShowNewEventModal(true)} className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30 cursor-pointer"><Calendar size={20} className="text-pp-gold" /><span className="text-sm font-medium text-pp-cream">Novo Evento</span></button>
                  <button onClick={() => setShowNewClientModal(true)} className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30 cursor-pointer"><Briefcase size={20} className="text-pp-gold" /><span className="text-sm font-medium text-pp-cream">Novo Cliente</span></button>
                  <button onClick={() => { setActiveTab('reports'); showToast('A gerar relatório...'); }} className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30 cursor-pointer"><BarChart3 size={20} className="text-pp-gold" /><span className="text-sm font-medium text-pp-cream">Gerar Relatório</span></button>
                </div>
              </div>
            </>
          )}

          {/* EVENTS */}
          {activeTab === 'events' && (
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream">Todos os Eventos</h3>
                <button onClick={() => setShowNewEventModal(true)} className="flex items-center gap-2 px-4 py-2 bg-pp-gold text-pp-dark font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-gold-light transition-all"><Plus size={14} /> Novo Evento</button>
              </div>
              {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : filteredEvents.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">{searchQuery ? 'Nenhum evento encontrado' : 'Sem eventos'}</div> : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-[10px] text-pp-cream-dim uppercase tracking-wider border-b border-pp-border/20">
                        <th className="pb-3 font-medium">Nome</th><th className="pb-3 font-medium">Cliente</th><th className="pb-3 font-medium">Tipo</th><th className="pb-3 font-medium">Data</th><th className="pb-3 font-medium">Estado</th><th className="pb-3 font-medium text-right">Acções</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredEvents.map((e) => (
                        <tr key={e.id} className="border-b border-pp-border/10 hover:bg-pp-dark-3/30 transition-colors">
                          <td className="py-3 text-pp-cream">{e.name}</td>
                          <td className="py-3 text-pp-cream-muted">{e.client}</td>
                          <td className="py-3 text-pp-cream-muted capitalize">{e.event_type}</td>
                          <td className="py-3 text-pp-cream-muted">{e.event_date}</td>
                          <td className="py-3"><span className={`text-[10px] uppercase px-2 py-0.5 rounded-sm ${STATUS_TEXT[e.status]?.replace('text-', 'bg-').replace('400', '500/10 text-') || 'bg-gray-500/10 text-gray-400'}`}>{e.status}</span></td>
                          <td className="py-3 text-right">
                            <button onClick={() => handleEditEvent(e)} className="text-pp-cream-dim hover:text-pp-gold mr-3" title="Editar"><Pencil size={14} /></button>
                            <button onClick={() => handleDeleteEvent(e.id)} className="text-pp-cream-dim hover:text-red-400" title="Eliminar"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CLIENTS */}
          {activeTab === 'clients' && (
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream">Todos os Contactos</h3>
                <button onClick={() => setShowNewClientModal(true)} className="flex items-center gap-2 px-4 py-2 bg-pp-gold text-pp-dark font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-gold-light transition-all"><Plus size={14} /> Novo Contacto</button>
              </div>
              {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : filteredContacts.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">{searchQuery ? 'Nenhum contacto encontrado' : 'Sem contactos'}</div> : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-[10px] text-pp-cream-dim uppercase tracking-wider border-b border-pp-border/20">
                        <th className="pb-3 font-medium">Nome</th><th className="pb-3 font-medium">Email</th><th className="pb-3 font-medium">Serviço</th><th className="pb-3 font-medium">Data</th><th className="pb-3 font-medium">Estado</th><th className="pb-3 font-medium text-right">Acções</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredContacts.map((c) => (
                        <tr key={c.id} className="border-b border-pp-border/10 hover:bg-pp-dark-3/30 transition-colors">
                          <td className="py-3 text-pp-cream">{c.name}</td>
                          <td className="py-3 text-pp-cream-muted">{c.email}</td>
                          <td className="py-3 text-pp-cream-muted capitalize">{c.service || '-'}</td>
                          <td className="py-3 text-pp-cream-muted">{new Date(c.created_at).toLocaleDateString('pt-AO')}</td>
                          <td className="py-3"><span className={`text-[10px] uppercase px-2 py-0.5 rounded-sm ${c.status === 'new' ? 'bg-yellow-500/10 text-yellow-400' : c.status === 'read' ? 'bg-blue-500/10 text-blue-400' : c.status === 'replied' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{c.status}</span></td>
                          <td className="py-3 text-right">
                            <button onClick={() => handleEditContact(c)} className="text-pp-cream-dim hover:text-pp-gold mr-3" title="Editar"><Pencil size={14} /></button>
                            <button onClick={() => handleDeleteContact(c.id)} className="text-pp-cream-dim hover:text-red-400" title="Eliminar"><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg font-semibold text-pp-cream">Administradores do Sistema</h3>
                  <button onClick={() => setShowNewAdminModal(true)} className="flex items-center gap-2 px-4 py-2 bg-pp-gold text-pp-dark font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-gold-light transition-all"><UserPlus size={14} /> Novo Admin</button>
                </div>
                {adminUsers.length === 0 ? (
                  <div className="text-center py-8 text-pp-cream-dim text-sm">
                    <p>A carregar utilizadores...</p>
                    <button onClick={loadAdminUsers} className="mt-3 px-4 py-2 bg-pp-gold/10 text-pp-gold text-[11px] tracking-wider uppercase hover:bg-pp-gold/20 transition-all">Actualizar</button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-[10px] text-pp-cream-dim uppercase tracking-wider border-b border-pp-border/20">
                          <th className="pb-3 font-medium">Email</th><th className="pb-3 font-medium">Criado em</th><th className="pb-3 font-medium text-right">Acções</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {adminUsers.map((u) => (
                          <tr key={u.id} className="border-b border-pp-border/10 hover:bg-pp-dark-3/30 transition-colors">
                            <td className="py-3 text-pp-cream">{u.email}</td>
                            <td className="py-3 text-pp-cream-muted">{new Date(u.created_at).toLocaleDateString('pt-AO')}</td>
                            <td className="py-3 text-right">
                              <button onClick={() => handleDeleteAdmin(u.id)} className="text-red-400 hover:text-red-300 transition-colors" title="Eliminar"><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="card-dark p-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream mb-4">Segurança</h3>
                <div className="space-y-3 text-sm text-pp-cream-muted">
                  <p>• A password é armazenada com hash bcrypt de forma segura.</p>
                  <p>• Não é possível eliminar o último administrador do sistema.</p>
                  <p>• Novos administradores têm acesso total ao painel.</p>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream mb-4">Resumo Estatístico</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {statCards.map((stat, i) => (
                    <div key={i} className="bg-pp-dark-3/50 p-5 rounded-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-8 h-8 rounded-sm bg-pp-gold/10 flex items-center justify-center"><stat.icon size={16} className="text-pp-gold" /></div>
                        <div className={`flex items-center gap-1 text-[10px] ${stat.up ? 'text-green-400' : 'text-red-400'}`}>{stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{stat.change}</div>
                      </div>
                      <p className="font-serif text-xl font-semibold text-pp-cream">{stat.value}</p>
                      <p className="text-[10px] text-pp-cream-dim font-sans mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-dark p-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream mb-4">Relatórios Disponíveis</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Relatório de Eventos do Mês', desc: 'Resumo de todos os eventos realizados e agendados' },
                    { label: 'Relatório de Contactos', desc: 'Análise de leads e conversões de contactos' },
                    { label: 'Relatório Financeiro', desc: 'Receitas e despesas do período' },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between p-4 bg-pp-dark-3/50 rounded-sm hover:bg-pp-dark-3 transition-colors">
                      <div className="flex items-center gap-3"><FileText size={18} className="text-pp-gold" /><div><p className="text-sm font-medium text-pp-cream">{r.label}</p><p className="text-[10px] text-pp-cream-dim">{r.desc}</p></div></div>
                      <button onClick={() => showToast(`A gerar: ${r.label}`)} className="px-4 py-1.5 bg-pp-gold/10 text-pp-gold text-[10px] tracking-wider uppercase hover:bg-pp-gold/20 transition-all">Gerar</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg font-semibold text-pp-cream">Gerir Conteúdo do Site</h3>
                  <button onClick={loadSiteContent} className="px-4 py-2 bg-pp-gold text-pp-dark font-semibold text-[11px] tracking-wider uppercase hover:bg-pp-gold-light transition-all">Actualizar</button>
                </div>
                {contentLoading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : siteContent.length === 0 ? (
                  <div className="text-center py-8 text-pp-cream-dim text-sm"><p>Sem conteúdo. Clique em Actualizar para carregar.</p></div>
                ) : (
                  <div className="space-y-6">
                    {Array.from(new Set(siteContent.map(c => c.section))).map(section => (
                      <div key={section}>
                        <h4 className="text-xs font-sans text-pp-cream-dim uppercase tracking-wider mb-3 border-b border-pp-border/20 pb-2">{section}</h4>
                        <div className="space-y-3">
                          {siteContent.filter(c => c.section === section).map(item => (
                            <div key={item.id} className="grid sm:grid-cols-[200px_1fr_auto] gap-3 items-start">
                              <label className="text-sm text-pp-cream-muted pt-2.5">{item.key}</label>
                              <textarea defaultValue={item.value} rows={item.value.length > 80 ? 3 : 1} className="w-full bg-pp-dark-3 border border-pp-border/30 px-3 py-2 text-sm text-pp-cream placeholder:text-pp-cream-dim/50 focus:border-pp-gold/50 focus:outline-none transition-colors resize-y" id={`content-${item.id}`} />
                              <button onClick={() => { const el = document.getElementById(`content-${item.id}`) as HTMLTextAreaElement; if (el) handleContentSave(item.id, item.section, item.key, el.value); }} className="px-4 py-2 bg-pp-gold/10 text-pp-gold text-[10px] tracking-wider uppercase hover:bg-pp-gold/20 transition-all whitespace-nowrap">Guardar</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div className="card-dark p-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream mb-6">Informações da Conta</h3>
                <div className="space-y-4">
                  <div><label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Nome</label><input type="text" value="Lucíria Meury Rodrigues de Sousa" disabled className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream opacity-60" /></div>
                  <div><label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Email</label><input type="text" value="admin@primeprotocol.ao" disabled className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream opacity-60" /></div>
                  <div><label className="block text-[10px] font-sans text-pp-cream-dim uppercase tracking-wider mb-2">Cargo</label><input type="text" value="Fundadora & CEO / Administrador" disabled className="w-full bg-pp-dark-3 border border-pp-border/30 px-4 py-2.5 text-sm text-pp-cream opacity-60" /></div>
                </div>
              </div>
              <div className="card-dark p-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream mb-6">Preferências do Sistema</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-pp-border/10">
                    <div><p className="text-sm text-pp-cream">Notificações por Email</p><p className="text-[10px] text-pp-cream-dim">Receber alertas quando novos contactos chegam</p></div>
                    <button onClick={() => showToast('Preferência actualizada')} className="w-10 h-6 bg-pp-gold rounded-full relative cursor-pointer"><span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div><p className="text-sm text-pp-cream">Modo Escuro</p><p className="text-[10px] text-pp-cream-dim">Interface sempre em modo escuro</p></div>
                    <button onClick={() => showToast('O modo escuro está sempre activo')} className="w-10 h-6 bg-pp-gold rounded-full relative cursor-pointer"><span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
