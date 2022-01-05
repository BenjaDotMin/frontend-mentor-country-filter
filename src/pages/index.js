import { useState } from 'react';
import Head from 'next/head';
import {useRouter} from "next/router";
const { motion } = require("framer-motion");

import Search from '../components/Search';
import Filter from '../components/Filter';
import Card from '../components/Card';
import Loader from '../components/Loader';
import styles from '../styles/Home.module.scss';

export default function Home({countries}) { 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  router.onRouteChangeStart = () => setLoading(true);
  router.onRouteChangeComplete = () => setLoading(false);

  const searchTerm = query => setSearchQuery(searchQuery = query);
  const searchRegion = query => setRegion(region = query);
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchQuery) && country.region.includes(region)); //new array
 
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
    <div className={styles.container}>
      <Head>
        <title>Where in the world</title>
        <meta name="description" content="Where in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div className={styles.pageControls} initial="initial" animate="animate" exit="exit" variants={pageMotion}>
        <Search searchTerm={searchTerm}/>
        <Filter searchRegion={searchRegion} region={region}/>
      </motion.div>

      <motion.div className={styles.countryCards} initial="initial" animate="animate" exit="exit" variants={pageMotion}> 
        {filteredCountries.map(country => (
          <Card key={country.name} country={country} />
        ))}       
      </motion.div>
      {filteredCountries.length === 0 && <label className={styles.noCountries}><b>No countries found.</b><br/>Please review the search term, or adjust the region filter</label>}
      {loading && <Loader/>}
    </div>
  )
};

export async function getServerSideProps(){
  const response = await fetch("https://restcountries.com/v2/all");
  const data = await response.json();
  return {props: {countries: data}} 
}
