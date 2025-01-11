import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './ui/screens/main/home'
import CreateRepository from './ui/screens/createRepository/createRepository.js'
import Notificacoes from './ui/screens/notificacoes/notificacoes.js'
 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="notificacoes" element={<Notificacoes />} />
      <Route path="createRepository" element={<CreateRepository />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
