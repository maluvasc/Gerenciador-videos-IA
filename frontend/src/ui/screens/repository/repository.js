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
import api from "../../../api";

function Cards({ videoName, videoThumbnail, id }) {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate(`/videoPage/${id}`);
  };

  return (
    <div className={styles.videoFlex}>
      <div className={styles.videoThumbnail} onClick={handleClickHome}>
        {<generateThumbnail videoUrl='http://localhost:8000/media/videos/Vídeo_sem_título__Feito_com_o_Clipchamp_3.mp4'/> && <img src={videoThumbnail} alt="Thumbnail" />}
      </div>
      <div>
        <h5
          style={{
            cursor: "pointer",
            maxWidth: "300px",
            fontStyle: "italic",
            fontSize: "15px",
          }}
        >
          {videoName}
        </h5>
      </div>
    </div>
  );
}

const generateThumbnail = (videoUrl) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.currentTime = 10;
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

function Repository() {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadVideos, setUploadVideos] = useState([]);

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/");
  };

  const fetchVideos = async () => {
    try {
      const response = await api.get(`app/videos/repositorio/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      // Mantém os vídeos locais e adiciona os vídeos do backend
      setVideos(response.data);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  };

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await api.get(`app/repository/${id}`, {
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

  useEffect(() => {
    fetchVideos();
  }, [id]);

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
    const files = Array.from(e.target.files);
    const formData = new FormData();
    const updatedVideos = [];

    for (const file of files) {
      formData.append("file", file);

      // Criar URL local e gerar thumbnail
      const url = URL.createObjectURL(file);
      const thumbnail = await generateThumbnail(url);
      updatedVideos.push({
        name: file.name,
        url,
        thumbnail,
        repositorio_id: id,
        isLocal: true,
      });
    }

    // Atualizar estado mantendo a separação por repositório
    setUploadVideos((prev) => [...prev, ...updatedVideos]);

    formData.append("repositorio", id); // Garante que o backend receba o ID correto

    try {
      await api.post("app/videos/upload/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Espera um tempo antes de buscar os vídeos do backend
      setTimeout(() => {
        fetchVideos();
      }, 3000);
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
              accept="video/mp4, video/mkv, video/mov"
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
        <div className={styles.column}>
          {uploadVideos.map((video, index) => (
            <Cards
              key={index}
              videoName={video.name}
              videoThumbnail={video.thumbnail}
              id={id}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Repository;
