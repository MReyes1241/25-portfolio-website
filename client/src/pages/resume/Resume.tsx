import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Mail,
  LinkedinIcon,
  GithubIcon,
  Globe,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Download,
} from "lucide-react";
import { useState } from "react";
import styles from "./Resume.module.css";

const Resume = () => {
  const [expandedSections, setExpandedSections] = useState({
    education: true,
    experience: true,
    projects: true,
    skills: true,
  });

  const [hoveredElements, setHoveredElements] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMouseEnter = (element: string) => {
    setHoveredElements((prev) => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element: string) => {
    setHoveredElements((prev) => ({ ...prev, [element]: false }));
  };

  const resumeData = {
    name: "Manuel Reyes Jr",
    contact: {
      email: "Manuelreyes1241@outlook.com",
      linkedin: "linkedin.com/in/manuel-reyes-jr-swe",
      github: "github.com/MReyes1241",
      website: "#",
    },
    education: {
      school: "Hunter College - City University of New York",
      degree: "Bachelor of Arts in Computer Science",
      minor: "Minor in Mathematics",
      location: "New York, NY",
      dates: "Aug. 2021 – May 2025",
      gpa: "3.4",
      coursework:
        "Operating Systems, Data Structures, Algorithms, Computer Architecture, Software Engineering, Artificial Intelligence",
    },
    experience: [
      {
        company: "Patina Network",
        title: "Software Engineering Intern",
        dates: "Jun. 2024 – Aug. 2024",
        location: "New York, NY",
        github: "github.com/arklian/patina",
        points: [
          "Created a streamlined workflow for handling images used across the website by writing a shell script to upload images stored in a source-of-truth Google Drive folder to Digital Ocean Spaces S3 buckets through their REST APIs and auto-generating a mapping of images to their URLs that are used in the TypeScript.",
          "Added version control and multiple environment support to the image handling workflow, letting developers change images in development without effecting the live website and allowing production rollbacks.",
          "Built OCI Docker images of our Spring Boot backend and deployed them to virtual machines in DigitalOcean.",
          "Collaborated cross-functionally with UI/UX designers to bring their Figma mocks to life using React, TypeScript, and Mantine UI over several iterations while ensuring a mobile-friendly responsive user interface.",
          "Managed tasks and projects in Linear, a Jira-like work tracking tool, to coordinate work across the team.",
          "Engaged in code reviews on Gerrit, with merges blocked by approvals from other engineers and CI tests.",
          "Coded following a strict style guide, utilizing auto-formatters and linters to maintain high code quality.",
          "Worked in an Agile team environment with frequent stand-ups, 1:1s and weekly retrospectives.",
        ],
      },
      {
        company: "Hunter College",
        title: "Undergraduate Teaching Assistant",
        dates: "Feb. 2023 – May. 2025",
        location: "New York, NY",
        points: [
          "Supported students in Python, MIPS, and C++ courses by guiding them through assignments, debugging code, and preparing for exams.",
          "Assisted the professor with grading, provided detailed feedback, conducted tutoring sessions and code reviews, and offered advice to help students navigate course material and improve their understanding.",
        ],
      },
    ],
    projects: [
      {
        name: "Splitsy App",
        github: "github.com/Riyuanliu/Splitsy",
        date: "Feb 2024",
        points: [
          'Collaborated in a team of three to build "Splitsy," an iOS app that simplifies bill splitting.',
          "Built the app's user interface using Swift and SwiftUI, ensuring a seamless user experience.",
          "Used OCR to scan receipts to automate the calculation of individual payment shares.",
        ],
      },
    ],
    skills: {
      Languages:
        "Python, Java, C/C++, SQL, JavaScript, TypeScript, Swift, MIPS, Bash/Zsh/Shell",
      Frontend:
        "HTML/CSS, React, Vue, Mantine UI, JSON, Node.js, npm/pnpm, Vite, ESLint, Prettier",
      "Backend/Cloud":
        "Spring, PHP, Flask, Kotlin, Gradle, Docker, DigitalOcean, AWS",
      Tools:
        "Figma, VS Code, PyCharm, IntelliJ, Sublime Merge, pgAdmin, Postman, Linear, Notion",
      Other:
        "Git/Github, MacOS, Linux, Windows Terminal, REST API, CLI, CI/CD, GitHub Actions",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.resumeWrapper}>
        <div className={styles.resumeHeader}>
          <h1 className={styles.name}>{resumeData.name}</h1>
          <div className={styles.contactInfo}>
            <a
              href={`mailto:${resumeData.contact.email}`}
              className={`${styles.contactItem} ${hoveredElements.email ? styles.contactItemHover : ""}`}
              onMouseEnter={() => handleMouseEnter("email")}
              onMouseLeave={() => handleMouseLeave("email")}
            >
              <Mail size={16} />
              {resumeData.contact.email}
            </a>
            <a
              href={`https://${resumeData.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactItem} ${hoveredElements.linkedin ? styles.contactItemHover : ""}`}
              onMouseEnter={() => handleMouseEnter("linkedin")}
              onMouseLeave={() => handleMouseLeave("linkedin")}
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
            <a
              href={`https://${resumeData.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactItem} ${hoveredElements.github ? styles.contactItemHover : ""}`}
              onMouseEnter={() => handleMouseEnter("github")}
              onMouseLeave={() => handleMouseLeave("github")}
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href={`https://${resumeData.contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactItem} ${hoveredElements.website ? styles.contactItemHover : ""}`}
              onMouseEnter={() => handleMouseEnter("website")}
              onMouseLeave={() => handleMouseLeave("website")}
            >
              <Globe size={16} />
              Website
            </a>
          </div>
        </div>

        {/* Education */}
        <Section
          title="Education"
          icon={<GraduationCap size={24} />}
          expanded={expandedSections.education}
          toggle={() => toggleSection("education")}
          hovered={hoveredElements.educationHeader}
          onHover={() => handleMouseEnter("educationHeader")}
          onLeave={() => handleMouseLeave("educationHeader")}
        >
          <div className={styles.educationItem}>
            <div className={styles.schoolName}>
              {resumeData.education.school}
            </div>
            <div className={styles.degreeInfo}>
              <div>
                <div className={styles.degree}>
                  {resumeData.education.degree}, {resumeData.education.minor}
                </div>
              </div>
              <div className={styles.dateLocation}>
                <div className={styles.gpa}>
                  GPA: {resumeData.education.gpa}
                </div>
                <div>{resumeData.education.dates}</div>
                <div>{resumeData.education.location}</div>
              </div>
            </div>
            <div className={styles.coursework}>
              <strong>Relevant Coursework:</strong>{" "}
              {resumeData.education.coursework}
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section
          title="Experience"
          icon={<Briefcase size={24} />}
          expanded={expandedSections.experience}
          toggle={() => toggleSection("experience")}
          hovered={hoveredElements.experienceHeader}
          onHover={() => handleMouseEnter("experienceHeader")}
          onLeave={() => handleMouseLeave("experienceHeader")}
        >
          {resumeData.experience.map((job, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.jobHeader}>
                <div>
                  <div className={styles.companyName}>{job.company}</div>
                  <div className={styles.jobTitle}>{job.title}</div>
                  {job.github && (
                    <a
                      href={`https://${job.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <ExternalLink size={12} />
                      {job.github}
                    </a>
                  )}
                </div>
                <div className={styles.jobMeta}>
                  <div>{job.dates}</div>
                  <div>{job.location}</div>
                </div>
              </div>
              <ul className={styles.bulletPoints}>
                {job.points.map((point, i) => (
                  <li key={i} className={styles.bulletPoint}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section
          title="Projects"
          icon={<Code size={24} />}
          expanded={expandedSections.projects}
          toggle={() => toggleSection("projects")}
          hovered={hoveredElements.projectsHeader}
          onHover={() => handleMouseEnter("projectsHeader")}
          onLeave={() => handleMouseLeave("projectsHeader")}
        >
          {resumeData.projects.map((project, i) => (
            <div key={i} className={styles.projectItem}>
              <div className={styles.projectHeader}>
                <div className={styles.projectName}>{project.name}</div>
                <a
                  href={`https://${project.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <ExternalLink size={12} />
                  {project.github}
                </a>
                <div className={styles.dateLocation}>{project.date}</div>
              </div>
              <ul className={styles.bulletPoints}>
                {project.points.map((point, j) => (
                  <li key={j} className={styles.bulletPoint}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section
          title="Technical Skills"
          icon={<Award size={24} />}
          expanded={expandedSections.skills}
          toggle={() => toggleSection("skills")}
          hovered={hoveredElements.skillsHeader}
          onHover={() => handleMouseEnter("skillsHeader")}
          onLeave={() => handleMouseLeave("skillsHeader")}
        >
          <div className={styles.skillsGrid}>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className={styles.skillCategory}>
                <div className={styles.skillCategoryTitle}>{category}</div>
                <div className={styles.skillsList}>{skills}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Download */}
        <div className={styles.downloadWrapper}>
          <a
            href="/Manuel_Reyes_jr.pdf"
            download
            className={`${styles.downloadButton} ${hoveredElements.download ? styles.downloadButtonHover : ""}`}
            onMouseEnter={() => handleMouseEnter("download")}
            onMouseLeave={() => handleMouseLeave("download")}
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  toggle: () => void;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  icon,
  expanded,
  toggle,
  hovered,
  onHover,
  onLeave,
  children,
}) => (
  <div className={styles.section}>
    <div
      className={`${styles.sectionHeader} ${hovered ? styles.sectionHeaderHover : ""}`}
      onClick={toggle}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.sectionTitle}>
        {icon}
        {title}
      </div>
      {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>
    {expanded && <div className={styles.sectionContent}>{children}</div>}
  </div>
);

export default Resume;
