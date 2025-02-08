import React, { useState } from 'react';
import styles from './cadastro.module.css';
import api from '../../../api'
import { Link, useNavigate } from 'react-router-dom';


function Cadastro() {
  const [username, setUsername] = useState('') // Estado que armazena o nome de usuário
  const [email, setEmail] = useState('') // Estado que armazena o email
  const [password, setPassword] = useState('') // Estado que armazena a senha
  const [confirmPassword, setConfirmPassword] = useState('') // Estado que armazena a confirmação da senha
  const [loading, setLoading] = useState(false) // Estado que armazena se o formulário está sendo submetido
  const navigate = useNavigate() // Hook do React Router que retorna a função de navegação

  // Função que realiza a submissão do formulário
  const handleSubmit = async (e) => {
    setLoading(true) // Define que o formulário está sendo submetido
    e.preventDefault() // Previne o comportamento padrão do formulário de recarregar a página
    
    // Verifica se as senhas digitadas são iguais
    if (confirmPassword !== password) {
      alert('As senhas não coincidem')
      return
    } else {
      try {
        // Realiza a requisição para cadastrar o usuário
        const response = await api.post('app/user/register/', { username, email, password })
        alert('Usuário cadastrado com sucesso! Redirecionando para Login') // Exibe um alerta de sucesso
        navigate('/login') // Navega para a página de login
       
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
  }

// Renderiza o formulário de cadastro
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="Nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza o estado do nome de usuário conforme o usuário digita
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email conforme o usuário digita
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha conforme o usuário digita
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Repita a sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado da confirmação da senha conforme o usuário digita
            />
          </div>
          <button type="submit" className={styles.button}>Cadastrar</button>   
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
