import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/menu/menu";
import styles from "./repository.module.css";
import {
  FiSliders,
  FiTrash2,
  FiSettings,
  FiArrowLeftCircle,
  FiUpload,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api";

function Cards({ videoName, isAnalised, videoUrl, videoId, repoId }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const truncatedName =
    videoName.length > 20 ? videoName.substring(0, 20) + "..." : videoName;
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/videoPage/${videoId}/`, { state: { id: repoId } });
  };

  return (
    <>
      <div className={styles.videoFlex}>
        <div className={styles.videoThumbnail} onClick={handleVideoClick}>
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className={styles.thumbnailImage}
          />
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
    </>
  );
}

function Repository() {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadVideos, setUploadVideos] = useState([]);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await api.get(`/app/repository/${id}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        setRepository(response.data);
        setVideos(response.data.videos);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepository();
  }, [id]);

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/");
  };

  const handleClickSettings = () => {
    navigate("/updateRepository");
  };

  const handleClickTrash = () => {
    navigate("/repositoryTrash");
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("repositorio", repository.id);

    try {
      const response = await api.post("app/videos/upload/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Vídeos enviados com sucesso!");
      setVideos([...videos, ...response.data]);
    } catch (error) {
      console.error("Erro ao enviar vídeos:", error);
      alert("Erro ao enviar vídeos.");
    }
  };

  const handleUploadClick = async () => {
    document.getElementById("videoUpload").click();
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!loading) {
    return (
      <>
        <Menu />
        <div className={styles.mainRepository}>
          <div className={styles.repoGrid}>
            <FiArrowLeftCircle
              style={{ minWidth: "30px", minHeight: "30px", cursor: "pointer" }}
              onClick={handleClickHome}
            />
            <div className={styles.repoFlex}>
              <img
                src={repository.imagem}
                alt=""
                className="img-thumbnail"
                id={styles.imageRepository}
              ></img>
              <div className={styles.titleFlex}>
                <h5 className={styles.repositoryName}>{repository.nome}</h5>
                <p className={styles.repositoryDescription}>
                  {repository.descricao}
                </p>
              </div>
            </div>
            <input
              className={styles.videoUpload}
              type="file"
              id="videoUpload"
              accept="video/mp4, video/avi, video/mov"
              multiple
              onChange={handleFileChange}
            />
            <button className={styles.uploadButton} onClick={handleUploadClick}>
              <FiUpload
                style={{
                  minWidth: "30px",
                  minHeight: "30px",
                  cursor: "pointer",
                }}
                title={"Upload de video"}
              />
            </button>
            <input
              type="text"
              className={styles.searchbar}
              placeholder="Procure um vídeo..."
            ></input>
            <FiTrash2
              style={{ minWidth: "30px", minHeight: "30px", cursor: "pointer" }}
              onClick={handleClickTrash}
            />
            <FiSettings
              style={{ minWidth: "30px", minHeight: "30px", cursor: "pointer" }}
              onClick={handleClickSettings}
            />
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          {videos.map((video) => (
            <Cards
              key={video.id}
              videoName={video.titulo}
              isAnalised={video.analise ? "Analisado" : "Não analisado"}
              videoUrl={video.url}
              videoId={video.id}
              repoId={repository.id}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Repository;
