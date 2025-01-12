import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './ultimasAnalises.module.css';
import { FiSliders } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";

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
    return (
      <>
      <Menu />
      <div className={styles.mainRepository}>
        <div className={styles.repoGrid}>
            <h5>Últimas Análises</h5>
            <input type='text' className={styles.searchbar} placeholder='Procure um vídeo...'></input>
            <div className={styles.repoFlex}>
                <FiSliders style={{width: '30px', height: '30px', cursor: 'pointer'}}/>
                <FiTrash2 style={{width: '30px', height: '30px', cursor: 'pointer'}}/>
                <FiSettings style={{width: '30px', height: '30px', cursor: 'pointer'}}/>
            </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.column}>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
          <Cards videoName={"Video Name"} isAnalised={"Analisado"}/>
      </div>
      </>
    );
  }
  
  export default Repository;