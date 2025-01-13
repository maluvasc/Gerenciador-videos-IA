import React, { useContext, useState } from 'react';
import styles from './createRepository.module.css';
import './../../../index.css';
import { FiAlertCircle } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";
import Menu from '../../components/menu/menu';
import { useNavigate } from 'react-router-dom';

function CreateRepository() {

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/");
  };

    return (
      <>
      <Menu />
      <div className={styles.mainCreateRepository}>
        <div className={styles.scopeCreateRepository}>
            <div className={styles.iconH1Flex}>
                <FiArrowLeftCircle className={styles.iconBack} style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={handleClickHome}/>
                <h1 className={styles.h1UpdateRepository}>Criar novo repositório</h1>
            </div>
            <div className={styles.line}></div>
            <div className={styles.nameInput}>
              <label>Nome</label>
              <input className={styles.inputInformationName}></input>
            </div>
            <div className={styles.descriptionInput}>
              <label>Descrição</label>
              <input className={styles.inputInformationDescription}></input>
            </div>
            <div className={styles.line2}></div>
            <div className={styles.privateRepositoryInput}>
              <input type='checkbox' className={styles.inputInformationCheckbox}></input>
              <p>Repositório privado?</p>
            </div> 
            <div className={styles.collaboratorsInput}>
              <label>Colaboradores</label>
              <select name="collaborators" id="collaborators">
                <option>Escolha colaboradores</option>
              </select>
            </div>
            <div className={styles.alertTextGroup}>
              <FiAlertCircle />
              <p>Você está criando um repositório em sua conta pessoal</p>
            </div>
            <div className={styles.line3}></div>
            <button className={styles.buttonCreateRepository}>Criar repositório</button>
            <div className={styles.container}>
              <div className={styles.alinharColuna2}>
              <label>Escolha a imagem do repositório</label>
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
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default CreateRepository;