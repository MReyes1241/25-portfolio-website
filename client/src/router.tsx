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
import BlogAdminIndex from "./pages/admin/blog/index.tsx";
import BlogAdminCreate from "./pages/admin/blog/create.tsx";
import AdminBlogEdit from "./pages/admin/blog/Edit.tsx";
import AdminProjectIndex from "./pages/admin/projects/index.tsx";
import AdminProjectEdit from "./pages/admin/projects/edit.tsx";
import { TeachingRoutes } from "./routes/TeachingRoutes.tsx";
import AdminMangaTracker from "./pages/admin/manga/index.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

export function AppRoutes() {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Blog Routes */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      
      {/* Teaching Routes */}
      {TeachingRoutes()}
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/blog" element={<ProtectedRoute><BlogAdminIndex /></ProtectedRoute>} />
      <Route path="/admin/blog/create" element={<ProtectedRoute><BlogAdminCreate /></ProtectedRoute>} />
      <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><AdminBlogEdit /></ProtectedRoute>} />
      <Route path="/admin/projects" element={<ProtectedRoute><AdminProjectIndex /></ProtectedRoute>} />
      <Route path="/admin/projects/edit/:id" element={<ProtectedRoute><AdminProjectEdit /></ProtectedRoute>} />
      <Route path="/admin/manga" element={<ProtectedRoute><AdminMangaTracker /></ProtectedRoute>} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}