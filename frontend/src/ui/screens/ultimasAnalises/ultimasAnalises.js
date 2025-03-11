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
            <input type='text' className={styles.searchbar} placeholder='Procure um vídeo...'></input>
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