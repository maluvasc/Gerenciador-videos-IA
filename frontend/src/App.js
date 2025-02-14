import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Reports from './ui/screens/reports/reports';
import ProtectedRoute from './ui/components/ProtectedRoute';
import PageNotFound from './ui/screens/pageNotFound/pageNotFound';

// Função que realiza o logout do usuário
function Logout() {
  localStorage.clear() // Limpa o armazenamento local do navegador, apagando os tokens de acesso e atualização
  return <Navigate to="/login" /> // Navega para a página de login
}

// Função que realiza o logout do usuário e redireciona para a página de cadastro
function RegisterAndLogout() {
  localStorage.clear()
  return <Cadastro /> // Navega para a página de cadastro
}

// Função que renderiza as rotas da aplicação, definindo as rotas protegidas e as rotas públicas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cadastro" element={<RegisterAndLogout />} />
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute> } />
        <Route path="/notificacoes" element={<ProtectedRoute> <Notificacoes /> </ProtectedRoute>} />
        <Route path="/createRepository" element={<ProtectedRoute> <CreateRepository /> </ProtectedRoute>} />
        <Route path="/updateRepository" element={<ProtectedRoute> <UpdateRepository /> </ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute> <Configuracoes /> </ProtectedRoute>} />
        <Route path="/repository/:id" element={<ProtectedRoute> <Repository /> </ProtectedRoute>} />
        <Route path="/repositoryTrash" element={<ProtectedRoute> <RepositoryTrash /> </ProtectedRoute>} />
        <Route path="/ultimasAnalises" element={<ProtectedRoute> <UltimasAnalises /> </ProtectedRoute>} />
        <Route path="/uploadVideo" element={<ProtectedRoute> <UploadVideo /> </ProtectedRoute>} />
        <Route path="/busca-avancada" element={<ProtectedRoute> <AdvancedSearch /> </ProtectedRoute>} />
        <Route path="/videoPage/:id" element={<ProtectedRoute> <VideoPage /> </ProtectedRoute>} /> 
        <Route path="/relatorios" element={<ProtectedRoute> <Reports /> </ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;