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

export interface Position {
  title: string;
  dates: string;
  github?: string;
  points: string[];
}

export interface Experience {
  company: string;
  location: string;
  totalDuration?: string;
  positions: Position[];
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
    website: "https://www.reyesjr.com",
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
      location: "New York, NY",
      totalDuration: "2 yrs 8 mos",
      positions: [
        {
          title: "Adjunct Lecturer, Computer Science",
          dates: "Aug. 2025 – Present",
          points: [
            "Teach and mentor 30+ students in introductory Python, designing lectures and assessments while guiding them through debugging, installations, and algorithmic thinking."
          ],
        },
        {
          title: "Workshop Facilitator - Computer Science (SEEK Summer Bridge Program)",
          dates: "Jul. 2025 – Aug. 2025",
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
          title: "Undergraduate Teaching Assistant",
          dates: "Feb. 2023 – May. 2025",
          points: [
            "Supported students in Python, MIPS, and C++ courses by guiding them through assignments, debugging code, and preparing for exams.",
            "Assisted the professor with grading, provided detailed feedback, conducted tutoring sessions and code reviews, and offered advice to help students navigate course material and improve their understanding.",
          ],
        },
      ],
    },
    {
      company: "Apple",
      location: "New York, NY",
      positions: [
        {
          title: "Specialist",
          dates: "Aug. 2025 – Present",
          points: [
            "Provided technical guidance and problem-solving support to customers, explaining system integrations and multi-device ecosystems in clear, accessible terms."
          ],
        },
      ],
    },
    {
      company: "Patina Network",
      location: "New York, NY",
      positions: [
        {
          title: "Software Engineering Intern",
          dates: "Jun. 2024 – Aug. 2024",
          github: "github.com/arklian/patina",
          points: [
            "Created automated image workflow by writing shell scripts to upload images from Google Drive to DigitalOcean S3 buckets via REST APIs, auto-generating URL mappings for TypeScript and implementing version control with multi-environment support.",
            "Built and deployed OCI Docker images of Spring Boot backend to DigitalOcean VMs while collaborating with UI/UX designers to translate Figma mocks into responsive React/TypeScript interfaces using Mantine UI.",
            "Managed development workflow using Linear for task coordination and participated in rigorous code reviews on Gerrit with approval-gated merges and CI integration.",
            "Worked in Agile environment with daily stand-ups, 1:1s, and retrospectives while maintaining high code quality through auto-formatters, linters, and strict style guidelines."
          ],
        },
      ],
    },
    {
      company: "Nike",
      location: "New York, NY",
      positions: [
        {
          title: "Athlete (Sales Associate)",
          dates: "Aug. 2022 – Feb. 2023",
          points: [
            "Delivered premium customer experiences by communicating technical product knowledge in clear terms, collaborating with teammates in fast-paced environments, and adapting quickly to evolving challenges."
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: "Task Queue System",
      github: "github.com/MReyes1241/task-queue-system",
      date: "Aug. 2025 – Present",
      points: [
        "Designed distributed task queue system using Java Spring Boot and Redis to handle asynchronous background processing of image resizing, email notifications, and data processing jobs with task prioritization and retry mechanisms.",
        "Built RESTful API with comprehensive task management endpoints and deployed using Docker containers on AWS EC2 with Redis Cluster for high availability and horizontal scaling based on queue depth metrics."
      ],
    },
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
      "Spring, PHP, Flask, Kotlin, Gradle, Docker, DigitalOcean, AWS EC2, Redis",
    Tools:
      "Figma, VS Code, PyCharm, IntelliJ, Sublime Merge, pgAdmin, Postman, Linear, Notion",
    Other:
      "Git/Github, MacOS, Linux, Windows Terminal, REST API, CLI, CI/CD, GitHub Actions",
  },
};