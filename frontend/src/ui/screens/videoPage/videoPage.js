import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../../api";
import styles from "./videoPage.module.css";
import Menu from "../../components/menu/menu";
import ReactPlayer from "react-player";

function VideoPage() {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState({}); // Add state for video information
  const hasFetchedVideo = useRef(false);

  useEffect(() => {
    const fetchVideo = async () => {
      if (hasFetchedVideo.current) return;
      hasFetchedVideo.current = true;

      try {
        console.log(`Fetching video with ID: ${id}`); // Log para verificar o ID do vídeo
        const response = await api.get(`/app/videos/${id}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Full API Response:", response); // Adicionar log para verificar a resposta completa da API
        console.log("Response Data:", response.data); // Adicionar log para verificar o campo data da resposta

        if (!response.data || Object.keys(response.data).length === 0) {
          console.error("Nenhum dado encontrado para o vídeo.");
          setVideoUrl(null);
          setVideoInfo({});
        } else {
          const videoFile = response.data.file;
          console.log("Video URL:", videoFile); // Adicionar log para verificar o valor de videoUrl
          setVideoUrl(videoFile);
          setVideoInfo(response.data); // Set video information state
        }
      } catch (error) {
        console.error("Erro ao carregar o vídeo:", error);
        setVideoUrl(null);
        setVideoInfo({});
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <>
      <Menu />
      <div className={styles.videoContainer}>
        <h3>Detalhes do Vídeo</h3>
        <div className={styles.line}></div>
        <div className={styles.videoDetails}>
          <div className={styles.videoThumbnail}>
            <div>
              <ReactPlayer
                url={videoUrl}
                controls={true}
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className={styles.videoInfo}>
            <h5 className={styles.backgroundStatistics}>
              Estatísticas do Vídeo
            </h5>
            <p>
              <strong>Tem violência:</strong>
              {videoInfo.hasViolence ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Violência contra mulher:</strong>
              {videoInfo.violenceAgainstWomen ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Duração da violência:</strong>
              {videoInfo.violenceDuration || "N/A"}
            </p>
            <p>
              <strong>Início da violência:</strong>
              {videoInfo.violenceStart || "N/A"}
            </p>
            <p>
              <strong>Fim da violência:</strong>
              {videoInfo.violenceEnd || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.textFlex}>
        <div className={styles.videoName}>{videoInfo.name}</div>
        <button className={styles.deleteButton}>Deletar Vídeo</button>
      </div>
    </>
  );
}

export default VideoPage;
