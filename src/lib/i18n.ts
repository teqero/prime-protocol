// Re-exporta tudo do AppContext para manter compatibilidade com imports existentes
export { useAppContext as useLang, AppProvider, type Lang } from '../context/AppContext';

export function initLang() {
  // Nop — a inicialização agora é feita dentro do AppProvider
}
