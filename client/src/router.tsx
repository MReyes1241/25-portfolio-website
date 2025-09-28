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
import CSCI133Unit1 from "./pages/teaching/csci133/unit1/CSCI133Unit1.tsx";
import CSCI133Unit2 from "./pages/teaching/csci133/unit2/CSCI133Unit2.tsx";
import CSCI133Unit3 from "./pages/teaching/csci133/unit3/CSCI133Unit3.tsx";
import CSCI133Unit4 from "./pages/teaching/csci133/unit4/CSCI133Unit4.tsx";
import CourseHome from "./pages/teaching/CoursesHome.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/teaching" element={<CourseHome />} />
      <Route path="/teaching/csci133/unit1" element={<CSCI133Unit1 />} />
      <Route path="/teaching/csci133/unit2" element={<CSCI133Unit2 />} />
      <Route path="/teaching/csci133/unit3" element={<CSCI133Unit3 />} />
      <Route path="/teaching/csci133/unit4" element={<CSCI133Unit4 />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/blog" element={<BlogAdminIndex />} />
      <Route path="/admin/blog/create" element={<BlogAdminCreate />} />
      <Route path="/admin/blog/edit/:id" element={<AdminBlogEdit />} />
      <Route path="/admin/projects" element={<AdminProjectIndex />} />
      <Route path="/admin/projects/edit/:id" element={<AdminProjectEdit />} />
    </Routes>
  );
}
