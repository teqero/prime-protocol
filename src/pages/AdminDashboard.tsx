import { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import Logo from '../components/Logo';

const stats = [
  { label: 'Eventos do Mês', value: '24', change: '+12%', up: true, icon: Calendar },
  { label: 'Receita (AOA)', value: '4.2M', change: '+8%', up: true, icon: DollarSign },
  { label: 'Clientes Ativos', value: '48', change: '+5%', up: true, icon: Users },
  { label: 'Taxa de Conclusão', value: '96%', change: '+2%', up: true, icon: CheckCircle },
];

const recentEvents = [
  { name: 'Conferência Energia Angola', date: '28 Jul 2024', status: 'confirmado', client: 'Sonangol', type: 'Corporativo' },
  { name: 'Recepção Embaixador Portugal', date: '25 Jul 2024', status: 'confirmado', client: 'Embaixada', type: 'Diplomático' },
  { name: 'Lançamento Produto Unitel', date: '20 Jul 2024', status: 'concluído', client: 'Unitel', type: 'Corporativo' },
  { name: 'Workshop Protocolo', date: '15 Jul 2024', status: 'concluído', client: 'MIREX', type: 'Formação' },
  { name: 'Gala Beneficência', date: '10 Ago 2024', status: 'pendente', client: 'Fundação X', type: 'Social' },
];

const upcomingTasks = [
  { task: 'Confirmar catering - Evento Sonangol', deadline: '2 dias', priority: 'alta' },
  { task: 'Reunião com cliente - Embaixada', deadline: '3 dias', priority: 'média' },
  { task: 'Preparar materiais - Workshop', deadline: '5 dias', priority: 'média' },
  { task: 'Orçamento - Casamento privado', deadline: '1 semana', priority: 'baixa' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pp-dark-2 text-pp-cream font-sans">
      {/* Mobile Sidebar Toggle */}
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
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-pp-dark border-r border-pp-border/20 flex-shrink-0 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
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
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Calendar, label: 'Eventos', active: false },
              { icon: Users, label: 'Clientes', active: false },
              { icon: BarChart3, label: 'Relatórios', active: false },
              { icon: Settings, label: 'Configurações', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-pp-gold/10 text-pp-gold'
                    : 'text-pp-cream-muted hover:bg-pp-dark-3 hover:text-pp-cream'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-pp-border/20">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-[11px] text-pp-cream-dim hover:text-pp-gold transition-colors mb-2"
            >
              <ArrowLeft size={14} />
              Voltar ao site
            </a>
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

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6 lg:p-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-2xl lg:text-3xl font-light text-pp-cream">
                Painel de <span className="font-semibold">Controlo</span>
              </h1>
              <p className="text-pp-cream-dim text-sm mt-1">Bem-vinda de volta, Lucíria</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pp-cream-dim" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="bg-pp-dark-3 border border-pp-border/30 rounded-sm pl-9 pr-4 py-2 text-sm text-pp-cream placeholder:text-pp-cream-dim/50 focus:border-pp-gold/50 focus:outline-none w-64"
                />
              </div>
              <button className="w-10 h-10 rounded-sm bg-pp-dark-3 border border-pp-border/30 flex items-center justify-center text-pp-cream-dim hover:text-pp-gold relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pp-gold rounded-full" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="card-dark p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-pp-gold/10 flex items-center justify-center">
                    <stat.icon size={18} className="text-pp-gold" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.change}
                  </div>
                </div>
                <p className="font-serif text-2xl font-semibold text-pp-cream">{stat.value}</p>
                <p className="text-xs text-pp-cream-dim font-sans mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Events & Tasks */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Events */}
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream">Eventos Recentes</h3>
                <button className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todos</button>
              </div>
              <div className="space-y-3">
                {recentEvents.map((event, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-sm bg-pp-dark-3/50 hover:bg-pp-dark-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        event.status === 'confirmado' ? 'bg-green-400' :
                        event.status === 'concluído' ? 'bg-pp-gold' : 'bg-yellow-400'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-pp-cream">{event.name}</p>
                        <p className="text-[10px] text-pp-cream-dim">{event.client} · {event.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-pp-cream-muted">{event.date}</p>
                      <span className={`text-[10px] uppercase tracking-wider ${
                        event.status === 'confirmado' ? 'text-green-400' :
                        event.status === 'concluído' ? 'text-pp-gold' : 'text-yellow-400'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-semibold text-pp-cream">Tarefas Pendentes</h3>
                <button className="text-xs text-pp-gold hover:text-pp-gold-light transition-colors">Ver todas</button>
              </div>
              <div className="space-y-3">
                {upcomingTasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-sm bg-pp-dark-3/50 hover:bg-pp-dark-3 transition-colors">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
                      task.priority === 'alta' ? 'bg-red-500/10' :
                      task.priority === 'média' ? 'bg-yellow-500/10' : 'bg-green-500/10'
                    }`}>
                      {task.priority === 'alta' ? <AlertCircle size={14} className="text-red-400" /> :
                       task.priority === 'média' ? <Clock size={14} className="text-yellow-400" /> :
                       <CheckCircle size={14} className="text-green-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-pp-cream truncate">{task.task}</p>
                      <p className="text-[10px] text-pp-cream-dim mt-0.5">Prazo: {task.deadline}</p>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      task.priority === 'alta' ? 'bg-red-500/10 text-red-400' :
                      task.priority === 'média' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-dark p-6">
            <h3 className="font-serif text-lg font-semibold text-pp-cream mb-4">Ações Rápidas</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30">
                <Calendar size={20} className="text-pp-gold" />
                <span className="text-sm font-medium text-pp-cream">Novo Evento</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30">
                <Briefcase size={20} className="text-pp-gold" />
                <span className="text-sm font-medium text-pp-cream">Novo Cliente</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-pp-dark-3 rounded-sm hover:bg-pp-gold/10 transition-colors border border-pp-border/20 hover:border-pp-gold/30">
                <BarChart3 size={20} className="text-pp-gold" />
                <span className="text-sm font-medium text-pp-cream">Gerar Relatório</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
