import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/AdminProjectForm.module.css";
import { supabase } from "../../../lib/supabaseClient";

const AdminProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [status, setStatus] = useState("active");
  const [featured, setFeatured] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Failed to load project.");
      } else {
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        setCurrentImageUrl(data.image_url ?? "");
        setTechnologies((data.technologies || []).join(", "));
        setGithubUrl(data.github_url ?? "");
        setLiveUrl(data.live_url ?? "");
        
        // Handle category as array or string
        if (Array.isArray(data.category)) {
          setCategory(data.category[0] ?? "Web Development");
        } else {
          setCategory(data.category ?? "Web Development");
        }
        
        // Handle status as array or string
        if (Array.isArray(data.status)) {
          setStatus(data.status[0] ?? "active");
        } else {
          setStatus(data.status ?? "active");
        }
        
        setFeatured(data.featured ?? false);
        setYear(data.year ?? new Date().getFullYear());
      }
      setLoading(false);
    };

    if (id) fetchProject();
  }, [id]);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleUpdate = async () => {
    if (!title || !description || !githubUrl) {
      setError("Please fill in all required fields (Title, Description, GitHub URL)");
      return;
    }

    setLoading(true);
    setError("");

    let imageUrl = currentImageUrl;

    // Handle image upload if a new file is selected
    if (imageFile) {
      const uploadedUrl = await handleImageUpload(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        setError("Failed to upload image. Please try again.");
        setLoading(false);
        return;
      }
    }

    const projectData = {
      title,
      description,
      image_url: imageUrl || null,
      technologies: technologies.split(",").map(tech => tech.trim()).filter(tech => tech),
      github_url: githubUrl,
      live_url: liveUrl || null,
      category: [category],
      status: [status],
      featured,
      year,
    };

    const { error } = await supabase
      .from("projects")
      .update(projectData)
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      navigate("/admin/projects");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert("Failed to delete project.");
    } else {
      alert("Project deleted.");
      navigate("/admin/projects");
    }
  };

  const categoryOptions = [
    "Web Development",
    "Mobile Development",
    "Game Development",
    "Application Development",
    "Configuration",
    "Other"
  ];

  return (
    <>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <svg
          className={styles.backArrow}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        Go Back
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>Edit Project</h1>
        <div className={styles.form}>
          <input
            className={styles.input}
            placeholder="Project Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <textarea
            className={styles.textarea}
            placeholder="Short Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />

          <div className={styles.imageUploadSection}>
            <label className={styles.uploadLabel}>
              Project Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className={styles.fileInput}
              />
            </label>
            {currentImageUrl && (
              <div className={styles.currentImage}>
                <img src={currentImageUrl} alt="Current project" />
                <p>Current image</p>
              </div>
            )}
            {imageFile && (
              <div className={styles.newImage}>
                <img src={URL.createObjectURL(imageFile)} alt="New project" />
                <p>New image selected</p>
              </div>
            )}
          </div>

          <input
            className={styles.input}
            placeholder="Technologies (comma-separated)"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />

          <input
            className={styles.input}
            placeholder="GitHub URL *"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            required
          />

          <input
            className={styles.input}
            placeholder="Live URL (optional)"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />

          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
            <option value="archived">Archived</option>
          </select>

          <input
            className={styles.input}
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            min="2000"
            max="2030"
          />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className={styles.checkbox}
            />
            Featured Project
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.submitBtn}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Project"}
          </button>

          <button
            onClick={handleDelete}
            className={styles.deleteBtn}
          >
            Delete Project
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProjectEdit;