import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/AdminBlogForm.module.css";
import { supabase } from "../../../lib/supabaseClient";
import MDEditor from "@uiw/react-md-editor";
import { useQueryClient } from "@tanstack/react-query";


const AdminBlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Failed to load blog post.");
      } else {
        setTitle(data.title ?? "");
        setExcerpt(data.excerpt ?? "");
        setContent(data.content ?? "");
        setReadTime(data.read_time ?? "");
        setCategory(data.category ?? "");
        setTags((data.tags || []).join(", "));
        setPublished(data.published ?? false);
      }
      setLoading(false);
    };

    if (id) fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase
      .from("blog_posts")
      .update({
        title,
        excerpt,
        content,
        read_time: readTime,
        category,
        tags: tags.split(",").map((tag) => tag.trim()),
        published,
      })
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      navigate("/admin/blog");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      alert("Failed to delete post.");
    } else {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      alert("Post deleted.");
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
        <h1 className={styles.title}>Edit Blog Post</h1>
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
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
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
          <select
            className={styles.input}
            value={published ? "published" : "draft"}
            onChange={(e) => setPublished(e.target.value === "published")}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.submitBtn}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>

          <button
            onClick={handleDelete}
            className={styles.deleteBtn}
          >
            Delete Post
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminBlogEdit;
