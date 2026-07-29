# Prime Protocol — TO-DO List Completa

## ✅ CONCLUÍDO

### Infraestrutura & Deploy
- [x] Projeto React + Vite + Tailwind CSS configurado
- [x] Deploy no Render (`https://prime-protocol.onrender.com/`)
- [x] Repositório GitHub (`teqero/prime-protocol`)
- [x] Build sem erros de compilação

### Design & Frontend
- [x] Hero fiel ao Figma (foto CEO à direita, logo Figma no navbar)
- [x] ScrollReveal e Typewriter restaurados
- [x] Seção "Prime Protocol" com conteúdo institucional
- [x] Footer com ano automático (`© 2024 Prime Protocol...`)
- [x] Logo e imagens da CEO exportadas do Figma e commitadas
- [x] Layout responsivo básico

### Supabase — Banco de Dados
- [x] Tabela `events` (eventos)
- [x] Tabela `contacts` (contactos/leads)
- [x] Tabela `tasks` (tarefas)
- [x] Tabela `admin_credentials` (credenciais de login)
- [x] Tabela `admin_sessions` (sessões/tokens)
- [x] Tabela `site_content` (conteúdo editável do site)
- [x] Tabela `page_views` (analytics)
- [x] Tabela `newsletter_subscribers` (newsletter)
- [x] RLS ativado em todas as tabelas

### Autenticação
- [x] Edge Function `admin-auth` (/login, /verify, /logout)
- [x] Página de login (`/login`)
- [x] Proteção de rotas do admin
- [x] Logout funcional

### Admin Dashboard
- [x] Tab Dashboard (estatísticas, eventos recentes, tarefas, contactos)
- [x] Tab Eventos (lista completa + pesquisa)
- [x] Tab Clientes (lista completa + pesquisa)
- [x] Tab Conteúdo (editar `site_content`)
- [x] Tab Relatórios (resumo estatístico)
- [x] Tab Configurações (info da conta, preferências)
- [x] **Tab Utilizadores** — lista, criar e eliminar administradores
- [x] **Modal Novo Evento** — formulário real com insert na BD
- [x] **Modal Novo Contacto** — formulário real com insert na BD
- [x] **Modal Novo Administrador** — formulário real com hash bcrypt

### Funções SQL (RPC)
- [x] `list_admin_users()` — lista admins sem expor password_hash
- [x] `create_admin_user(email, password)` — cria admin com bcrypt
- [x] `delete_admin_user(id)` — elimina admin com proteção (mínimo 1)

---

## ⬜ EM FALTA / PENDENTE

### 🔴 CRÍTICO — Prioridade Alta

| # | Tarefa | Descrição |
|---|--------|-----------|
| 1 | **Verificar login de novos admins** | As funções SQL usam `crypt()` do pgcrypto, mas o Edge Function `admin-auth` original pode usar outro algoritmo. **Testar:** criar um novo admin no painel e tentar fazer login com ele. Se falhar, as funções de hash não são compatíveis. |
| 2 | **Corrigir erro de login `{}`** | O utilizador reportou `Erro ao entrar: {}`. Pode ser: (a) Edge Function `admin-auth` offline, (b) CORS bloqueando, (c) resposta vazia do servidor. Verificar logs do Edge Function no Supabase. |
| 3 | **Verificar imagens no Render** | Após o commit `24e4189` (remoção de `*.png` do `.gitignore`), as imagens foram pushadas. **Confirmar** se `https://prime-protocol.onrender.com/images/logo-figma.png` e `ceo-figma.png` carregam corretamente. |
| 4 | **Todos os menus/âncoras funcionais** | O utilizador pediu "dar vida a todos os menus". Verificar se todos os links de navegação do site público funcionam corretamente (scroll suave para secções, links de serviços, etc.). |

### 🟡 IMPORTANTE — Prioridade Média

| # | Tarefa | Descrição |
|---|--------|-----------|
| 5 | **Mobile layout conforme Figma** | Ajustar o layout mobile para corresponder ao design do Figma mobile. Verificar: navbar hamburger, hero em coluna, cards em 1 coluna, footer empilhado. |
| 6 | **Página 404 personalizada** | Quando o utilizador acede a `/login` diretamente ou outra rota inexistente, mostrar página 404 no estilo do site. |
| 7 | **Edição de eventos/contactos existentes** | No Admin, permitir editar e eliminar eventos e contactos já criados (não só criar novos). |
| 8 | **Paginação nas tabelas** | As tabelas de Eventos e Contactos podem crescer. Adicionar paginação (10/25/50 itens por página). |
| 9 | **Filtros nas tabelas** | Filtros por estado (pending/confirmed/completed) e por data. |
| 10 | **Upload de imagens no admin** | Permitir que a CEO mude a foto do Hero, logo, etc. diretamente pelo painel (usar Supabase Storage). |

### 🟢 DESEJÁVEL — Prioridade Baixa

| # | Tarefa | Descrição |
|---|--------|-----------|
| 11 | **Newsletter / Subscritores** | A tab Newsletter no admin para ver/exportar emails de subscritores. |
| 12 | **Analytics / Page Views** | Dashboard com gráficos de visitas ao site (usar dados da tabela `page_views`). |
| 13 | **Exportar dados (CSV/Excel)** | Botões para exportar eventos, contactos e subscritores para CSV. |
| 14 | **Notificações por email** | Quando um novo contacto chega, enviar email para o admin (usar Supabase Edge Functions + serviço de email). |
| 15 | **Formulário de contacto do site funcional** | O formulário na secção Contactos do site público deve gravar na tabela `contacts`. |
| 16 | **Subscrição de newsletter funcional** | O formulário de newsletter no site público deve gravar na tabela `newsletter_subscribers`. |
| 17 | **Multilingue (PT/EN)** | Adicionar toggle de idioma no site. |
| 18 | **SEO completo** | Meta tags, Open Graph, sitemap.xml, robots.txt. |
| 19 | **Página de detalhe de evento** | Cada evento ter uma página pública com galeria de fotos. |
| 20 | **Galeria de fotos** | Secção no site com fotos de eventos passados (usar Supabase Storage). |

---

## 🐛 BUGS CONHECIDOS

1. **Login retorna erro vazio `{}`** — Investigar Edge Function `admin-auth` e CORS.
2. **Hash de password pode ser incompatível** — O `admin-auth` original pode usar um algoritmo diferente de `pgcrypto crypt()`. Se novos admins não conseguirem fazer login, é necessário atualizar o Edge Function para usar o mesmo hash.
3. **tsconfig warning** — Foi resolvido movendo o ficheiro problemático, mas pode voltar se o Vite/tsconfig for alterado.

---

## 📋 PRÓXIMA AÇÃO RECOMENDADA

> **Testar o login com um novo administrador criado no painel.**
> 
> Se o login funcionar: seguir para ajustes mobile e menus.
> Se o login falhar: corrigir a compatibilidade de hash entre `admin-auth` Edge Function e as funções SQL RPC.
