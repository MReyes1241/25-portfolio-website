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
} from "lucide-react";
import styles from "./Projects.module.css";
import { imageUrls } from "../../assets/images.ts";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  category: "web" | "game" | "app" | "other";
  featured: boolean;
  year: string;
  status: "completed" | "in-progress" | "planned";
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "TaskFlow Manager",
    description:
      "Full-stack task management application with real-time collaboration",
    longDescription:
      "A comprehensive task management platform featuring real-time updates, team collaboration, drag-and-drop interfaces, and advanced project analytics. Built with modern web technologies for scalability and performance.",
    image: imageUrls.placeholder.src,
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/MReyes1241/taskflow-manager",
    liveUrl: "https://taskflow-demo.vercel.app",
    category: "web",
    featured: true,
    year: "2024",
    status: "completed",
  },
  {
    id: 2,
    title: "Patina Network",
    description:
      "Collaborative network project focused on modern web technologies",
    longDescription:
      "A collaborative project exploring modern networking concepts and web technologies. Features real-time communication, distributed systems, and scalable architecture patterns. My contribution focused on frontend development and user experience design.",
    image: imageUrls.placeholder.src,
    technologies: ["JavaScript", "Node.js", "WebSockets", "Docker"],
    githubUrl: "https://github.com/arklian/patina",
    liveUrl: "https://patinanetwork.org",
    category: "web",
    featured: true,
    year: "2024",
    status: "completed",
  },
  {
    id: 3,
    title: "C++ Game Engine",
    description: "Custom game engine built from scratch using C++ and OpenGL",
    longDescription:
      "A comprehensive game engine featuring advanced rendering pipelines, physics simulation, and cross-platform compatibility. Includes custom memory management and optimized performance for real-time applications.",
    image: imageUrls.placeholder.src,
    technologies: ["C++", "OpenGL", "GLFW", "GLM"],
    githubUrl: "https://github.com/MReyes1241/cpp-game-engine",
    category: "game",
    featured: true,
    year: "2024",
    status: "in-progress",
  },
  {
    id: 4,
    title: "React Native Mobile App",
    description: "Cross-platform mobile application for task management",
    longDescription:
      "A feature-rich mobile application built with React Native, featuring offline sync, push notifications, and intuitive user interface design. Includes advanced state management and performance optimizations.",
    image: imageUrls.placeholder.src,
    technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
    githubUrl: "https://github.com/MReyes1241/mobile-task-app",
    category: "app",
    featured: false,
    year: "2023",
    status: "completed",
  },
  {
    id: 5,
    title: "Web-based IDE",
    description: "Browser-based integrated development environment",
    longDescription:
      "A powerful web-based IDE supporting multiple programming languages with syntax highlighting, code completion, and collaborative editing features. Built with modern web technologies for optimal performance.",
    image: imageUrls.placeholder.src,
    technologies: ["React", "Monaco Editor", "WebSockets", "Docker"],
    githubUrl: "https://github.com/MReyes1241/web-ide",
    liveUrl: "https://web-ide-demo.vercel.app",
    category: "web",
    featured: false,
    year: "2023",
    status: "completed",
  },
  {
    id: 6,
    title: "2D Physics Simulator",
    description:
      "Interactive physics simulation with realistic collision detection",
    longDescription:
      "An advanced 2D physics simulation featuring realistic collision detection, gravity simulation, and interactive particle systems. Includes customizable physics parameters and real-time visualization.",
    image: imageUrls.placeholder.src,
    technologies: ["JavaScript", "Canvas API", "WebGL", "Matter.js"],
    githubUrl: "https://github.com/MReyes1241/physics-sim",
    liveUrl: "https://physics-sim-demo.netlify.app",
    category: "other",
    featured: false,
    year: "2023",
    status: "completed",
  },
];

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length,
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
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Globe className={styles.categoryIcon} />;
      case "game":
        return <Gamepad2 className={styles.categoryIcon} />;
      case "app":
        return <Monitor className={styles.categoryIcon} />;
      default:
        return <Code className={styles.categoryIcon} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "in-progress":
        return styles.statusInProgress;
      case "planned":
        return styles.statusPlanned;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundGlow}></div>

      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>My Projects</span>
        </h1>
        <p className={styles.subtitle}>
          Exploring the intersection of creativity and technology through code
        </p>
      </div>

      <div className={styles.categoryFilter}>
        {["all", "web", "game", "app", "other"].map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.categoryActive : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {getCategoryIcon(category)}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carousel}>
          <button
            className={`${styles.navButton} ${styles.navLeft}`}
            onClick={prevProject}
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.projectsWrapper}>
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
                    <img src={project.image} alt={project.title} />
                    <div className={styles.projectOverlay}>
                      <div className={styles.projectActions}>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionButton}
                        >
                          <Github size={20} />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
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
                        <span className={styles.projectYear}>
                          {project.year}
                        </span>
                        <span
                          className={`${styles.projectStatus} ${getStatusColor(project.status)}`}
                        >
                          {project.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>

                    <p className={styles.projectDescription}>
                      {index === currentIndex
                        ? project.longDescription
                        : project.description}
                    </p>

                    <div className={styles.projectTechnologies}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.navButton} ${styles.navRight}`}
            onClick={nextProject}
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={styles.indicators}>
          {filteredProjects.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ""}`}
              onClick={() => goToProject(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.projectCounter}>
        <span className={styles.currentProject}>{currentIndex + 1}</span>
        <span className={styles.totalProjects}>
          / {filteredProjects.length}
        </span>
      </div>
    </div>
  );
};

export default Projects;
