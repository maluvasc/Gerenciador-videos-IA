import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './editProfile.module.css';
import { useNavigate } from 'react-router-dom';
import { FiUser } from "react-icons/fi";

function EditProfile() {

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
        <div className={styles.secondRowFlex}>
            
        </div>
        <div className={styles.line}></div>
        </div>
    </>
    );
  }
  
  export default EditProfile;