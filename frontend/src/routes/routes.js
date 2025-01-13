const menuRoutes = {
  home: { route: '', name: 'Página Inicial', visible: true },
  uploadVideo: { route: 'uploadVideo', name: 'Upload de Vídeo', visible: true },
  pesquisaAvancada: { route: 'busca-avancada', name: 'Busca Avançada', visible: true },
  ultimasAnalises: { route: 'ultimasAnalises', name: 'Últimas Análises', visible: true },
  suporte: { route: 'suporte', name: 'Suporte', visible: true },
  videoPage: { route: 'videoPage/:id', name: 'Detalhes do Vídeo', visible: false },// Exemplo para adicionar ao menu
  login: { route: 'login', name: 'Login', visible: true }
};

export { menuRoutes };
