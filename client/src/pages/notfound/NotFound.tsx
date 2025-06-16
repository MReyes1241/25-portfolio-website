import React from "react";
import { ArrowLeft, Home, Search, Zap } from "lucide-react";
import styles from "./NotFound.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Background gradient overlay */}
      <div className={styles.backgroundOverlay}></div>

      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingBlob1}></div>
        <div className={styles.floatingBlob2}></div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* 404 Number */}
        <div className={styles.numberContainer}>
          <h1 className={styles.number404}>404</h1>
        </div>

        {/* Glitch effect line */}
        <div className={styles.dividerLine}></div>

        {/* Title */}
        <h2 className={styles.title}>Oops! Page Not Found</h2>

        {/* Description */}
        <p className={styles.description}>
          Looks like you've stumbled into uncharted territory. This page doesn't
          exist, but hey, at least you found a pretty cool 404 page!
        </p>

        {/* Action buttons */}
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

        {/* Additional help */}
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

        {/* Floating particles effect */}
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
