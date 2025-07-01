// src/router.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import NotFound from "./pages/notfound/NotFound.tsx";
import { About } from "./pages/about/About.tsx";
import Resume from "./pages/resume/Resume.tsx";
import Contact from "./pages/contact/Contact.tsx";
import Projects from "./pages/projects/Projects.tsx";
import Blog from "./pages/blog/Blog.tsx";
import BlogPostPage from "./pages/blog/BlogPostPage.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
