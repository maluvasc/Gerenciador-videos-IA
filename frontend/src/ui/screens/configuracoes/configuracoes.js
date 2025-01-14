import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './configuracoes.module.css';
import { useNavigate } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { FiLock } from 'react-icons/fi';
import { FiDelete } from 'react-icons/fi';

function Configuracoes() {

  return (
      <>
      <Menu />
      <div className={styles.mainProfile}>
        <div className={styles.titleFlex}>
            <h1 className={styles.titleFont}>Editar Perfil</h1>
            <FiUser style={{width: "30px", height: "30px"}} />
        </div>
        <div className={styles.line}></div>
        <div className={styles.flexFirstRow}>
            <div className={styles.flexFirstRowFirstColumn}>
            <label>Escolha a imagem do perfil</label>
            <label htmlFor="fileUpload" className={styles.uploadLabel}>
                <div className={styles.uploadBox}>
                    <span className={styles.uploadText}>+</span>
                </div>
            </label>
            <input
                type="file"
                id="fileUpload"
                className={styles.uploadInput}
                />
            </div>
            <div className={styles.flexFirstRowSecondColumn}>
            <div className={styles.nameInput}>
                <label>Nome</label>
                <input className={styles.inputInformationName}></input>
            </div>
            <div className={styles.userInput}>
                <label>User</label>
                <input className={styles.inputInformationUser}></input>
            </div>
            <div className={styles.nameInput}>
                <label>Email</label>
                <input className={styles.inputInformationName}></input>
            </div>
        </div>
        </div>
        <div className={styles.line}></div>

        <div className={styles.passwordContainer}>
            <div className={styles.titleFlex}>
                <h1 className={styles.titleFont}>Alterar Senha</h1>
                <FiLock style={{width: "30px", height: "30px"}} />
            </div>
            
            <div className={styles.flexFirstRowSecondColumn}>
                <div className={styles.userInput}>
                    <label>Senha Atual</label>
                    <input className={styles.inputInformationName}></input>
                </div>
                <div className={styles.userInput}>
                    <label>Nova Senha</label>
                    <input className={styles.inputInformationUser}></input>
                </div>
                <div className={styles.userInput}>
                    <label>Confimar Senha</label>
                    <input className={styles.inputInformationUser}></input>
                </div>
            </div>

            <div className={styles.line}></div>
        </div>
        
        <div className={styles.deleteContainer}>
            <div className={styles.titleFlex}>
                    <h1 className={styles.titleFont}>Deletar conta</h1>
                    <FiDelete style={{width: "30px", height: "30px"}} />
            </div>
            
            
            <div className={styles.noticeBox}>
                <p className={styles.noticeText}>
                Entendo perfeitamente que esta ação é irreversível e, caso eu deseje recuperar o acesso à plataforma no futuro, serei obrigado a enviar uma solicitação formal ao meu administrador de serviço para a criação de uma nova conta.
                </p>
            </div>
            <div class={styles.checkboxContainer}>
                <input type="checkbox" id="consent" />
                <label for="consent">Eu concordo com o aviso acima</label>
            </div>
            <button class={styles.deleteButton}>Deletar conta permanentemente</button>
            
            
        </div>

        <div className={styles.line}></div>
        </div>
    </>
    );
  }
  
  export default Configuracoes;