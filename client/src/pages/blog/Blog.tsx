import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Blog.module.css";
import Footer from "../../components/footer/Footer";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  readTime: string;
  tags: string[];
  category: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog`);
        const data = await res.json();
        if (data.success) {
          setPosts(data.data.posts);
        }
      } catch (err) {
        console.error("Failed to fetch blog posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(posts.map((post) => post.category))];
    return ["All", ...unique];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const formatDate = (date: string) => {
    const parsed = new Date(date);
    return isNaN(parsed.getTime())
      ? "Unknown"
      : parsed.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Blog</h1>
            <p className={styles.subtitle}>
              Thoughts on technology, life, design, and everything in between
            </p>
          </div>
        </div>

        <div className={styles.main}>
          {/* Category Filters */}
          <div className={styles.filters}>
            <h3 className={styles.filtersTitle}>Topics</h3>
            <div className={styles.filterButtons}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.filterButton} ${
                    selectedCategory === category ? styles.filterButtonActive : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div className={styles.blogGrid}>
            {filteredPosts.map((post) => (
              <article key={post.id} className={styles.blogCard}>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.date}>{formatDate(post.created_at)}</span>
                    <span className={styles.readTime}>{post.readTime}</span>
                  </div>

                  <div className={styles.cardCategory}>{post.category}</div>

                  <h2 className={styles.cardTitle}>{post.title}</h2>

                  <p className={styles.cardExcerpt}>{post.excerpt}</p>

                  <div className={styles.cardTags}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className={styles.readMore}
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Read More
                    <svg
                      className={styles.arrow}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className={styles.noResults}>
              <p>No posts found for the selected topic.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
    
  );
};

export default Blog;