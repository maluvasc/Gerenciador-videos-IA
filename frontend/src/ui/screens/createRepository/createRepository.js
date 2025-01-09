import React from 'react';
import styles from './createRepository.module.css';
import './../../../index.css';
import { FiAlertCircle } from "react-icons/fi";
import Menu from '../../components/menu/menu';

function CreateRepository() {
    return (
      <>
      <Menu />
      <div className={styles.mainCreateRepository}>
        <div className={styles.scopeCreateRepository}>
            <h1>Criar um novo repositório</h1>
            <div className={styles.line}></div>
            <div className={styles.nameInput}>
              <label>Nome</label>
              <input className={styles.inputInformationName}></input>
            </div>
            <div className={styles.descriptionInput}>
              <label>Descrição</label>
              <input className={styles.inputInformationDescription}></input>
            </div>
            <div className={styles.line}></div>
            <div className={styles.privateRepositoryInput}>
              <input type='checkbox' className={styles.inputInformationCheckbox}></input>
              <p>Repositório privado?</p>
            </div>
            <div className={styles.line}></div>
            <div className={styles.alertTextGroup}>
              <FiAlertCircle />
              <p>Você está criando um repositório em sua conta pessoal</p>
            </div>
            <div className={styles.line}></div>
            <button className={styles.buttonCreateRepository}>Criar repositório</button>
            <div className={styles.repositoryImageUpload}>
              <h3>Imagem do repositório</h3>
              <input type='file'></input>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default CreateRepository;