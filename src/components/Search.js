import React from 'react';
import styles from '../styles/Search.module.scss';

function Search({searchTerm}) {   
    return (      
        <div className={styles.container}>
            <i className="fas fa-search"></i>
            <input type="text" placeholder='Search for a country...' onChange={e => searchTerm(e.target.value)}/>
        </div>       
    )
};

export default Search;
