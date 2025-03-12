import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../../api";
import styles from "./videoPage.module.css";
import Menu from "../../components/menu/menu";
import ReactPlayer from "react-player";
import { FiArrowLeftCircle } from "react-icons/fi";

function VideoPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const [idRepo, setIdRepo] = useState(state?.id);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState({}); // Add state for video information
  const hasFetchedVideo = useRef(false);
  const navigate = useNavigate();

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

  const handleClick = () => {
    if(idRepo != null) { 
      navigate(`/repository/${idRepo}`);
    } else {
      navigate(`/ultimasAnalises`)
    }
  };

  return (
    <>
      <Menu />
      <div className={styles.videoContainer}>
        <div className={styles.repoFlex}>
          <FiArrowLeftCircle
            className={styles.iconBack}
            style={{ minWidth: "30px", minHeight: "30px", cursor: "pointer" }}
            onClick={handleClick}
          />
          <h3>Detalhes do Vídeo</h3>
        </div>
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
