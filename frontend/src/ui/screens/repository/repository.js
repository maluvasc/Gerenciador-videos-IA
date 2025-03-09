import React, { useEffect, useState } from "react";
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
import ReactPlayer from "react-player";
import api from "../../../api";

// Componente para exibir cada vídeo como um card
function VideoCard({ video }) {
  return (
    <div className={styles.videoFlex}>
      <ReactPlayer
        url={video.url}
        controls
        width="100%"
        height="100%"
        playing={false}
      />
      <p className={styles.videoTitle}>{video.name}</p>
    </div>
  );
}

function Repository() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState(null);
  const [videos, setVideos] = useState([]);
  const [uploadVideos, setUploadVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os vídeos do repositório
  const fetchVideos = async () => {
    try {
      const response = await api.get(`app/videos/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      setVideos(response.data);
    } catch (error) {
      console.error("Erro ao buscar os vídeos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [id]);

  // Busca os detalhes do repositório
  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await api.get(`app/repository/${id}`, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        setRepository(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchRepository();
  }, [id]);

  // Envia os vídeos selecionados para o backend
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
    const files = Array.from(e.target.files);
    const formData = new FormData();
    const updatedVideos = [];

    for (const file of files) {
      formData.append("file", file);

      const url = URL.createObjectURL(file);
      updatedVideos.push({
        name: file.name,
        url,
        repositorio_id: id,
        isLocal: true,
      });
    }

    // Atualizar estado mantendo a separação por repositório
    setUploadVideos((prev) => [...prev, ...updatedVideos]);

    formData.append("repositorio", id);

    try {
      await api.post("app/videos/upload/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Erro ao enviar vídeos:", error);
      alert("Erro ao enviar vídeos.");
    }
  };

  if (error) return <div>Erro: {error.message}</div>;
  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <Menu />
      <div className={styles.mainRepository}>
        <div className={styles.repoGrid}>
          <FiArrowLeftCircle
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <div className={styles.repoFlex}>
            <img
              src={repository?.imagem}
              alt="Imagem do Repositório"
              className="img-thumbnail"
              id={styles.imageRepository}
            />
            <div className={styles.titleFlex}>
              <h5 className={styles.repositoryName}>{repository?.nome}</h5>
              <p className={styles.repositoryDescription}>
                {repository?.descricao}
              </p>
            </div>
          </div>
          <input
            type="file"
            id="videoUpload"
            accept="video/*"
            multiple
            className={styles.videoUpload}
            onChange={handleFileChange}
            hidden
          />
          <button
            className={styles.uploadButton}
            onClick={() => document.getElementById("videoUpload").click()}
          >
            <FiUpload size={30} title="Upload de vídeo" />
          </button>

          <input
            type="text"
            className={styles.searchbar}
            placeholder="Procure um vídeo..."
          />
          <FiSliders
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
          <FiTrash2
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={() =>
              navigate("/repositoryTrash", {
                state: {
                  id,
                  reponame: repository?.nome,
                  repoimagem: repository?.imagem,
                },
              })
            }
          />
          <FiSettings
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={() =>
              navigate("/updateRepository", {
                state: {
                  id,
                  reponame: repository?.nome,
                  repodesc: repository?.descricao,
                  repoimagem: repository?.imagem,
                },
              })
            }
          />
        </div>
      </div>

      <div className={styles.line}></div>
      <div className={styles.column}>
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </>
  );
}

export default Repository;
