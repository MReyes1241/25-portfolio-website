import React from "react";
import { ArrowLeft, Home, Search, Zap } from "lucide-react";
import styles from "./NotFound.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>

      <div className={styles.backgroundElements}>
        <div className={styles.floatingBlob1}></div>
        <div className={styles.floatingBlob2}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.numberContainer}>
          <h1 className={styles.number404}>404</h1>
        </div>

        <div className={styles.dividerLine}></div>

        <h2 className={styles.title}>Oops! Page Not Found</h2>

        <p className={styles.description}>
          Looks like you've stumbled into uncharted territory. This page doesn't
          exist, but hey, at least you found a pretty cool 404 page!
        </p>

        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton}>
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button className={styles.secondaryButton}>
            <Home size={20} />
            Home
          </button>
        </div>

        <div className={styles.helpSection}>
          <p className={styles.helpText}>
            Want to explore what I've actually built?
          </p>

          <div className={styles.helpLinks}>
            <a href="/projects" className={styles.helpLink}>
              <Search size={16} />
              Browse Projects
            </a>
            <a href="/contact" className={styles.helpLink}>
              <Zap size={16} />
              Get In Touch
            </a>
          </div>
        </div>

        <div className={styles.particles}>
          <div className={styles.particle1}></div>
          <div className={styles.particle2}></div>
          <div className={styles.particle3}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
