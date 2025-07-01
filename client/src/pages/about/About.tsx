import styles from "./About.module.css";
import { imageUrls } from "../../assets/images.ts";
import Footer from "../../components/footer/Footer.tsx";

export function About() {
  return (
    <>  
      <section id="about" className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>About Me</h2>
              <div className={styles.titleAccent}></div>
            </div>

            <div className={styles.content}>
              <p className={styles.paragraph}>
                I'm a recent Computer Science graduate with a passion for creating
                digital experiences that make a difference. Having just completed
                my degree, I'm excited to apply the knowledge and skills I've
                developed to real-world challenges and contribute to meaningful
                projects in the tech industry.
              </p>

              <p className={styles.paragraph}>
                My expertise spans across modern web technologies including React,
                TypeScript, Node.js, and Python. I thrive in both frontend and
                backend development, with experience in cloud platforms, database
                design, and creating scalable applications. I believe in writing
                clean, maintainable code and following best practices that stand
                the test of time.
              </p>

              <p className={styles.paragraph}>
                As I transition from academic learning to professional
                development, I'm eager to collaborate with experienced teams,
                tackle complex problems, and continue growing as a software
                engineer. I'm always excited to explore new technologies and
                contribute to innovative solutions that create meaningful impact.
              </p>
            </div>

            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <h3>Frontend</h3>
                <div className={styles.skills}>
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Next.js</span>
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3>Backend</h3>
                <div className={styles.skills}>
                  <span>Node.js</span>
                  <span>Python</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3>Tools</h3>
                <div className={styles.skills}>
                  <span>Git</span>
                  <span>Docker</span>
                  <span>AWS</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <div
              className={styles.profileImage}
              style={{ backgroundImage: `url(${imageUrls.manuel.src})` }}
            >
              <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.decorativeElement}></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
