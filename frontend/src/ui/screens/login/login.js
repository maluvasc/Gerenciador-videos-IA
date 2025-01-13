import React from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';


function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Equipe Focus</h1>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email or Username</label>
            <input type="text" id="email" placeholder="Your email or username" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Your password" />
          </div>
          <Link to="/Home">
            <button type="submit" className={styles.button}>Sign In</button>
          </Link>
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
