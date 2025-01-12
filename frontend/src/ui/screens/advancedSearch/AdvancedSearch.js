import React from 'react';
import styles from './advancedSearch.module.css'; // Certifique-se de criar o arquivo CSS ou ajustar o caminho
import Menu from '../../components/menu/menu';
import { FiSliders, FiTrash2, FiSettings } from 'react-icons/fi';

function AdvancedSearch() {
  return (
    <>
      <Menu />
      <div className={styles.mainAdvancedSearch}>
        <div className={styles.scopeAdvancedSearch}>
          <h1>Busca Avançada</h1>
          <div className={styles.line}></div>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Digite sua busca aqui..."
            />
            <div className={styles.repoFlex}>
              <FiSliders style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
              <FiTrash2 style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
              <FiSettings style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdvancedSearch;
