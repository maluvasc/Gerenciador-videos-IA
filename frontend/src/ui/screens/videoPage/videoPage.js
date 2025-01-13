import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import styles from './videoPage.module.css';

function VideoPage() {
  const { id } = useParams();
  const videoName = "Nome do Vídeo";
  const videoDuration = "Duração do Vídeo"

  return (
    <>
      <Menu />
      <div className={styles.videoContainer}>
        <h3>Detalhes do Vídeo</h3>
        <div className={styles.line}></div>
        <div className={styles.videoDetails}>
          <div className={styles.videoThumbnail}></div>
          <div className={styles.videoInfo}>
            <h5 className={styles.backgroundStatistics}>Estatísticas do Vídeo</h5>
            <p><strong>Tem violência:</strong>{}</p>
            <p><strong>Violência contra mulher:</strong>{}</p>
            <p><strong>Duração da violência:</strong>{}</p>
            <p><strong>Início da violência:</strong>{}</p>
            <p><strong>Fim da violência:</strong>{}</p>
          </div>
        </div>
      </div>
      <div className={styles.textFlex}>
          <div className={styles.videoName}>{videoName}</div>
          <div className={styles.videoDuration}>{videoDuration}</div>
          <button className={styles.deleteButton}>Deletar Vídeo</button>
      </div>
    </>
  );
}

export default VideoPage;
