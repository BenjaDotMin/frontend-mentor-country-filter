import {useState} from "react";
import { useRouter } from "next/router";
const { motion } = require("framer-motion");
import Link from "next/link";
import Loader from '../components/Loader';
import styles from '../styles/Country.module.scss'; //locally scoped css

function Country({country}) { 
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    router.onRouteChangeStart = () => setLoading(true);
    router.onRouteChangeComplete = () => setLoading(false);

    const pageMotion = {
        initial: {       
            opacity:0,
            y:6           
        },
        animate: {  
            opacity:1,  
            y:0,
            transition: {duration: 0.6, ease: "easeOut"}         
        },
        exit: {
            opacity: 0,
            y:6,
            transition: {duration: 0.6, ease: "easeOut"} 
        }
    };

    return (
        <motion.div className={styles.container} initial="initial" animate="animate" exit="exit" variants={pageMotion}>
            
            <button onClick={() => router.back()}><i className="fas fa-long-arrow-alt-left"></i> Back</button>

            <div className={styles.countryDetails}>
                <div className={styles.flag}>
                    <img className={styles.flag} src={country.flags.svg}/>
                </div>
                
                <div className={styles.countryStats}>
                    <h2>{country.name}</h2>
                    <div className={styles.countryLists}>
                        <ul>
                            <li><b>Native Name:</b> {country.nativeName}</li>
                            <li><b>Population:</b> {country.population.toLocaleString()}</li>
                            <li><b>Region:</b> {country.region}</li>
                            <li><b>Sub Region:</b> {country.subregion}</li>
                            <li><b>Capital:</b> {country.capital}</li>
                        </ul>
                        <ul>
                            <li><b>Top Level Domain:</b> {country.topLevelDomain}</li>
                            <li><b>Currencies:</b> {country.currencies.map(currency => <i key={currency.name}>{currency.name}</i>)}</li>
                            <li><b>Languages:</b> {country.languages.map(language => <i key={language.name}>{language.name}</i>)}</li>                           
                        </ul>
                    </div>
                    {country.borders &&
                        <div className={styles.borders}>
                            <h3>Border Countries:</h3>
                            <ul>
                                {country.borders.map(border => <li key={border}><Link href="/[id]" as={`/${border}`}><a>{border}</a></Link></li>)}                           
                            </ul>
                        </div>
                    }
                </div>
            </div>  
            {loading && <Loader/>}       
        </motion.div>
    )
}

export default Country;

export async function getServerSideProps(context){
    const {id} = context.query;
    const response = await fetch(`https://restcountries.com/v2/alpha/${encodeURIComponent(id)}`);
    const data = await response.json();
    return {props: {country: data}} 
}
  