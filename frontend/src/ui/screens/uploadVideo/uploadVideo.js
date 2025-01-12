import React from 'react';
import styles from './uploadVideo.module.css';
import './../../../index.css';
import { FiUpload } from "react-icons/fi";
import Menu from '../../components/menu/menu';

function UploadVideo() {
    return (
      <>
        <Menu />
        <div className={styles.mainUploadVideo}>
          <div className={styles.scopeUploadVideo}>
              <h1>Upload de Vídeo</h1>
              <div className={styles.line}></div>
              <div className={styles.titleInput}>
                <label>Título</label>
                <input className={styles.inputInformationTitle}></input>
              </div>
              <div className={styles.descriptionInput}>
                <label>Descrição</label>
                <textarea className={styles.inputInformationDescription}></textarea>
              </div>
              <div className={styles.line}></div>
              <div className={styles.videoFileUpload}>
                <h3>Selecione o arquivo de vídeo</h3>
                <input type='file' accept="video/*" className={styles.inputVideoFile}></input>
              </div>
              <div className={styles.line}></div>
              <button className={styles.buttonUploadVideo}>
                <FiUpload /> Enviar Vídeo
              </button>
          </div>
        </div>
      </>
    );
}

export default UploadVideo;
