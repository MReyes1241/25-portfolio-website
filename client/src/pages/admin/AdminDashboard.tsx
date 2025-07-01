import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Mock data for dashboard stats
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Active Sessions', value: '89', change: '+5%', trend: 'up' },
    { label: 'Total Revenue', value: '$12,345', change: '+18%', trend: 'up' },
    { label: 'Conversion Rate', value: '3.2%', change: '-2%', trend: 'down' },
  ];

  const managementItems = [
    { title: 'Users', description: 'Manage user accounts and permissions', icon: 'users' },
    { title: 'Content', description: 'Edit and manage website content', icon: 'content' },
    { title: 'Analytics', description: 'View detailed analytics and reports', icon: 'analytics' },
    { title: 'Settings', description: 'Configure system settings', icon: 'settings' },
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'users':
        return (
          <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'content':
        return (
          <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'analytics':
        return (
          <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundEffects}>
        <div className={styles.blurCircle1}></div>
        <div className={styles.blurCircle2}></div>
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            {user && <p className={styles.welcomeText}>Welcome back, {user.email}</p>}
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <svg className={styles.logoutIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                  <div className={`${styles.statChange} ${styles[stat.trend]}`}>
                    <svg className={styles.trendIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {stat.trend === 'up' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      )}
                    </svg>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.managementSection}>
          <h2 className={styles.sectionTitle}>Management</h2>
          <div className={styles.managementGrid}>
            {managementItems.map((item, index) => (
              <div key={index} className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  {getIcon(item.icon)}
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p className={styles.cardDescription}>{item.description}</p>
                <button className={styles.cardButton}>
                  Manage
                  <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;