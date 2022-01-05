import React from 'react';
import styles from '../styles/Loader.module.scss';

function Loader() {
    return (      
        <div className={styles.container}>
            <img src="/img/loading.gif" alt="loading" />
        </div>       
    )
};

export default Loader;
