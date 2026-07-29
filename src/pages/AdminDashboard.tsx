import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Calendar, Users, BarChart3, Settings, Bell, Search, Menu, X,
  TrendingUp, TrendingDown, DollarSign, Briefcase, CheckCircle, Clock, AlertCircle,
  ArrowLeft, LogOut,
} from 'lucide-react';
import { supabase, adminLogout } from '../lib/supabase';
import Logo from '../components/Logo';

type Event = { id: string; name: string; event_date: string; status: string; client: string; event_type: string };
type Task = { id: string; task: string; deadline: string; priority: string; status: string };
type Contact = { id: string; name: string; email: string; service: string; status: string; created_at: string };

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState({ eventsMonth: 24, revenue: '4.2M', activeClients: 48, completionRate: '96%' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, tasksRes, contactsRes] = await Promise.all([
        supabase.from('events').select('*').order('event_date', { ascending: false }),
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
      ]);
      if (eventsRes.data) setEvents(eventsRes.data);
      if (tasksRes.data) setTasks(tasksRes.data);
      if (contactsRes.data) setContacts(contactsRes.data);

      const confirmed = eventsRes.data?.filter((e: Event) => e.status === 'confirmed').length || 0;
      const completed = eventsRes.data?.filter((e: Event) => e.status === 'completed').length || 0;
      const total = eventsRes.data?.length || 1;
      setStats({
        eventsMonth: eventsRes.data?.length || 0,
        revenue: '4.2M',
        activeClients: eventsRes.data ? [...new Set(eventsRes.data.map((e: Event) => e.client).filter(Boolean))].length : 0,
        completionRate: `${Math.round(((completed + confirmed) / total) * 100)}%`,
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('pp_admin_token');
    if (token) {
      await adminLogout(token);
    }
    localStorage.removeItem('pp_admin_token');
    window.location.href = '/login';
  };

  const statCards = [
    { label: 'Eventos do Mês', value: stats.eventsMonth.toString(), change: '+12%', up: true, icon: Calendar },
    { label: 'Receita (AOA)', value: stats.revenue, change: '+8%', up: true, icon: DollarSign },
    { label: 'Clientes Ativos', value: stats.activeClients.toString(), change: '+5%', up: true, icon: Users },
    { label: 'Taxa de Conclusão', value: stats.completionRate, change: '+2%', up: true, icon: CheckCircle },
  ];

  const getStatusColor = (s: string) => ({ confirmed: 'bg-green-400', completed: 'bg-pp-gold', pending: 'bg-yellow-400', cancelled: 'bg-red-400' })[s] || 'bg-gray-400';
  const getStatusText = (s: string) => ({ confirmed: 'text-green-400', completed: 'text-pp-gold', pending: 'text-yellow-400', cancelled: 'text-red-400' })[s] || 'text-gray-400';
  const getPriority = (p: string) => ({ high: 'bg-red-500/10 text-red-400', medium: 'bg-yellow-500/10 text-yellow-400' })[p] || 'bg-green-500/10 text-green-400';

  return (
    <div className="min-h-screen bg-pp-dark-2 text-pp-cream font-sans">
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-pp-dark border-b border-pp-border/20 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-pp-gold/40 flex items-center justify-center">
            <Logo size={28} />
          </div>
          <span className="font-serif text-sm font-semibold uppercase">Prime Protocol</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-pp-cream">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex pt-16 lg:pt-0">
        <aside className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-pp-dark border-r border-pp-border/20 flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 border-b border-pp-border/20 hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-pp-gold/40 flex items-center justify-center">
              <Logo size={32} />
            </div>
            <div>
              <span className="font-serif text-sm font-semibold uppercase block">Prime Protocol</span>
              <span className="text-[10px] text-pp-cream-dim tracking-wider">Painel Administrativo</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[{ icon: LayoutDashboard, label: 'Dashboard', active: true }, { icon: Calendar, label: 'Eventos', active: false }, { icon: Users, label: 'Clientes', active: false }, { icon: BarChart3, label: 'Relatórios', active: false }, { icon: Settings, label: 'Configurações', active: false }].map((item) => (
              <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${item.active ? 'bg-pp-gold/10 text-pp-gold' : 'text-pp-cream-muted hover:bg-pp-dark-3 hover:text-pp-cream'}`}>
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-pp-border/20">
            <a href="/" className="flex items-center gap-2 px-4 py-2 text-[11px] text-pp-cream-dim hover:text-pp-gold transition-colors mb-2">
              <ArrowLeft size={14} /> Voltar ao site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-[11px] text-red-400 hover:text-red-300 transition-colors mb-2 w-full">
              <LogOut size={14} /> Sair
            </button>
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-pp-gold/20 flex items-center justify-center">
                <span className="font-serif text-sm text-pp-gold font-semibold">LM</span>
              </div>
              <div>
                <p className="text-sm font-medium text-pp-cream">Lucíria Meury Rodrigues de Sousa</p>
                <p className="text-[10px] text-pp-cream-dim">Administrador</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-6 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-2xl lg:text-3xl font-light text-pp-cream">Painel de <span className="font-semibold">Controlo</span></h1>
              <p className="text-pp-cream-dim text-sm mt-1">Bem-vinda de volta, Lucíria</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pp-cream-dim" />
                <input type="text" placeholder="Pesquisar..." className="bg-pp-dark-3 border border-pp-border/30 rounded-sm pl-9 pr-4 py-2 text-sm text-pp-cream placeholder:text-pp-cream-dim/50 focus:border-pp-gold/50 focus:outline-none w-64" />
              </div>
              <button className="w-10 h-10 rounded-sm bg-pp-dark-3 border border-pp-border/30 flex items-center justify-center text-pp-cream-dim hover:text-pp-gold relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pp-gold rounded-full" />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <div key={i} className="card-dark p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-pp-gold/10 flex items-center justify-center"><stat.icon size={18} className="text-pp-gold" /></div>
                  <div className={`flex items-center gap-1 text-xs ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{stat.change}
                  </div>
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
                <button className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todos</button>
              </div>
              {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : events.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">Sem eventos</div> : (
                <div className="space-y-3">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-sm bg-pp-dark-3/50 hover:bg-pp-dark-3 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)}`} />
                        <div>
                          <p className="text-sm font-medium text-pp-cream">{event.name}</p>
                          <p className="text-[10px] text-pp-cream-dim">{event.client} · {event.event_type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-pp-cream-muted">{event.event_date}</p>
                        <span className={`text-[10px] uppercase tracking-wider ${getStatusText(event.status)}`}>{event.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream">Tarefas Pendentes</h3>
                <button className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todas</button>
              </div>
              {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : tasks.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">Sem tarefas</div> : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 rounded-sm bg-pp-dark-3/50 hover:bg-pp-dark-3 transition-colors">
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${getPriority(task.priority).split(' ')[0]}`}>
                        {task.priority === 'high' ? <AlertCircle size={14} className="text-red-400" /> : task.priority === 'medium' ? <Clock size={14} className="text-yellow-400" /> : <CheckCircle size={14} className="text-green-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-pp-cream truncate">{task.task}</p>
                        <p className="text-[10px] text-pp-cream-dim mt-0.5">Prazo: {task.deadline}</p>
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${getPriority(task.priority)}`}>{task.priority}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card-dark p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-semibold text-pp-cream">Contactos Recentes</h3>
              <button className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todos</button>
            </div>
            {loading ? <div className="text-center py-8 text-pp-cream-dim text-sm">A carregar...</div> : contacts.length === 0 ? <div className="text-center py-8 text-pp-cream-dim text-sm">Sem contactos</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] text-pp-cream-dim uppercase tracking-wider border-b border-pp-border/20">
                      <th className="pb-3 font-medium">Nome</th><th className="pb-3 font-medium">Email</th><th className="pb-3 font-medium">Serviço</th><th className="pb-3 font-medium">Data</th><th className="pb-3 font-medium">Estado</th>
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
              <button className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30"><Calendar size={20} className="text-pp-gold" /><span className="text-sm font-medium text-pp-cream">Novo Evento</span></button>
              <button className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30"><Briefcase size={20} className="text-pp-gold" /><span className="text-sm font-medium text-pp-cream">Novo Cliente</span></button>
              <button className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30"><BarChart3 size={20} className="text-pp-gold" /><span className="text-sm font-medium text-pp-cream">Gerar Relatório</span></button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
