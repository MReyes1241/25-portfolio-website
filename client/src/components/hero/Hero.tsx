import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Download,
  Code2,
  GraduationCap,
  ArrowDown,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import styles from "./Hero.module.css";

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  graduationYear?: string;
  gpa?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  onViewProjects?: () => void;
  onDownloadResume?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  name = "Manuel Reyes Jr",
  title = "Software Engineer",
  description = "Fresh Computer Science graduate from Hunter College with hands-on experience in full-stack development. Ready to contribute to meaningful projects and grow with an innovative team.",
  graduationYear = "2025",
  gpa = "3.4",
  email = "Manuelreyes1241@outlook.com",
  githubUrl = "https://github.com/MReyes1241",
  linkedinUrl = "https://linkedin.com/in/manuel-reyes-jr-swe",
  onViewProjects,
  onDownloadResume,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);

  const skills = [
    "Full Stack Developer",
    "Recent CS Graduate",
    "Software Engineer",
    "Problem Solver",
  ];

  useEffect(() => {
    setIsLoaded(true);

    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2500);

    return () => clearInterval(skillInterval);
  }, []);

  const floatingElements = [
    { icon: Code2, delay: 0, x: "15%", y: "25%" },
    { icon: GraduationCap, delay: 1.5, x: "85%", y: "30%" },
  ];

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.hero}>
      {/* Background */}
      <div className={styles.backgroundOverlay}>
        <div className={styles.radialGradient}></div>
        <div className={styles.gridPattern}></div>
      </div>

      {/* Floating Icons */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <div
            key={index}
            className={`${styles.floatingElement} ${isLoaded ? styles.loaded : ""}`}
            style={{
              left: element.x,
              top: element.y,
              animationDelay: `${element.delay}s`,
            }}
          >
            <Icon size={24} />
          </div>
        );
      })}

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div
          className={`${styles.contentWrapper} ${isLoaded ? styles.loaded : ""}`}
        >
          {/* Status Badge */}
          <div className={styles.statusBadge}>
            <GraduationCap size={16} />
            <span>New Graduate • Open to Work</span>
            <div className={styles.pulsingDot}></div>
          </div>

          {/* Name & Introduction */}
          <h1 className={styles.mainHeading}>
            Hi, I'm <span className={styles.gradientText}>{name}</span>
          </h1>

          {/* Dynamic Role */}
          <div className={styles.skillContainer}>
            <h2 className={styles.currentSkill}>{skills[currentSkill]}</h2>
          </div>

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* Key Highlights */}
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={`${styles.highlightNumber} ${styles.blueText}`}>
                {graduationYear}
              </div>
              <div className={styles.highlightLabel}>Recent Graduate</div>
            </div>
            <div className={styles.highlightCard}>
              <div className={`${styles.highlightNumber} ${styles.purpleText}`}>
                {gpa}
              </div>
              <div className={styles.highlightLabel}>GPA</div>
            </div>
            <div className={styles.highlightCard}>
              <div className={`${styles.highlightNumber} ${styles.greenText}`}>
                SWE
              </div>
              <div className={styles.highlightLabel}>Intern Experience</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton} onClick={onViewProjects}>
              <span>View My Projects</span>
              <ChevronRight size={18} className={styles.chevron} />
            </button>

            <button
              className={styles.secondaryButton}
              onClick={onDownloadResume}
            >
              <Download size={18} />
              Resume
            </button>
          </div>

          {/* Contact Links */}
          <div className={styles.socialLinks}>
            <button
              className={styles.socialLink}
              onClick={handleEmailClick}
              aria-label="Email"
            >
              <Mail size={20} />
            </button>
            <button
              className={styles.socialLink}
              onClick={() => handleSocialClick(githubUrl)}
              aria-label="GitHub"
            >
              <Github size={20} />
            </button>
            <button
              className={styles.socialLink}
              onClick={() => handleSocialClick(linkedinUrl)}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className={styles.scrollIndicator}>
            <ArrowDown size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
