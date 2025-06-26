import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./BlogPostPage.module.css";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  readTime: string;
  category: string;
  views: number;
}

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    // Fetch blog post
    useEffect(() => {
    const fetchPost = async () => {
        try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/${id}`);
        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
            throw new Error(`Expected JSON but got: ${contentType}`);
        }

        const data = await res.json();

        if (data.success && data.data) {
            setPost(data.data);
        } else {
            setError("Post not found");
        }
        } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Failed to load blog post");
        } finally {
        setLoading(false);
        }
    };

    if (id) {
        fetchPost();
    } else {
        setError("Invalid post ID");
        setLoading(false);
    }
    }, [id]);

    // Increment views once after post is loaded
    useEffect(() => {
    if (!post?.id) return;

    const timer = setTimeout(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/blog/${post.id}/view`, {
        method: "PATCH",
        });
    }, 500); // debounce to avoid rapid re-renders

    return () => clearTimeout(timer);
    }, [post?.id]);


  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Unknown";
    const parsed = new Date(date);
    return isNaN(parsed.getTime())
      ? "Unknown"
      : parsed.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  const handleBack = () => {
    navigate("/blog");
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.notFound}>
        <h1>404</h1>
        <p>{error || "Blog post not found"}</p>
        <button className={styles.backButton} onClick={handleBack}>
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
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={handleBack}>
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
            Back to Blog
          </button>

          <div className={styles.headerMeta}>
            <span className={styles.views}>
              Views: {post.views?.toLocaleString() || 0}
            </span>
            {post.readTime && (
              <span className={styles.readTime}>{post.readTime}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <article className={styles.article}>
          {/* Post Meta */}
          <div className={styles.postMeta}>
            <div className={styles.metaLeft}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.date}>{formatDate(post.created_at)}</span>
            </div>
          </div>

          {/* Post Title */}
          <h1 className={styles.title}>{post.title}</h1>

          {/* Post Content */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>&copy; 2025 Manuel Reyes. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BlogPostPage;