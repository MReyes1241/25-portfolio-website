import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./styles/AdminProjectIndex.module.css";
import { supabase } from "../../../lib/supabaseClient";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string[] | string;
  status: string[] | string;
  featured: boolean;
  created_at: string;
  year: number;
}

const AdminProjectIndex = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching projects:", error);
          setError("Failed to load projects. Please try again.");
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (id: number) => navigate(`/admin/projects/edit/${id}`);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ status: [newStatus] })
        .eq("id", id);

      if (error) {
        console.error("Failed to update status:", error);
        alert("Failed to update project status. Please try again.");
      } else {
        setProjects((prev) =>
          prev.map((project) =>
            project.id === id ? { ...project, status: [newStatus] } : project
          )
        );
      }
    } catch (err) {
      console.error("Unexpected error updating status:", err);
      alert("An unexpected error occurred while updating status.");
    }
  };

  const handleFeaturedToggle = async (id: number, featured: boolean) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ featured })
        .eq("id", id);

      if (error) {
        console.error("Failed to update featured status:", error);
        alert("Failed to update featured status. Please try again.");
      } else {
        setProjects((prev) =>
          prev.map((project) =>
            project.id === id ? { ...project, featured } : project
          )
        );
      }
    } catch (err) {
      console.error("Unexpected error updating featured status:", err);
      alert("An unexpected error occurred while updating featured status.");
    }
  };



  const getStatusString = (status: string[] | string | null | undefined): string => {
    if (!status) return "unknown";
    if (Array.isArray(status)) {
      return status.length > 0 ? status[0] : "unknown";
    }
    return status;
  };

  const getCategoryString = (category: string[] | string | null | undefined): string => {
    if (!category) return "other";
    if (Array.isArray(category)) {
      return category.length > 0 ? category[0] : "other";
    }
    return category;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryBtn}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate('/admin/dashboard')}
        className={styles.backButton}
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 16l-4-4m0 0l4-4m-4 4h18" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Dashboard
      </button>

      <div className={styles.headerSection}>
        <h1 className={styles.title}>Manage Projects</h1>
        <div className={styles.projectCount}>
          {projects.length} project{projects.length !== 1 ? 's' : ''} total
        </div>
      </div>

      {projects.length === 0 ? (
        <div className={styles.emptyState}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>No projects found</h3>
          <p>Projects will appear here when they're added to your database.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Year</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className={styles.projectTitle}>{project.title}</div>
                    <div className={styles.projectDescription}>
                      {project.description && project.description.length > 60 
                        ? `${project.description.substring(0, 60)}...` 
                        : project.description || 'No description'}
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>
                      {getCategoryString(project.category)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={getStatusString(project.status)}
                      onChange={(e) => handleStatusChange(project.id, e.target.value)}
                      className={styles.statusSelect}
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={project.featured || false}
                      onChange={(e) => handleFeaturedToggle(project.id, e.target.checked)}
                      className={styles.featuredCheckbox}
                    />
                  </td>
                  <td className={styles.yearCell}>{project.year || 'N/A'}</td>
                  <td className={styles.createdCell}>
                    {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(project.id)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProjectIndex;