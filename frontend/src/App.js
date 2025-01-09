import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './ui/screens/main/home'
import CreateRepository from './ui/screens/createRepository/createRepository'
 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="createRepository" element={<CreateRepository />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
