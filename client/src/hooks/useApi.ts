import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

// ============ Types ============

export interface Project {
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

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  readTime: string;
  tags: string[];
  category: string;
}

// ============ Fetcher Functions ============

const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(`${API_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  
  if (data.success && Array.isArray(data.projects)) {
    return data.projects;
  }
  throw new Error("Invalid projects response");
};

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const res = await fetch(`${API_URL}/api/blog`);
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  const data = await res.json();
  
  if (data.success && data.data?.posts) {
    return data.data.posts;
  }
  throw new Error("Invalid blog response");
};

// ============ Hooks ============

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
  });
};