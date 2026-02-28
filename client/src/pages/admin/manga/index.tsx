import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { usePushNotifications } from "../../../hooks/usePushNotifications";
import styles from "./styles/AdminMangaTracker.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MangaDexSearchResult {
  id: string;
  attributes: {
    title: { en?: string; [key: string]: string | undefined };
    status: string;
    lastChapter: string | null;
  };
  relationships: Array<{
    type: string;
    id: string;
    attributes?: { fileName?: string };
  }>;
}

interface TrackedManga {
  id: string;
  mangadex_id: string;
  title: string;
  cover_filename: string | null;
  status: string | null;
  last_chapter: string | null;
  last_chapter_id: string | null;
  last_updated_at: string | null;
  added_at: string;
  reading_status: ReadingStatus;
}

type ReadingStatus = "reading" | "on_hold" | "plan_to_read" | "dropped";

// ─── Constants ────────────────────────────────────────────────────────────────

const READING_STATUSES: { value: ReadingStatus; label: string }[] = [
  { value: "reading",      label: "Reading" },
  { value: "on_hold",      label: "On Hold" },
  { value: "plan_to_read", label: "Plan to Read" },
  { value: "dropped",      label: "Dropped" },
];

const readingStatusStyle: Record<ReadingStatus, string> = {
  reading:      styles.rsReading,
  on_hold:      styles.rsOnHold,
  plan_to_read: styles.rsPlanToRead,
  dropped:      styles.rsDropped,
};

