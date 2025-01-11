import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './configuracoes.module.css';

function Configuracoes() {
    return (
      <>
      <Menu />
      <div className={styles.mainConfig}>
        <h1>Configurações</h1>
        <div className={styles.line}></div>
            <div className={styles.columnNotificacoes}>
            <div className={styles.configurationBox}><p>Editar perfil de usuário</p></div>
            <div className={styles.configurationBox}><p>Mudar senha</p></div>
            <div className={styles.configurationBox}><p>Deletar conta</p></div>
        </div>
      </div>
      </>
    );
  }
  
  export default Configuracoes;