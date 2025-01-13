import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './reports.module.css';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

function Cards({ relatoryName, relatoryDescription }){
  return (
    <>
    <div className={styles.repositoryFlex}>
      <div>
        <h5>{relatoryName}</h5>
        <p>{relatoryDescription}</p>
        <button className={styles.downloadButton}>Download as PDF</button>
      </div>
    </div>
    </>
  )
}

function Home() {

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/");
  };

  return (
      <>
      <Menu />
      <div className={styles.mainHome}>
        <div className={styles.homeGrid}>
            <FiArrowLeftCircle className={styles.iconBack} style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={handleClickHome}/>
          <h3>Relatórios</h3>
          <input type='text' className={styles.searchbar} placeholder='Buscar Relatório'></input>
        </div>
      </div>
        <div className={styles.line}></div>
        <div className={styles.column}>
          <Cards relatoryName={"Nome do Relatório"} relatoryDescription={"Descrição"}/>
          <Cards relatoryName={"Nome do Relatório"} relatoryDescription={"Descrição"}/>
          <Cards relatoryName={"Nome do Relatório"} relatoryDescription={"Descrição"}/>
          <Cards relatoryName={"Nome do Relatório"} relatoryDescription={"Descrição"}/>
          <Cards relatoryName={"Nome do Relatório"} relatoryDescription={"Descrição"}/>
          <Cards relatoryName={"Nome do Relatório"} relatoryDescription={"Descrição"}/>   
        </div>
      </>
    );
  }
  
  export default Home;