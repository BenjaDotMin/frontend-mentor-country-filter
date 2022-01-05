import '../styles/_globals.scss';
import Header from '../components/Header';
const { motion, AnimatePresence } = require("framer-motion");

function MyApp({ Component, pageProps, router }) {
  return <main>
    {/* use component, pass in data */}
    <Header/>

    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div className="container" key={router.route}>
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  </main>
}

export default MyApp
