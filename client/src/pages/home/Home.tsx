import React from "react";
import Hero from "../../components/hero/Hero.tsx";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const handleViewProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If projects section doesn't exist on this page, you could navigate to a projects page
      console.log("Navigate to projects page");
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Manuel_Reyes_jr.pdf";
    link.download = "Manuel_Reyes_jr.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <Hero
        name="Manuel Reyes Jr"
        email="Manuelreyes1241@outlook.com"
        githubUrl="https://github.com/MReyes1241"
        linkedinUrl="https://linkedin.com/in/manuel-reyes-jr-swe"
        onViewProjects={handleViewProjects}
        onDownloadResume={handleDownloadResume}
      />

      {/* Add more sections later, it'll be more like a preview image of those sections. */}

      {/*Mock: Projects section */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionContent}>
          <h2>My Projects</h2>
          <p>Your projects will go here...</p>
        </div>
      </section>

      {/* Mock: About section */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionContent}>
          <h2>About Me</h2>
          <p>More details about your background...</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 Manuel Reyes Jr</p>
      </footer>
    </div>
  );
};

export default Home;
