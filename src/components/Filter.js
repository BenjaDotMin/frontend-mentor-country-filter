import React, {useState} from 'react';
import styles from '../styles/Filter.module.scss';

function Filter({searchRegion, region}) {
    const [filter, setFilter] = useState(false);    

    const selectFilter = e => {
        searchRegion(e.target.innerText);
        setFilter(!filter);
    }

    return (      
        <div className={styles.container} onClick={() => setFilter(!filter)}>
            <input type="text" placeholder='Filter by Region' value={region}/>
            <i className="fas fa-chevron-down"></i>
            <div className={styles.filterContent}>
                <ul className={filter ? styles.active : ""} onClick={e => e.stopPropagation()}>
                    <li onClick={e => selectFilter(e)}>Africa</li>
                    <li onClick={e => selectFilter(e)}>Americas</li>
                    <li onClick={e => selectFilter(e)}>Asia</li>
                    <li onClick={e => selectFilter(e)}>Europe</li>
                    <li onClick={e => selectFilter(e)}>Oceania</li>   
                    <li onClick={() => {searchRegion(""), setFilter(!filter)}}>None</li>                 
                </ul>
            </div>          
        </div>       
    )
};

export default Filter;
