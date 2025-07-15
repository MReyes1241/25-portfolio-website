import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  Code,
  Gamepad2,
  Globe,
  Monitor,
  Smartphone,
  Settings,
} from "lucide-react";
import styles from "./Projects.module.css";
import Footer from "../../components/footer/Footer.tsx";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  github_url: string;
  live_url?: string | null;
  category: string[] | string;
  featured: boolean;
  year: number;
  status: string[] | string;
}

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAnimating, setIsAnimating] = useState(false);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        const data = await res.json();
        
        if (data.success && Array.isArray(data.projects)) {
          // Filter for featured projects instead of active ones
          const featuredProjects = data.projects.filter(
            (project: Project) => project.featured === true
          );
          
          setProjectsData(featuredProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper function to get category string from array or string
  const getCategoryString = (category: string[] | string): string => {
    if (Array.isArray(category)) {
      return category[0] || "other";
    }
    return category || "other";
  };

  // Helper function to get status string from array or string
  const getStatusString = (status: string[] | string): string => {
    if (Array.isArray(status)) {
      return status[0] || "unknown";
    }
    return status || "unknown";
  };

  // Create category map with proper category extraction
  const categoryMap = projectsData.reduce<Record<string, number>>((acc, project) => {
    const categoryString = getCategoryString(project.category).toLowerCase();
    // Convert "Web Development" to "web", "Mobile Development" to "mobile", etc.
    const normalizedCategory = categoryString.includes("web") ? "web" :
                              categoryString.includes("mobile") ? "mobile" :
                              categoryString.includes("game") ? "game" :
                              categoryString.includes("app") ? "app" :
                              categoryString.includes("configuration") ? "config" :
                              "other";
    
    acc[normalizedCategory] = (acc[normalizedCategory] || 0) + 1;
    return acc;
  }, {});

  const availableCategories = ["all", ...Object.keys(categoryMap)];

  const filteredProjects = selectedCategory === "all"
    ? projectsData
    : projectsData.filter((project) => {
        const categoryString = getCategoryString(project.category).toLowerCase();
        const normalizedCategory = categoryString.includes("web") ? "web" :
                                  categoryString.includes("mobile") ? "mobile" :
                                  categoryString.includes("game") ? "game" :
                                  categoryString.includes("app") ? "app" :
                                  categoryString.includes("configuration") ? "config" :
                                  "other";
        return normalizedCategory === selectedCategory;
      });

  const nextProject = () => {
    if (isAnimating || filteredProjects.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevProject = () => {
    if (isAnimating || filteredProjects.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToProject = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProjects.length]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Globe className={styles.categoryIcon} />;
      case "game":
        return <Gamepad2 className={styles.categoryIcon} />;
      case "mobile":
        return <Smartphone className={styles.categoryIcon} />;
      case "app":
        return <Monitor className={styles.categoryIcon} />;
      case "config":
        return <Settings className={styles.categoryIcon} />;
      default:
        return <Code className={styles.categoryIcon} />;
    }
  };

  const getStatusColor = (status: string[] | string) => {
    const statusString = getStatusString(status);
    switch (statusString) {
      case "completed":
        return styles.statusCompleted;
      case "in-progress":
        return styles.statusInProgress;
      case "planned":
        return styles.statusPlanned;
      case "active":
        return styles.statusCompleted;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loader}></div>
          <p className={styles.loadingText}>Loading featured projects...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backgroundGlow}></div>

        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleGradient}>Featured Projects</span>
          </h1>
          <p className={styles.subtitle}>
            Showcasing my most notable work - handpicked projects that demonstrate my skills and creativity
          </p>
        </div>

        <div className={styles.categoryFilter}>
          {availableCategories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.categoryActive : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {getCategoryIcon(category)}
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {category !== "all" && ` (${categoryMap[category] || 0})`}
            </button>
          ))}
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            <button
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={prevProject}
              disabled={isAnimating || filteredProjects.length === 0}
            >
              <ChevronLeft size={24} />
            </button>

            <div className={styles.projectsWrapper}>
              {filteredProjects.length === 0 ? (
                <div className={styles.noProjects}>
                  <p>No featured projects found in this category.</p>
                  <p className={styles.noProjectsSubtext}>
                    Projects marked as "featured" will appear here.
                  </p>
                </div>
              ) : (
                <div
                  className={styles.projectsTrack}
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isAnimating
                      ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                      : "none",
                  }}
                >
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`${styles.projectCard} ${
                        index === currentIndex ? styles.projectActive : ""
                      }`}
                    >
                      <div className={styles.projectImage}>
                        {project.image_url ? (
                          <img src={project.image_url} alt={project.title} />
                        ) : (
                          <div style={{ 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #1e293b, #334155)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '1.2rem'
                          }}>
                            {getCategoryIcon(getCategoryString(project.category).toLowerCase().includes("web") ? "web" :
                                           getCategoryString(project.category).toLowerCase().includes("mobile") ? "mobile" :
                                           getCategoryString(project.category).toLowerCase().includes("game") ? "game" :
                                           getCategoryString(project.category).toLowerCase().includes("app") ? "app" :
                                           getCategoryString(project.category).toLowerCase().includes("configuration") ? "config" :
                                           "other")}
                          </div>
                        )}
                        <div className={styles.projectOverlay}>
                          <div className={styles.projectActions}>
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.actionButton}
                            >
                              <Github size={20} />
                            </a>
                            {project.live_url && (
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.actionButton}
                              >
                                <ExternalLink size={20} />
                              </a>
                            )}
                            <button
                              className={styles.actionButton}
                              title="Run Emulation (Coming Soon)"
                              disabled
                            >
                              <Play size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={styles.projectContent}>
                        <div className={styles.projectHeader}>
                          <h3 className={styles.projectTitle}>{project.title}</h3>
                          <div className={styles.projectMeta}>
                            <span className={styles.projectYear}>{project.year}</span>
                            <span
                              className={`${styles.projectStatus} ${getStatusColor(project.status)}`}
                            >
                              {getStatusString(project.status).replace("-", " ")}
                            </span>
                          </div>
                        </div>

                        <p className={styles.projectDescription}>
                          {project.description}
                        </p>

                        <div className={styles.projectTechnologies}>
                          {project.technologies.map((tech, techIndex) => (
                            <span key={`${tech}-${techIndex}`} className={styles.techTag}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={nextProject}
              disabled={isAnimating || filteredProjects.length === 0}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {filteredProjects.length > 0 && (
            <div className={styles.indicators}>
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentIndex ? styles.indicatorActive : ""
                  }`}
                  onClick={() => goToProject(index)}
                />
              ))}
            </div>
          )}
        </div>

        {filteredProjects.length > 0 && (
          <div className={styles.projectCounter}>
            <span className={styles.currentProject}>{currentIndex + 1}</span>
            <span className={styles.totalProjects}>/ {filteredProjects.length}</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Projects;