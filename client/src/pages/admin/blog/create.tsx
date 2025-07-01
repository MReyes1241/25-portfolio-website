import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/AdminBlogForm.module.css";
import { supabase } from "../../../lib/supabaseClient";
import MDEditor from "@uiw/react-md-editor";

const AdminBlogCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [read_time, setread_time] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.from("blog_posts").insert([
      {
        title,
        excerpt,
        content,
        read_time,
        category,
        tags: tags.split(",").map(tag => tag.trim()),
      },
    ]);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/admin/blog");
    }
  };

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
            <h1 className={styles.title}>Create New Blog Post</h1>
            <div className={styles.form}>
                <input
                className={styles.input}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <input
                className={styles.input}
                placeholder="Excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                />
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                />
                <select
                  className={styles.input}
                  value={read_time}
                  onChange={(e) => setread_time(e.target.value)}
                >
                  <option value="">Select read time</option>
                  {[...Array(6)].map((_, i) => {
                    const value = (i + 1) * 10;
                    return <option key={value} value={`~${value} min read`}>{`~${value} min read`}</option>;
                  })}
                  <option value=">60 min read">{"\u003e"}60 min read</option>
                </select>
                <input
                className={styles.input}
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                />
                <input
                className={styles.input}
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                />

                {error && <p className={styles.error}>{error}</p>}

                <button
                className={styles.submitBtn}
                onClick={handleCreate}
                disabled={loading}
                >
                {loading ? "Creating..." : "Create Post"}
                </button>
            </div>
        </div>
    </>
  );
};

export default AdminBlogCreate;