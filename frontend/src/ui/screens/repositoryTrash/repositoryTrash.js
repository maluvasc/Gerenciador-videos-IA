import React, { useState } from "react";
import Menu from "../../components/menu/menu";
import styles from "./repositoryTrash.module.css";
import { FiSliders } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

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

function RepositoryTrash() {
  const { state } = useLocation();
  const [id, setId] = useState(state?.id);
  const [imagem, setImagem] = useState(state?.repoimagem);
  const [name, setName] = useState(state?.reponame);
  const [description, setDescription] = useState(state?.repodesc);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/repository/${id}`);
  };

  return (
    <>
      <Menu />
      <div className={styles.mainRepository}>
        <div className={styles.repoGrid}>
          <FiArrowLeftCircle
            className={styles.iconBack}
            style={{ minWidth: "30px", minHeight: "30px", cursor: "pointer" }}
            onClick={handleClick}
          />
          <div className={styles.repoFlex}>
            <img
              src={imagem}
              alt=""
              class="img-thumbnail"
              id={styles.imageRepository}
            ></img>
            <div className={styles.titleFlex}>
              <h5 className={styles.repositoryName}>{name}</h5>
              <p className={styles.repositoryDescription}>Lixeira</p>
            </div>
          </div>
          <input
            type="text"
            className={styles.searchbar}
            placeholder="Procure um vídeo..."
          ></input>
          <div className={styles.flexButton}>
            <button className={styles.buttonEsvaziar}>Esvaziar Lixeira</button>
            <button className={styles.buttonRestaurar}>
              Restaurar Lixeira
            </button>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.column}>
        <Cards videoName={"Video Name"} isAnalised={"Analisado"} />
        <Cards videoName={"Video Name"} isAnalised={"Analisado"} />
        <Cards videoName={"Video Name"} isAnalised={"Analisado"} />
        <Cards videoName={"Video Name"} isAnalised={"Analisado"} />
        <Cards videoName={"Video Name"} isAnalised={"Analisado"} />
        <Cards videoName={"Video Name"} isAnalised={"Analisado"} />
        <Cards videoName={"Video Name"} isAnalised={"Analisado"} />
      </div>
    </>
  );
}

export default RepositoryTrash;
