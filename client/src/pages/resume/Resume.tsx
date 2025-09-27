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
import Footer from "../../components/footer/Footer";
import { resumeData } from "../../data/resumeData";
import { supabase } from "../../lib/supabaseClient";

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

  const handleDownloadResume = () => {
    const { data } = supabase.storage
      .from('resumes')
      .getPublicUrl('Manuel_Reyes_jr (v3).pdf');
    
    const link = document.createElement('a');
    link.href = data.publicUrl;
    link.download = 'Manuel_Reyes_Jr_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>  
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
            {resumeData.experience.map((company, index) => (
              <div key={index} className={styles.companyGroup}>
                <div className={styles.companyHeader}>
                  <div className={styles.companyName}>{company.company}</div>
                  <div className={styles.companyMeta}>
                    {company.totalDuration && (
                      <div className={styles.totalDuration}>{company.totalDuration}</div>
                    )}
                    <div>{company.location}</div>
                  </div>
                </div>
                
                {company.positions.map((position, posIndex) => (
                  <div key={posIndex} className={styles.positionItem}>
                    <div className={styles.positionHeader}>
                      <div>
                        <div className={styles.jobTitle}>{position.title}</div>
                        {position.github && (
                          <a
                            href={`https://${position.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLink}
                          >
                            <ExternalLink size={12} />
                            {position.github}
                          </a>
                        )}
                      </div>
                      <div className={styles.positionDates}>{position.dates}</div>
                    </div>
                    <ul className={styles.bulletPoints}>
                      {position.points.map((point, i) => (
                        <li key={i} className={styles.bulletPoint}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
            <button
              onClick={handleDownloadResume}
              className={`${styles.downloadButton} ${hoveredElements.download ? styles.downloadButtonHover : ""}`}
              onMouseEnter={() => handleMouseEnter("download")}
              onMouseLeave={() => handleMouseLeave("download")}
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
    
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