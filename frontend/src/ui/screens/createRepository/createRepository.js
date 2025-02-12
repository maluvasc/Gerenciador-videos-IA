import React, { useContext, useState } from "react";
import styles from "./createRepository.module.css";
import "./../../../index.css";
import { FiAlertCircle } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";
import Menu from "../../components/menu/menu";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

function CreateRepository() {
  const [nome, setNome] = useState(""); // Estado que armazena o nome de repositório
  const [descricao, setDescricao] = useState(""); // Estado que armazena a descrição do repositório
  const [privado, setPrivado] = useState(""); // Estado que armazena se o repositório é privado
  const [colaboradores, setColaboradores] = useState(""); // Estado que armazena se tem colaboradores - em breve
  const [imagem, setImagem] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Estado que armazena se o formulário está sendo submetido

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (nome.length > 30) {
      setErrors((prev) => ({
        ...prev,
        nome: "Repository's name is longer than allowed.",
      }));
      setLoading(false);
      return;
    }

    if (descricao.length > 50) {
      setErrors((prev) => ({
        ...prev,
        descricao: "Repository's description is longer than allowed.",
      }));
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", nome); // Correspondendo ao campo 'nome' no modelo
      formData.append("descricao", descricao); // Correspondendo ao campo 'descricao' no modelo
      formData.append("privado", privado); // Correspondendo ao campo 'privado' no modelo
      formData.append("colaboradores", colaboradores); // Correspondendo ao campo 'colaboradores' no modelo
      if (imagem) {
        formData.append("imagem", imagem); // Correspondendo ao campo 'imagem' no modelo
      }

      // Obter o token de autenticação do localStorage
      const token = localStorage.getItem("access");
      if (!token) {
        console.log("Token not found");
        return;
      }

      console.log(token);

      // Enviar a requisição com FormData
      const response = await api.post("app/repository/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
              id="nome"
              placeholder="Enter your Repository's Name"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setErrors((prev) => ({ ...prev, nome: "" }));
              }}
              className={errors.nome ? styles.errorInput : ""}
            />
          </div>
          <div className={styles.descriptionInput}>
            <label>Descrição</label>
            <input
              type="textarea"
              id="descricao"
              placeholder="Enter your Repository's Description"
              value={descricao}
              onChange={(e) => {
                setDescricao(e.target.value);
                setErrors((prev) => ({ ...prev, descricao: "" }));
              }}
              className={errors.descricao ? styles.errorInput : ""}
            />
          </div>
          <div className={styles.line2}></div>
          <div className={styles.privateRepositoryInput}>
            <input
              type="checkbox"
              id="privado"
              value={privado}
              className={styles.inputInformationCheckbox}
              onChange={(e) => {
                setPrivado(e.target.value);
              }}
            />
            <p>Repositório privado?</p>
          </div>
          <div className={styles.collaboratorsInput}>
            <label>Colaboradores</label>
            <select name="collaborators" id="colaboradores">
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
                id="imagem"
                className={styles.uploadInput}
                onChange={(e) => setImagem(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRepository;
