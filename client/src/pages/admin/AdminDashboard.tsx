import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalBlogs: 0,
    publishedBlogs: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/admin/login');
      } else {
        setUser(data.session.user);
      }
      setIsLoading(false);
    });
  }, [navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch projects stats
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('id, featured');

        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
        }

        // Fetch blog_posts stats - specifically get id and published columns
        const { data: blogPosts, error: blogPostsError } = await supabase
          .from('blog_posts')
          .select('id, published');

        if (blogPostsError) {
          console.error('Error fetching blog posts:', blogPostsError);
        } else {
          console.log('Blog posts data:', blogPosts);
        }

        // Count published blogs
        let publishedCount = 0;
        if (blogPosts && Array.isArray(blogPosts)) {
          publishedCount = blogPosts.filter(post => {
            return post.published === 'true' || post.published === true;
          }).length;
        }

        const newStats = {
          totalProjects: projects?.length || 0,
          featuredProjects: projects?.filter(p => p.featured).length || 0,
          totalBlogs: blogPosts?.length || 0,
          publishedBlogs: publishedCount
        };

        setStats(newStats);

        // Debug logging
        console.log('Stats updated:', newStats);
        console.log('Raw blog posts:', blogPosts);

      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({
          totalProjects: 0,
          featuredProjects: 0,
          totalBlogs: 0,
          publishedBlogs: 0
        });
      }
    };

    if (user) {
      fetchStats();
      
      // Set up real-time subscriptions to update stats when data changes
      const projectsSubscription = supabase
        .channel('projects-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'projects' }, 
          () => {
            console.log('Projects changed, refetching stats...');
            fetchStats();
          }
        )
        .subscribe();

      const blogPostsSubscription = supabase
        .channel('blog-posts-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'blog_posts' }, 
          () => {
            console.log('Blog posts changed, refetching stats...');
            fetchStats();
          }
        )
        .subscribe();

      return () => {
        projectsSubscription.unsubscribe();
        blogPostsSubscription.unsubscribe();
      };
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, {user?.email}</p>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
          </svg>
          Sign Out
        </button>
      </header>

      {/* Stats Overview */}
      <section className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div>
              <p className={styles.statNumber}>{stats.totalProjects}</p>
              <p className={styles.statLabel}>Total Projects</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <p className={styles.statNumber}>{stats.featuredProjects}</p>
              <p className={styles.statLabel}>Featured Projects</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
            </div>
            <div>
              <p className={styles.statNumber}>{stats.totalBlogs}</p>
              <p className={styles.statLabel}>Total Blogs</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <p className={styles.statNumber}>{stats.publishedBlogs}</p>
              <p className={styles.statLabel}>Published Blogs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Cards */}
      <section className={styles.managementSection}>
        <h2 className={styles.sectionTitle}>Management</h2>
        <div className={styles.managementGrid}>
          <div 
            className={styles.managementCard}
            onClick={() => navigate('/admin/projects')}
          >
            <div className={styles.cardIcon}>
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Projects</h3>
            <p className={styles.cardDescription}>Manage your portfolio projects</p>
            <div className={styles.cardArrow}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>

          <div 
            className={styles.managementCard}
            onClick={() => navigate('/admin/blog')}
          >
            <div className={styles.cardIcon}>
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Blog</h3>
            <p className={styles.cardDescription}>Create and manage blog posts</p>
            <div className={styles.cardArrow}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>

          <div
            className={styles.managementCard}
            onClick={() => navigate('/admin/manga')}
          >
            <div className={styles.cardIcon}>
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 14H8v-2h6v2zm2-4H8v-2h8v2zm0-4H8V6h8v2z"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Manga Tracker</h3>
            <p className={styles.cardDescription}>
              Track series and get notified when new chapters drop.
            </p>
            <div className={styles.cardArrow}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActions}>
          <button 
            className={styles.quickActionBtn}
            onClick={() => navigate('/admin/blog/create')}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            New Blog Post
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;