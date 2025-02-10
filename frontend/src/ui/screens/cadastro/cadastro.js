import React, { useState } from "react";
import styles from "./cadastro.module.css";
import api from "../../../api";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
  const [username, setUsername] = useState(""); // Estado que armazena o nome de usuário
  const [email, setEmail] = useState(""); // Estado que armazena o email
  const [password, setPassword] = useState(""); // Estado que armazena a senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado que armazena a confirmação da senha
  const [loading, setLoading] = useState(false); // Estado que armazena se o formulário está sendo submetido
  const navigate = useNavigate(); // Hook do React Router que retorna a função de navegação
  const [errors, setErrors] = useState({});

  // Função que realiza a submissão do formulário
  const handleSubmit = async (e) => {
    setLoading(true); // Define que o formulário está sendo submetido
    e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página

    // Verifica se as senhas digitadas são iguais
    if (confirmPassword !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords don't match. Try again",
      }));
      return;
    }

    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least eight characters.",
      }));
      return;
    } else {
      try {
        // Realiza a requisição para cadastrar o usuário
        const response = await api.post("app/user/register/", {
          username,
          email,
          password,
        });
        alert("Usuário cadastrado com sucesso! Redirecionando para Login"); // Exibe um alerta de sucesso
        navigate("/login"); // Navega para a página de login
      } catch (error) {
        console.error(error);

        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          setErrors({
            general: "Erro inesperado. Tente novamente mais tarde.",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Renderiza o formulário de cadastro
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
              className={errors.username ? styles.errorInput : ""}
            />
            {errors.username && (
              <span className={styles.errorText}>{errors.username}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={errors.password ? styles.errorInput : ""}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              className={errors.confirmPassword ? styles.errorInput : ""}
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
