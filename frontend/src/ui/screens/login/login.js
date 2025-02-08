import React, { useState } from 'react';
import styles from './login.module.css';
import api from '../../../api'
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants'

function Login() {
  const [username, setUsername] = useState('') // Estado que armazena o nome de usuário
  const [password, setPassword] = useState('') // Estado que armazena a senha
  const [loading, setLoading] = useState(false) // Estado que armazena se o formulário está sendo submetido
  const navigate = useNavigate() // Hook do React Router que retorna a função de navegação

  // Função que realiza a submissão do formulário
  const handleSubmit = async (e) => {
    setLoading(true) // Define que o formulário está sendo submetido
    e.preventDefault() // Previne o comportamento padrão do formulário de recarregar a página
    
    try {
      // Realiza a requisição para obter o token de acesso
      const response = await api.post('app/token/', { username, password })
      localStorage.setItem(ACCESS_TOKEN, response.data.access)
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
      navigate('/') // Navega para a página inicial
     
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false) // Define que o formulário não está mais sendo submetido
    }
  }

  // Renderiza o formulário de login
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Gerenciador de vídeos de IA</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email or Username</label>
            <input 
              type="text" 
              id="email" 
              placeholder="Your email or username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza o estado do nome de usuário conforme o usuário digita
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha conforme o usuário digita
            />
          </div>
          <button type="submit" className={styles.button}>Sign In</button>
        </form>
        <p className={styles.signupPrompt}>
          Don’t have an account?{' '}
          <Link to="/cadastro">Click here to sign up.</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;