import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuRoutes } from '../../../routes/routes'; // Certifique-se de que o caminho está correto
import {
  FaSignOutAlt,
  FaHome,
  FaCog,
} from 'react-icons/fa';
import { FiShare, FiAlertTriangle, FiSearch, FiHelpCircle, FiRefreshCcw, FiUpload } from 'react-icons/fi'
import styles from './menu.module.css';

function Menu() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    navigate('/logout');
  };

  const icons = {
    'Upload Manual': <FiShare />,
    'Busca Avançada': <FiSearch />,
    Sair: <FaSignOutAlt />,
    Home: <FaHome />,
    'Página Inicial': <FaHome />,
    Configurações: <FaCog />,
    Notificações: <FiAlertTriangle />,
    'Últimas Análises': <FiRefreshCcw />, 
    'Upload de Vídeo': <FiUpload />,
  };
  
  function handleOver() {
    setExpanded(true);
  }

  function handleLeave() {
    setExpanded(false);
  }

  return (
    <div className={styles.container}>
      {/* Overlay */}
      {expanded && <div className={styles.overlay} />}

      <nav>
        <div className={styles.topbar}>
          <div className={styles.topbarNav}>
            <Link to="/" className={`${styles.btn} ${styles.topbarBtn}`}>
              <div className={styles.icon}>{icons['Home']}</div>
              <span className={styles.text}>Início</span>
            </Link>
            <Link
              to="/notificacoes"
              className={`${styles.btn} ${styles.topbarBtn}`}
            >
              <div className={styles.icon}>{icons['Notificações']}</div>
              <span className={styles.text}>Notificacoes</span>
            </Link>
            <Link
              to="/configuracoes"
              className={`${styles.btn} ${styles.topbarBtn}`}
            >
              <div className={styles.icon}>{icons['Configurações']}</div>
              <span className={styles.text}>Configurações</span>
            </Link>
          </div>
        </div>
      </nav>
      <nav
        className={`${styles.navbar} ${expanded ? styles.expanded : ''}`}
        onMouseEnter={handleOver}
        onMouseLeave={handleLeave}
      >
        <div className={styles.navbarNav}>
          {Object.values(menuRoutes)
            .filter((route) => route.visible)
            .map((route) => (
              <Link
                to={`/${route.route}`}
                key={route.name}
                className={`${styles.btn} ${styles.menuItem}`}
              >
                <div className={styles.icon}>{icons[route.name]}</div>
                <span className={expanded ? styles.showText : styles.hideText}>
                  {route.name}
                </span>
              </Link>
            ))}
          <button
            onClick={handleLogout}
            className={`${styles.btn} ${styles.menuItem}`}
          >
            <div className={styles.icon}>{icons['Sair']}</div>
            <span className={expanded ? styles.showText : styles.hideText}>
              Sair
            </span>
          </button>
        </div>
      </nav>
      <div className={styles.mainContent}>{}</div>
    </div>
  );
}

export default Menu;