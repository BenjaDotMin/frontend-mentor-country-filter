import React from 'react';
import Link from "next/link";
import styles from '../styles/Card.module.scss';

function Card({country}) {
    return (  
        <Link href="/[id]" as={`/${country.alpha3Code}`}>
            <a>
                <div className={styles.container}>
                    <div className={styles.image}>
                            <img src={country.flags.png} alt={country.name} />
                    </div>
                    <div className={styles.cardDetails}>
                            <label>{country.name}</label>
                            <ul>
                                <li><b>Population:</b> {country.population.toLocaleString()}</li>
                                <li><b>Region:</b> {country.region}</li>
                                <li><b>Capital:</b> {country.capital}</li>
                            </ul>
                    </div>           
                </div>
            </a>   
        </Link>
    )
};

export default Card;
