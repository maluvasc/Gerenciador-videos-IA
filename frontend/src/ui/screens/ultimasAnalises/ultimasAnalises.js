import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu/menu';
import styles from './ultimasAnalises.module.css';
import { useNavigate } from 'react-router-dom';
import api from "../../../api";

function Cards({ videoName, isAnalised, videoUrl, videoId, repoId }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const navigate = useNavigate();

  const truncatedName =
    videoName.length > 20 ? videoName.substring(0, 20) + "..." : videoName;

    console.log("URL do vídeo:", videoUrl);

  const handleVideoClick = () => {
    navigate(`/videoPage/${videoId}/`, { state: { id: repoId } });
  };

  const generateThumbnail = (videoUrl) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.currentTime = 1;
      video.muted = true;
      video.playsInline = true;

      video.onloadeddata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  useEffect(() => {
    if (videoUrl) {
      generateThumbnail(videoUrl).then(setThumbnailUrl);
    }
  }, [videoUrl]);

  return (
    <div className={styles.videoFlex}>
      <div className={styles.videoThumbnail} onClick={handleVideoClick}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className={styles.thumbnailImage}
          />
        ) : (
          <p>...</p>
        )}
      </div>
      <div>
        <h6
          style={{
            cursor: "pointer",
            maxWidth: "300px",
            fontSize: "15px",
            fontStyle: "italic",
          }}
        >
          {truncatedName}
        </h6>
        <p
          style={{
            color: isAnalised === "Analisado" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {isAnalised}
        </p>
      </div>
    </div>
  );
}

function Repository() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/app/videos/all/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Todos os vídeos:", response.data);
        setVideos(response.data);
        console.log(videos)
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
      }
    };
  
    fetchVideos();
  }, []);  

    return (
      <>
      <Menu />
      <div className={styles.mainRepository}>
        <div className={styles.repoGrid}>
            <input type='text' className={styles.searchbar} placeholder='Procure um vídeo...'></input>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.column}>
      {videos.map((video) => (
            <Cards
              key={video.id}
              videoName={video.titulo}
              isAnalised={video.analise ? "Analisado" : "Não analisado"}
              videoUrl={video.file}
              videoId={video.id}
              repoId={null}
            />
          ))}
      </div>
      </>
    );
  }
  
  export default Repository;