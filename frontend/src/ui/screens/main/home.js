import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './home.module.css';
import { RiAddLargeFill } from "react-icons/ri";

function Cards({ repositoryName, repositoryDescription }){
  return (
    <>
    <div className={styles.repositoryFlex}>
      <div>
        <h5>{repositoryName}</h5>
        <p>{repositoryDescription}</p>
      </div>
    </div>
    </>
  )
}

function Home() {
    return (
      <>
      <Menu />
      <div className={styles.mainHome}>
        <div className={styles.homeGrid}>
          <h3>Repositórios</h3>
          <input type='text' className={styles.searchbar} placeholder='Buscar Repositório'></input>
          <button className={styles.buttonCriarRepositorio}>
            <RiAddLargeFill style={{width: '30px', height: '30px', paddingTop: 5 , cursor:'pointer'}}/>
          </button>
        </div>
      </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          <Cards repositoryName={"Nome do Repositório"} repositoryDescription={"Descrição"}/>
          <Cards repositoryName={"Nome do Repositório"} repositoryDescription={"Descrição"}/>
          <Cards repositoryName={"Nome do Repositório"} repositoryDescription={"Descrição"}/>
          <Cards repositoryName={"Nome do Repositório"} repositoryDescription={"Descrição"}/>
          <Cards repositoryName={"Nome do Repositório"} repositoryDescription={"Descrição"}/>
          <Cards repositoryName={"Nome do Repositório"} repositoryDescription={"Descrição"}/>
        </div>
      </>
    );
  }
  
  export default Home;