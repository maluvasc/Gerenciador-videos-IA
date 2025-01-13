import React, { useState } from 'react';
import styles from './cadastro.module.css';
import { Link } from 'react-router-dom';

function Cadastro() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Cadastre-se</h1>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="Nome">Nome</label>
            <input type="text" id="nome" placeholder="Digite seu nome" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="Email">Email</label>
            <input type="text" id="email" placeholder="Digite seu email" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Confirmar Senha</label>
            <input type="password" id="password" placeholder="Repita a sua senha" />
          </div>
          <Link to="/">
            <button type="submit" className={styles.button}>Cadastrar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
