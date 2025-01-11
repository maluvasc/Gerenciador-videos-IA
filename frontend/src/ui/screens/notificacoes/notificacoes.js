import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './notificacoes.module.css';

function Notificacoes() {
    return (
      <>
      <Menu />
      <div className={styles.mainNotificacoes}>
        <h1>Notificações</h1>
        <div className={styles.line}></div>
        <div className={styles.columnNotificacoes}>
        <div className={styles.notificacoesButtonInput}>
            <input type='text' className={styles.inputNotificacoes} placeholder='Buscar notificação...'></input>
            <button className={styles.buttonNotificacoes}>Pesquisar</button>
        </div>
        <div className={styles.notificationBox}><p>Exemplo de notificação</p></div>
        <div className={styles.notificationBox}><p>Exemplo de notificação</p></div>
        <div className={styles.notificationBox}><p>Exemplo de notificação</p></div>
        <div className={styles.notificationBox}><p>Exemplo de notificação</p></div>
        <div className={styles.notificationBox}><p>Exemplo de notificação</p></div>
        </div>
      </div>
      </>
    );
  }
  
export default Notificacoes;