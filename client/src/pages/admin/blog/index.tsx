import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./styles/AdminBlogList.module.css";
import { supabase } from "../../../lib/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

const AdminBlogList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleEdit = (id: number) => navigate(`/admin/blog/edit/${id}`);
  const handleCreate = () => navigate('/admin/blog/create');

  const handleStatusChange = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: newStatus === "Published" })
      .eq("id", id);

    if (error) {
      console.error("Failed to update status:", error);
    } else {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, published: newStatus === "Published" } : post
        )
      );
    }
  };

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

      <h1 className={styles.title}>Manage Blog Posts</h1>
      <button className={styles.createBtn} onClick={handleCreate}>
        + New Post
      </button>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <select
                    value={post.published ? "Published" : "Draft"}
                    onChange={(e) => handleStatusChange(post.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(post.id)}
                    className={styles.actionBtn}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBlogList;