import React, {useState} from 'react';
import Link from "next/link";
import styles from '../styles/Header.module.scss';

function Header() {
    const [darkMode, setDarkMode] = useState(false);

    const mode = e => {
        setDarkMode(!darkMode);
        e.target.closest("main").classList.toggle("dark");
    }

    return (
        <header className={darkMode ? `${styles.header} dark` : styles.header}>
            <div className="container">
                <div className={styles.container}>
                    <Link href="/"><a><h1>Where in the world?</h1></a></Link>                   
                    <div className={styles.mode} onClick={e => mode(e)}>
                    <i className={darkMode ? "fas fa-moon" : "far fa-moon"}></i>
                        <label>Dark Mode</label>
                    </div>                    
                </div>
            </div> 
        </header>
    )
};

export default Header;
