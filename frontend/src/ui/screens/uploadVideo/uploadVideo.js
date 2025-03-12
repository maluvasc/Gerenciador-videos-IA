import React, { useState, useEffect } from 'react';
import styles from './uploadVideo.module.css';
import './../../../index.css';
import { FiUpload } from "react-icons/fi";
import Menu from '../../components/menu/menu';
import api from "../../../api";

function UploadVideo() {

  const [videos, setVideos] = useState([]);
  const [repoName, setRepoName] = useState("");
  const [repoDesc, setRepoDesc] = useState("");
  const [repoId, setRepoId] = useState("");
  const [repoTitulo, setRepoTitulo] = useState("");
  const [repositories, setRepositories] = useState([]);

  const handleFileChange = async (e) => {
    if (!repoId) {
      alert("Por favor, selecione um repositório antes de enviar o vídeo.");
      return;
    }
  
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("repositorio", repoId);
  
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
      console.error("Erro ao enviar vídeos:", error.response ? error.response.data : error);
      alert("Erro ao enviar vídeos.");
    }
  };  

    useEffect(() => {
      const fetchUserRepositories = async () => {
        try {
          const response = await api.get("app/repository/user/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          setRepositories(response.data);
        } catch (error) {
          console.error("Erro ao buscar repositórios do usuário:", error);
        }
      };

      fetchUserRepositories();
    }, []);

    return (
      <>
        <Menu />
        <div className={styles.mainUploadVideo}>
          <div className={styles.scopeUploadVideo}>
              <h1>Upload de Vídeo</h1>
              <div className={styles.line}></div>
              <div className={styles.titleInput}>
                <label>Título</label>
                <input 
                  className={styles.inputInformationTitle}
                  onChange={(e) => {setRepoTitulo(e.target.value)}}>
                </input>
              </div>
              <div className={styles.descriptionInput}>
                <label>Descrição</label>
                <textarea 
                className={styles.inputInformationDescription}
                onChange={(e) => {setRepoDesc(e.target.value)}}>
                </textarea>
                <label>Escolha um repositório:</label>
                <select 
                  name="repository"
                  id="repository-select"
                  onChange={(e) => {
                    const selectedRepoName = e.target.value;
                    setRepoName(selectedRepoName);

                    const selectedRepo = repositories.find(repo => repo.nome === selectedRepoName);
                    if (selectedRepo) {
                      setRepoId(selectedRepo.id);
                      console.log("Repositório selecionado:", selectedRepo.id);
                    } else {
                      setRepoId("");
                    }
                  }}
                >
                  <option value="">--Escolha um repositório--</option>
                  {repositories.map((repo) => (
                    <option key={repo.id} value={repo.nome}>{repo.nome}</option>
                  ))}
                </select>
              </div>
              <div className={styles.line}></div>
              <div className={styles.videoFileUpload}>
                <h3>Selecione o arquivo de vídeo</h3>
                <input 
                  type="file"
                  id="videoUpload"
                  accept="video/mp4, video/avi, video/mov"
                  multiple
                  onChange={handleFileChange} 
                ></input>
              </div>
              <div className={styles.line}></div>
              <button 
              className={styles.buttonUploadVideo}
              >
                <FiUpload /> Enviar Vídeo
              </button>
          </div>
        </div>
      </>
    );
}

export default UploadVideo;
