import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './ui/screens/main/home'
import CreateRepository from './ui/screens/createRepository/createRepository.js'
import Notificacoes from './ui/screens/notificacoes/notificacoes.js'
import UpdateRepository from './ui/screens/updateRepository/updateRepository.js';
import Configuracoes from './ui/screens/configuracoes/configuracoes.js';
import Repository from './ui/screens/repository/repository.js';
import RepositoryTrash from './ui/screens/repositoryTrash/repositoryTrash.js';
import UltimasAnalises from './ui/screens/ultimasAnalises/ultimasAnalises.js';
import UploadVideo from './ui/screens/uploadVideo/uploadVideo';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="notificacoes" element={<Notificacoes />} />
      <Route path="createRepository" element={<CreateRepository />} />
      <Route path="updateRepository" element={<UpdateRepository />} />
      <Route path="configuracoes" element={<Configuracoes />} />
      <Route path="repository" element={<Repository />} />
      <Route path="repositoryTrash" element={<RepositoryTrash />} />
      <Route path="ultimasAnalises" element={<UltimasAnalises />} />
      <Route path="/uploadVideo" element={<UploadVideo />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
