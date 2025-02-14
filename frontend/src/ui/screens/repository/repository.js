import React, { useEffect, useState } from 'react'
import Menu from '../../components/menu/menu';
import styles from './repository.module.css';
import { FiSliders } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api';

function Cards({ videoName, isAnalised }) {
  return (
    <>
    <div className={styles.videoFlex}>
      <div className={styles.videoThumbnail}></div>
      <div>
        <h5 style={{cursor: 'pointer', maxWidth: '150px', fontStyle: 'italic'}}>{videoName}</h5>
        <p>{isAnalised}</p>
      </div>
    </div>
    </>
  )
};

function Repository() {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await api.get(`/app/repository/${id}`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setRepository(response.data);
        setVideos(response.data.videos);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!loading) {
    return (
      <>
      <Menu />
      <div className={styles.mainRepository}>
        <div className={styles.repoGrid}>
        <FiArrowLeftCircle style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={handleClickHome}/>
          <div className={styles.repoFlex}>
          <img src={repository.imagem} alt="" className="img-thumbnail" id={styles.imageRepository}></img>
                <div className={styles.titleFlex}>
                    <h5 className={styles.repositoryName}>{repository.nome}</h5>
                    <p className={styles.repositoryDescription}>{repository.descricao}</p>
                </div> 
              </div>
                <input type='text' className={styles.searchbar} placeholder='Procure um vídeo...'></input>
                <FiSliders style={{width: '30px', height: '30px', cursor: 'pointer'}}/>
                <FiTrash2 style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={handleClickTrash}/>
                <FiSettings style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={handleClickSettings}/>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.column}>
      </div>
      </>
    );
  }
}
  
export default Repository;