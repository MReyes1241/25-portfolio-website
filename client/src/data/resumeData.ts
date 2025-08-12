export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Education {
  school: string;
  degree: string;
  minor: string;
  location: string;
  dates: string;
  gpa: string;
  coursework: string;
}

export interface Experience {
  company: string;
  title: string;
  dates: string;
  location: string;
  github?: string;
  points: string[];
}

export interface Project {
  name: string;
  github: string;
  date: string;
  points: string[];
}

export interface Skills {
  [category: string]: string;
}

export interface ResumeData {
  name: string;
  contact: ContactInfo;
  education: Education;
  experience: Experience[];
  projects: Project[];
  skills: Skills;
}

export const resumeData: ResumeData = {
  name: "Manuel Reyes Jr",
  contact: {
    email: "Manuelreyes1241@outlook.com",
    linkedin: "linkedin.com/in/manuel-reyes-jr-swe",
    github: "github.com/MReyes1241",
    website: "www.reyesjr.com",
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
      company: "Hunter College",
      title: "Workshop Facilitator - Computer Science (SEEK Summer Bridge Program)",
      dates: "Jul. 2025 – Aug. 2025",
      location: "New York, NY",
      points: [
        "Designed and taught an accelerated Python course for incoming college students from underrepresented backgrounds in tech.",
        "Developed all curriculum materials from scratch, including slides, assignments, quizzes, and rubrics.",
        "Taught core programming concepts such as variables, conditionals, loops, and functions (with/without parameters).",
        "Created coding exercises and review sheets to reinforce algorithmic thinking and debugging skills.",
        "Built and managed all coursework on Brightspace (LMS), ensuring clear structure and accessibility.",
        "Delivered live instruction and supported students with technical questions during and outside of class.",
        "Worked closely with SEEK academic advisors to track student progress and recommend support interventions.",
        "Participated in collaborative pedagogy and training sessions focused on retention and inclusive CS education.",
        "Emphasized clean, readable code and step-by-step problem-solving—aligning instruction with software engineering best practices.",
        "Mentored students on foundational CS thinking, preparing them for success in CSCI 127 and beyond."
      ],
    },
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
      name: "Unbounded - Social Platform",
      github: "github.com/Unbounded-inc/Unbounded",
      date: "Feb. 2025 – May 2025",
      points: [
        "Built full-stack social platform with React/TypeScript and Node.js/Express featuring real-time messaging, forums, events, and friend system using WebSocket-based chat with Socket.io and PostgreSQL.",
        "Implemented Auth0 authentication with anonymous mode support, deployed via Docker on DigitalOcean with AWS S3 media storage, and integrated Jest/Vitest testing across 4-person team collaboration."
      ],
    },
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