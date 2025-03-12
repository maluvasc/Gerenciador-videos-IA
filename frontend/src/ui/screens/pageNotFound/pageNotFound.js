import styles from './pageNotFound.module.css';

function PageNotFound() {
    return (
        <div className={styles.page404}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>A página que você procura não existe!</p>
        </div>
    );
}

export default PageNotFound;
