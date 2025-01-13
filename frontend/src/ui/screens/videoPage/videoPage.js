import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import styles from './videoPage.module.css';

function VideoPage() {
  const { id } = useParams();
  const videoName = "Nome do Vídeo Exemplo";

  return (
    <>
      <Menu />
      <div className={styles.videoContainer}>
        <h3>Detalhes do Vídeo {id}</h3>
        <div className={styles.videoDetails}>
          <div className={styles.videoThumbnail}>
            <div className={styles.videoName}>{videoName}</div> {/* Nome do vídeo na miniatura */}
          </div>
          <div className={styles.videoInfo}>
            <h4>Estatísticas do Vídeo</h4>
            <p>Tem violência: Não</p>
            <p>Violência contra mulher: Não</p>
            <p>Duração da violência: 0s</p>
            <p>Início da violência: --:--</p>
            <p>Fim da violência: --:--</p>
          </div>
        </div>
        <button className={styles.deleteButton}>Deletar Vídeo</button>
      </div>
    </>
  );
}

export default VideoPage;
