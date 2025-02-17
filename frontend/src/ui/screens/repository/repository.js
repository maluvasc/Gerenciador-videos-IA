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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../../api";

function Cards({ videoName, isAnalised }) {
  return (
    <>
      <div className={styles.videoFlex}>
        <div className={styles.videoThumbnail}></div>
        <div>
          <h5
            style={{
              cursor: "pointer",
              maxWidth: "150px",
              fontStyle: "italic",
            }}
          >
            {videoName}
          </h5>
          <p>{isAnalised}</p>
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
    navigate("/updateRepository", {
      state: {
        id: id,
        reponame: repository.name,
        repodesc: repository.descricao,
        repoimagem: repository.imagem,
      },
    });
  };

  const handleClickTrash = () => {
    navigate("/repositoryTrash", {
      state: {
        id: id,
        reponame: repository.nome,
        repoimagem: repository.imagem,
      },
    });
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
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
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
              <FiUpload size={30} title={"Upload de video"} />
            </button>
            <input
              type="text"
              className={styles.searchbar}
              placeholder="Procure um vídeo..."
            ></input>
            <FiSliders
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
            <FiTrash2
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={handleClickTrash}
            />
            <FiSettings
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={handleClickSettings}
            />
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.column}></div>
      </>
    );
  }
}

export default Repository;
