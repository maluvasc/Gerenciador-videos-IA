import React from 'react'
import Menu from '../../components/menu/menu';
import styles from './home.module.css';

function Home() {
    return (
      <>
      <Menu />
      <div className={styles.mainHome}>
        <h1>Essa é a página home</h1>
      </div>
      </>
    );
  }
  
  export default Home;