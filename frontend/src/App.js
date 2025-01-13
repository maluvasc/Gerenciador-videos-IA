import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './ui/screens/main/home';
import CreateRepository from './ui/screens/createRepository/createRepository';
import Notificacoes from './ui/screens/notificacoes/notificacoes';
import UpdateRepository from './ui/screens/updateRepository/updateRepository';
import Configuracoes from './ui/screens/configuracoes/configuracoes';
import Repository from './ui/screens/repository/repository';
import RepositoryTrash from './ui/screens/repositoryTrash/repositoryTrash';
import UltimasAnalises from './ui/screens/ultimasAnalises/ultimasAnalises';
import UploadVideo from './ui/screens/uploadVideo/uploadVideo';
import AdvancedSearch from './ui/screens/advancedSearch/AdvancedSearch';
import VideoPage from './ui/screens/videoPage/videoPage';
import Login from './ui/screens/login/login';
import Cadastro from './ui/screens/cadastro/cadastro';
import EditProfile from './ui/screens/editProfile/editProfile';
import Reports from './ui/screens/reports/reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="notificacoes" element={<Notificacoes />} />
        <Route path="createRepository" element={<CreateRepository />} />
        <Route path="updateRepository" element={<UpdateRepository />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="repository" element={<Repository />} />
        <Route path="repositoryTrash" element={<RepositoryTrash />} />
        <Route path="ultimasAnalises" element={<UltimasAnalises />} />
        <Route path="uploadVideo" element={<UploadVideo />} />
        <Route path="busca-avancada" element={<AdvancedSearch />} />
        <Route path="videoPage/:id" element={<VideoPage />} /> 
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="editarPerfil" element={<EditProfile />} />
        <Route path="relatorios" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
