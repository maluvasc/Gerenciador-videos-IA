import React, { useContext, useState } from "react";
import styles from "./createRepository.module.css";
import "./../../../index.css";
import { FiAlertCircle } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";
import Menu from "../../components/menu/menu";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

function CreateRepository() {
  const [repositoryName, setRepositoryName] = useState(""); // Estado que armazena o nome de repositório
  const [repositoryDescription, setRepositoryDescription] = useState(""); // Estado que armazena a descrição do repositório
  const [repositoryPrivate, setRepositoryPrivate] = useState(""); // Estado que armazena se o repositório é privado
  const [collaborators, setCollaborators] = useState([]); // Estado que armazena se tem colaboradores - em breve
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Estado que armazena se o formulário está sendo submetido

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/");
  };

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
      const response = await api.post("app/repository/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Repositório cadastrado com sucesso!");
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
      <div className={styles.mainCreateRepository}>
        <div className={styles.scopeCreateRepository}>
          <div className={styles.iconH1Flex}>
            <FiArrowLeftCircle
              className={styles.iconBack}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              onClick={handleClickHome}
            />
            <h1 className={styles.h1UpdateRepository}>
              Criar novo repositório
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
            <input
              type="checkbox"
              id="repositoryPrivate"
              value={repositoryPrivate}
              className={styles.inputInformationCheckbox}
              onChange={(e) => {
                setRepositoryPrivate(e.target.checked);
              }}
            />
            <p>Repositório privado?</p>
          </div>
          <div className={styles.collaboratorsInput}>
            <label>Colaboradores</label>
            <select name="collaborators" id="collaborators">
              <option>Escolha colaboradores</option>
            </select>
          </div>
          <div className={styles.alertTextGroup}>
            <FiAlertCircle />
            <p>Você está criando um repositório em sua conta pessoal</p>
          </div>
          <div className={styles.line3}></div>
          <form onSubmit={handleSubmit}>
            <button
              className={styles.buttonCreateRepository}
              type="submit"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar repositório"}
            </button>
          </form>
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

export default CreateRepository;