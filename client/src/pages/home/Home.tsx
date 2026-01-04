import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Hero from "../../components/hero/Hero.tsx";
import styles from "./Home.module.css";
import Footer from "../../components/footer/Footer.tsx";

const API_URL = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["projects"],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        return data.projects;
      },
    });

    queryClient.prefetchQuery({
      queryKey: ["blogPosts"],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/api/blog`);
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        const data = await res.json();
        return data.data.posts;
      },
    });
  }, [queryClient]);

  const handleViewProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    } else {
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

      <Footer />
    </div>
  );
};

export default Home;