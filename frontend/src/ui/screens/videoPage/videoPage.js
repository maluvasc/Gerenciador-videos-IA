import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../../api"; // Ajuste conforme necessário
import styles from "./videoPage.module.css";
import Menu from "../../components/menu/menu";

function VideoPage() {
  const { id } = useParams();
  const videoUrl =
    "http://localhost:8000/media/videos/Vídeo_sem_título__Feito_com_o_Clipchamp_3.mp4";
  const videoName="Vídeo_sem_título__Feito_com_o_Clipchamp_3"

  /*
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await api.get(`app/videos/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        setVideoUrl(response.data.file[0]);
      } catch (error) {
        console.error("Erro ao carregar o vídeo:", error);
      }
    };

    fetchVideo();
  }, [id]);
  */
  return (
    <>
      <Menu />
      <div className={styles.videoContainer}>
        <h3>Detalhes do Vídeo</h3>
        <div className={styles.line}></div>
        <div className={styles.videoDetails}>
          <div className={styles.videoThumbnail}>
            <div>
              <video width="750" height="500" controls>
                <source
                  src={videoUrl}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div className={styles.videoInfo}>
            <h5 className={styles.backgroundStatistics}>
              Estatísticas do Vídeo
            </h5>
            <p>
              <strong>Tem violência:</strong>
              {}
            </p>
            <p>
              <strong>Violência contra mulher:</strong>
              {}
            </p>
            <p>
              <strong>Duração da violência:</strong>
              {}
            </p>
            <p>
              <strong>Início da violência:</strong>
              {}
            </p>
            <p>
              <strong>Fim da violência:</strong>
              {}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.textFlex}>
        <div className={styles.videoName}>{videoName}</div>
        <button className={styles.deleteButton}>Deletar Vídeo</button>
      </div>
    </>
  );
}

export default VideoPage;
