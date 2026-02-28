import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import styles from "./NotificationBell.module.css";

interface Notification {
  id: string;
  manga_title: string;
  chapter_number: string;
  chapter_id: string;
  chapter_title: string | null;
  read: boolean;
  created_at: string;
}

const NotificationBell = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch latest 20 notifications
  const fetchNotifications = async () => {
    const { data } = await supabase
      .from("manga_notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();

    // Realtime subscription — bell updates instantly when cron fires
    const channel = supabase
      .channel("manga_notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "manga_notifications" },
        () => fetchNotifications()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (!unreadIds.length) return;
    await supabase
      .from("manga_notifications")
      .update({ read: true })
      .in("id", unreadIds);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      await supabase
        .from("manga_notifications")
        .update({ read: true })
        .eq("id", notification.id);
      setNotifications((prev) =>
        prev.map((n) => n.id === notification.id ? { ...n, read: true } : n)
      );
    }
    // Open chapter on MangaDex
    window.open(`https://mangadex.org/chapter/${notification.chapter_id}`, "_blank");
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "Just now";
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.bell}
        onClick={() => { setOpen((o) => !o); if (!open) markAllRead(); }}
        title="Manga notifications"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownTitle}>Notifications</span>
            <button
              className={styles.viewAll}
              onClick={() => { setOpen(false); navigate("/admin/manga"); }}
            >
              View tracker
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className={styles.empty}>No notifications yet</p>
          ) : (
            <ul className={styles.list}>
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`${styles.item} ${!n.read ? styles.itemUnread : ""}`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <div className={styles.itemContent}>
                    <p className={styles.itemTitle}>{n.manga_title}</p>
                    <p className={styles.itemSub}>
                        {n.chapter_number ? `Chapter ${n.chapter_number}${n.chapter_title ? ` — ${n.chapter_title}` : ""}` : "New chapter available"}
                    </p>
                  </div>
                  <span className={styles.itemTime}>{timeAgo(n.created_at)}</span>
                  {!n.read && <span className={styles.unreadDot} />}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;