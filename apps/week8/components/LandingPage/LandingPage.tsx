import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import Pricing from "./Pricing";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <main>
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
