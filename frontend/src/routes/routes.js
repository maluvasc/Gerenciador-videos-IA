const menuRoutes = {
  home: { route: "", name: "Página Inicial", visible: true },
  uploadVideo: { route: "uploadVideo", name: "Upload de Vídeo", visible: true },
  ultimasAnalises: {
    route: "ultimasAnalises",
    name: "Últimas Análises",
    visible: true,
  },
  videoPage: {
    route: "videoPage/:id",
    name: "Detalhes do Vídeo",
    visible: false,
  },
};

export { menuRoutes };
