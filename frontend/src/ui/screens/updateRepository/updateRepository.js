import React, { useState } from "react";
import Menu from "../../components/menu/menu";
import styles from "./updateRepository.module.css";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../api";

function UpdateRepository() {
  const { state } = useLocation();
  const [id, setId] = useState(state?.id);
  const [imagem, setImagem] = useState(state?.repoimagem);
  const [name, setName] = useState(state?.reponame);
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate(`/repository/${id}`);
  };

  const [repositoryName, setRepositoryName] = useState(state?.reponame || "");
  const [repositoryDescription, setRepositoryDescription] = useState(
    state?.repodescription || ""
  );
  const [repositoryPrivate, setRepositoryPrivate] = useState(
    state?.repoprivate || false
  );

  const [collaborators, setCollaborators] = useState([]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCollaborators = async (e) => {
    e.preventDefault();
    try{
    const response = await api.get(`app/user/retrieve/`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setCollaborators(response.data);
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      setErrors(error.response.data);
    } else {
      setErrors({
        general: "Erro inesperado. Tente novamente mais tarde.",
      });
    }
  };
}

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (repositoryName.length > 30) {
      setErrors((prev) => ({
        ...prev,
        repositoryName: "Repository's name is longer than allowed.",
      }));
      setLoading(false);
      return;
    }

    if (repositoryName.length > 50) {
      setErrors((prev) => ({
        ...prev,
        repositoryName: "Repository's description is longer than allowed.",
      }));
      setLoading(false);
      return;
    }

    try {
      // Criar um objeto FormData
      const formData = new FormData();
      formData.append("nome", repositoryName);
      formData.append("descricao", repositoryDescription);
      formData.append("privado", repositoryPrivate);
      formData.append("collaborators", collaborators);
      if (file) {
        formData.append("imagem", file); // Adiciona o arquivo ao FormData
      }

      // Log dos dados que estão sendo enviados
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Enviar a requisição com FormData
      const response = await api.put(`app/repository/update/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Repositório editado com sucesso!");
      navigate(`/repository/${id}`);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({
          general: "Erro inesperado. Tente novamente mais tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await api.delete(`app/repository/delete/${id}/`);

      alert("Repositório deletado com sucesso!");
      navigate(`/`);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({
          general: "Erro inesperado. Tente novamente mais tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Menu />
      <div className={styles.mainUpdateRepository}>
        <div className={styles.scopeUpdateRepository}>
          <div className={styles.iconH1Flex}>
            <FiArrowLeftCircle
              className={styles.iconBack}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={handleClickHome}
            />
            <h1 className={styles.h1UpdateRepository}>
              Editar informações do repositório
            </h1>
          </div>
          <div className={styles.line}></div>
          <div className={styles.nameInput}>
            <label>Nome</label>
            <input
              type="text"
              id="repositoryName"
              placeholder="Digite o nome do repositório"
              value={repositoryName}
              onChange={(e) => {
                setRepositoryName(e.target.value);
                setErrors((prev) => ({ ...prev, repositoryName: "" }));
              }}
              className={errors.repositoryName ? styles.errorInput : ""}
            />
          </div>
          <div className={styles.descriptionInput}>
            <label>Descrição</label>
            <input
              type="textarea"
              id="repositoryDescription"
              placeholder="Digite a descrição"
              value={repositoryDescription}
              onChange={(e) => {
                setRepositoryDescription(e.target.value);
                setErrors((prev) => ({ ...prev, repositoryDescription: "" }));
              }}
              className={errors.repositoryDescription ? styles.errorInput : ""}
            />
          </div>
          <div className={styles.line2}></div>
          <div className={styles.privateRepositoryInput}>
          </div>
          <div className={styles.collaboratorsInput}>
            <label>Colaboradores</label>
            <select name="collaborators" id="collaborators">
              <option>{console.log(collaborators)}</option>
            </select>
          </div>
          <div className={styles.gridButtons}>
            <form onSubmit={handleSubmit}>
              <button
                className={styles.buttonUpdateRepository}
                type="submit"
                disabled={loading}
              >
                {loading ? "Editar repositório" : "Editar repositório"}
              </button>
            </form>
            <form onSubmit={handleDelete}>
              <button
                className={styles.buttonDeletarRepository}
                type="submit"
                disabled={loading}
              >
                {loading ? "Deletar repositório" : "Deletar repositório"}
              </button>
            </form>
          </div>
          <div className={styles.container}>
            <div className={styles.alinharColuna2}>
              <label>Escolha a imagem do repositório</label>
              <label htmlFor="fileUpload" className={styles.uploadLabel}>
                <div className={styles.uploadBox}>
                  <span className={styles.uploadText}>+</span>
                </div>
              </label>
              <input
                type="file"
                id="fileUpload"
                className={styles.uploadInput}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateRepository;