const mangaStatusColor: Record<string, string> = {
  ongoing:   styles.statusOngoing,
  completed: styles.statusCompleted,
  hiatus:    styles.statusHiatus,
  cancelled: styles.statusCancelled,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getCoverUrl = (mangadexId: string, filename: string | null) => {
  if (!filename) return null;
  return `https://uploads.mangadex.org/covers/${mangadexId}/${filename}.256.jpg`;
};

const getTitle = (result: MangaDexSearchResult): string => {
  const t = result.attributes.title;
  return t.en ?? Object.values(t)[0] ?? "Unknown Title";
};

const getCoverFilename = (result: MangaDexSearchResult): string | null => {
  const cover = result.relationships.find((r) => r.type === "cover_art");
  return cover?.attributes?.fileName ?? null;
};

const getChapterUrl = (manga: TrackedManga): string => {
  if (manga.last_chapter_id) {
    return `https://mangadex.org/chapter/${manga.last_chapter_id}`;
  }
  return `https://mangadex.org/title/${manga.mangadex_id}`;
};

// ─── Component ───────────────────────────────────────────────────────────────

const AdminMangaTracker = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MangaDexSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [tracked, setTracked] = useState<TrackedManga[]>([]);
  const [loadingTracked, setLoadingTracked] = useState(true);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<ReadingStatus | "all">("all");

  const { status: pushStatus, subscribe, unsubscribe } = usePushNotifications();

  

  const fetchTracked = useCallback(async () => {
    setLoadingTracked(true);
    const { data, error } = await supabase
      .from("manga_tracking")
      .select("*")
      .order("added_at", { ascending: false });

    if (!error) setTracked(data ?? []);
    setLoadingTracked(false);
  }, []);

  useEffect(() => {
    fetchTracked();
  }, [fetchTracked]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setSearching(true);
    setSearchError("");
    setSearchResults([]);

    try {
      const params = new URLSearchParams({
        title: trimmed,
        limit: "10",
        "includes[]": "cover_art",
        "availableTranslatedLanguage[]": "en",
      });

      const res = await fetch(`https://api.mangadex.org/manga?${params}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setSearchResults(json.data ?? []);
    } catch {
      setSearchError("Search failed — MangaDex may be unavailable. Try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleTrack = async (result: MangaDexSearchResult) => {
    if (tracked.some((t) => t.mangadex_id === result.id)) return;
    setTrackingId(result.id);

    let lastChapter: string | null = null;
    let lastChapterId: string | null = null;
    try {
      const feedParams = new URLSearchParams({
        limit: "1",
        "translatedLanguage[]": "en",
        "order[chapter]": "desc",
        includeEmptyPages: "0",
      });
      const feedRes = await fetch(
        `https://api.mangadex.org/manga/${result.id}/feed?${feedParams}`
      );
      if (feedRes.ok) {
        const feedJson = await feedRes.json();
        const ch = feedJson.data?.[0];
        if (ch) {
          lastChapter = ch.attributes?.chapter ?? null;
          lastChapterId = ch.id ?? null;
        }
      }
    } catch { /* non-fatal */ }

    const { error } = await supabase.from("manga_tracking").insert({
      mangadex_id: result.id,
      title: getTitle(result),
      cover_filename: getCoverFilename(result),
      status: result.attributes.status,
      last_chapter: lastChapter,
      last_chapter_id: lastChapterId,
      last_checked_at: new Date().toISOString(),
      reading_status: "reading",
    });

    if (!error) {
      await fetchTracked();
      setSearchResults((prev) => prev.filter((r) => r.id !== result.id));
    }
    setTrackingId(null);
  };

  const handleReadingStatusChange = async (id: string, newStatus: ReadingStatus) => {
    setTracked((prev) =>
      prev.map((m) => (m.id === id ? { ...m, reading_status: newStatus } : m))
    );
    await supabase
      .from("manga_tracking")
      .update({ reading_status: newStatus })
      .eq("id", id);
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Stop tracking this manga?")) return;
    setRemovingId(id);
    await supabase.from("manga_tracking").delete().eq("id", id);
    setTracked((prev) => prev.filter((t) => t.id !== id));
    setRemovingId(null);
  };

  const trackedIds = new Set(tracked.map((t) => t.mangadex_id));

  const filteredTracked =
    activeFilter === "all"
      ? tracked
      : tracked.filter((m) => m.reading_status === activeFilter);

  const counts = tracked.reduce((acc, m) => {
    const rs = m.reading_status ?? "reading";
    acc[rs] = (acc[rs] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/admin/dashboard")} className={styles.backButton}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 16l-4-4m0 0l4-4m-4 4h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Dashboard
      </button>

      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Manga Tracker</h1>
          <p className={styles.subtitle}>
            Tracking {tracked.length} series — get notified when new chapters drop
          </p>
        </div>

        {/* Push notification toggle */}
        <div>
          {pushStatus === "unsupported" ? null : pushStatus === "denied" ? (
            <p className={styles.pushDenied}>
              Notifications blocked — enable in browser settings
            </p>
          ) : (
            <button
              onClick={pushStatus === "subscribed" ? unsubscribe : subscribe}
              disabled={pushStatus === "loading"}
              className={`${styles.pushBtn} ${pushStatus === "subscribed" ? styles.pushBtnActive : ""}`}
            >
              {pushStatus === "loading" ? (
                <span className={styles.spinner} />
              ) : pushStatus === "subscribed" ? (
                <>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  Push On
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Enable Push
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ── Search ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Add Manga</h2>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search MangaDex by title..."
            className={styles.searchInput}
          />
          <button type="submit" disabled={searching} className={styles.searchBtn}>
            {searching ? <span className={styles.spinner} /> : (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            {searching ? "Searching..." : "Search"}
          </button>
        </form>

        {searchError && <p className={styles.error}>{searchError}</p>}

        {searchResults.length > 0 && (
          <div className={styles.searchResults}>
            {searchResults.map((result) => {
              const title = getTitle(result);
              const coverUrl = getCoverUrl(result.id, getCoverFilename(result));
              const alreadyTracked = trackedIds.has(result.id);
              const isTracking = trackingId === result.id;

              return (
                <div key={result.id} className={styles.searchCard}>
                  <div className={styles.searchCover}>
                    {coverUrl ? (
                      <img src={coverUrl} alt={title} className={styles.coverImg} referrerPolicy="no-referrer" />
                    ) : (
                      <div className={styles.coverPlaceholder}>?</div>
                    )}
                  </div>
                  <div className={styles.searchInfo}>
                    <p className={styles.searchTitle}>{title}</p>
                    <span className={`${styles.statusBadge} ${mangaStatusColor[result.attributes.status] ?? ""}`}>
                      {result.attributes.status}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTrack(result)}
                    disabled={alreadyTracked || isTracking}
                    className={`${styles.trackBtn} ${alreadyTracked ? styles.trackBtnDisabled : ""}`}
                  >
                    {isTracking ? <span className={styles.spinner} /> : alreadyTracked ? "Tracking" : "+ Track"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Tracked List ── */}
      <section className={styles.section}>
        <div className={styles.trackedHeader}>
          <h2 className={styles.sectionTitle}>Currently Tracking</h2>
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${activeFilter === "all" ? styles.filterTabActive : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All <span className={styles.filterCount}>{tracked.length}</span>
            </button>
            {READING_STATUSES.map((s) => (
              <button
                key={s.value}
                className={`${styles.filterTab} ${activeFilter === s.value ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter(s.value)}
              >
                {s.label}
                {counts[s.value] ? (
                  <span className={styles.filterCount}>{counts[s.value]}</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {loadingTracked ? (
          <div className={styles.loadingRow}>
            <span className={styles.spinner} /> Loading...
          </div>
        ) : filteredTracked.length === 0 ? (
          <p className={styles.emptyState}>
            {activeFilter === "all"
              ? "No manga tracked yet. Search above to add some."
              : `No manga marked as "${READING_STATUSES.find((s) => s.value === activeFilter)?.label}".`}
          </p>
        ) : (
          <div className={styles.trackedGrid}>
            {filteredTracked.map((manga) => {
              const coverUrl = getCoverUrl(manga.mangadex_id, manga.cover_filename);
              const chapterUrl = getChapterUrl(manga);

              return (
                <div key={manga.id} className={styles.trackedCard}>
                  {/* Clickable cover */}
                  <a
                    href={chapterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.trackedCoverLink}
                    title={manga.last_chapter_id ? `Read Ch. ${manga.last_chapter}` : "View on MangaDex"}
                  >
                    <div className={styles.trackedCover}>
                      {coverUrl ? (
                        <img src={coverUrl} alt={manga.title} className={styles.coverImg} referrerPolicy="no-referrer" />
                      ) : (
                        <div className={styles.coverPlaceholder}>?</div>
                      )}
                      <div className={styles.coverOverlay}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 13h6M9 17h4M14 2v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{manga.last_chapter ? `Ch. ${manga.last_chapter}` : "View"}</span>
                      </div>
                    </div>
                  </a>

                  <div className={styles.trackedInfo}>
                    <a
                      href={chapterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.trackedTitleLink}
                    >
                      {manga.title}
                    </a>

                    <div className={styles.trackedMeta}>
                      <span className={`${styles.statusBadge} ${mangaStatusColor[manga.status ?? ""] ?? ""}`}>
                        {manga.status ?? "unknown"}
                      </span>
                      {manga.last_chapter && (
                        <span className={styles.chapterBadge}>Ch. {manga.last_chapter}</span>
                      )}
                    </div>

                    <select
                      value={manga.reading_status ?? "reading"}
                      onChange={(e) =>
                        handleReadingStatusChange(manga.id, e.target.value as ReadingStatus)
                      }
                      className={`${styles.readingStatusSelect} ${readingStatusStyle[manga.reading_status ?? "reading"]}`}
                    >
                      {READING_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>

                    {manga.last_updated_at && (
                      <p className={styles.lastUpdated}>
                        Updated {new Date(manga.last_updated_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemove(manga.id)}
                    disabled={removingId === manga.id}
                    className={styles.removeBtn}
                    title="Stop tracking"
                  >
                    {removingId === manga.id ? (
                      <span className={styles.spinner} />
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminMangaTracker;