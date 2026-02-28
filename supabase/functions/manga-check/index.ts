import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

interface TrackedManga {
  id: string;
  mangadex_id: string;
  title: string;
  cover_filename: string | null;
  last_chapter: string | null;
  last_chapter_id: string | null;
  reading_status: string;
}

interface NewChapter {
  manga: TrackedManga;
  chapterNumber: string;
  chapterId: string;
  chapterTitle: string | null;
}

function isNewerChapter(incoming: string, current: string | null): boolean {
  if (!current) return true;
  const a = parseFloat(incoming);
  const b = parseFloat(current);
  if (!isNaN(a) && !isNaN(b)) return a > b;
  return incoming > current;
}

function getCoverUrl(mangadexId: string, filename: string | null): string {
  if (!filename) return "";
  return `https://uploads.mangadex.org/covers/${mangadexId}/${filename}.256.jpg`;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchLatestChapter(mangadexId: string) {
  const params = new URLSearchParams({
    limit: "1",
    "translatedLanguage[]": "en",
    "order[chapter]": "desc",
    includeEmptyPages: "0",
  });

  const res = await fetch(
    `https://api.mangadex.org/manga/${mangadexId}/feed?${params}`,
    { headers: { "User-Agent": "reyesjr-manga-tracker/1.0" } }
  );

  if (!res.ok) return null;
  const json = await res.json();
  const ch = json.data?.[0];
  if (!ch) return null;
  const chapter = ch.attributes?.chapter;
  if (!chapter) return null;

  return {
    chapter,
    chapterId: ch.id,
    title: ch.attributes?.title ?? null,
  };
}

async function sendEmail(updates: NewChapter[], resendKey: string, adminEmail: string) {
  const itemsHtml = updates.map((u) => {
    const coverUrl = getCoverUrl(u.manga.mangadex_id, u.manga.cover_filename);
    const chapterUrl = `https://mangadex.org/chapter/${u.chapterId}`;
    return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1e293b;vertical-align:top;">
          <table cellpadding="0" cellspacing="0" style="width:100%">
            <tr>
              ${coverUrl ? `<td style="width:48px;padding-right:12px;vertical-align:top;">
                <img src="${coverUrl}" width="48" height="68" style="border-radius:4px;object-fit:cover;" />
              </td>` : ""}
              <td style="vertical-align:top;">
                <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#e2e8f0;">${u.manga.title}</p>
                <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;">
                  Chapter ${u.chapterNumber}${u.chapterTitle ? ` — ${u.chapterTitle}` : ""}
                </p>
                <a href="${chapterUrl}" style="display:inline-block;background:#3b82f6;color:white;text-decoration:none;padding:6px 14px;border-radius:4px;font-size:13px;font-weight:500;">
                  Read Now
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }).join("");

  const html = `<!DOCTYPE html>
    <html>
      <body style="background:#0f172a;margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="max-width:540px;margin:0 auto;">
          <h1 style="font-size:22px;font-weight:700;color:#60a5fa;margin:0 0 4px;">📖 Manga Updates</h1>
          <p style="color:#64748b;font-size:14px;margin:0 0 24px;">
            ${updates.length} new chapter${updates.length > 1 ? "s" : ""} available
          </p>
          <table cellpadding="0" cellspacing="0" style="width:100%;">
            <tbody>${itemsHtml}</tbody>
          </table>
          <p style="color:#334155;font-size:12px;margin-top:24px;text-align:center;">reyesjr.com manga tracker</p>
        </div>
      </body>
    </html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Manga Tracker <manga@reyesjr.com>",
      to: [adminEmail],
      subject: `📖 ${updates.length} new manga chapter${updates.length > 1 ? "s" : ""} available`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
  }
}

async function sendPushNotifications(
  updates: NewChapter[],
  supabase: ReturnType<typeof createClient>,
  vapidPublic: string,
  vapidPrivate: string
) {
  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("*");

  if (!subscriptions?.length) return;

  webpush.setVapidDetails("mailto:admin@reyesjr.com", vapidPublic, vapidPrivate);

  const body =
    updates.length === 1
      ? `${updates[0].manga.title} — Ch. ${updates[0].chapterNumber}`
      : `${updates.length} new chapters available`;

  const payload = JSON.stringify({
    title: "📖 New Manga Chapters",
    body,
    icon: "/favicon.ico",
    data: {
      url:
        updates.length === 1
          ? `https://mangadex.org/chapter/${updates[0].chapterId}`
          : "https://reyesjr.com/admin/manga",
    },
  });

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      );
    } catch (err) {
      console.error(`Push failed for ${sub.endpoint}:`, err);
      // Remove stale subscriptions (410 = expired)
      if ((err as { statusCode?: number }).statusCode === 410) {
        await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
      }
    }
  }
}

Deno.serve(async (_req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    const vapidPublic = Deno.env.get("VAPID_PUBLIC_KEY") ?? "";
    const vapidPrivate = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";

    if (!supabaseUrl || !supabaseKey || !resendKey || !adminEmail) {
      throw new Error(`Missing env vars: ${[
        !supabaseUrl && "SUPABASE_URL",
        !supabaseKey && "SUPABASE_SERVICE_ROLE_KEY",
        !resendKey && "RESEND_API_KEY",
        !adminEmail && "ADMIN_EMAIL",
      ].filter(Boolean).join(", ")}`);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: mangaList, error } = await supabase
      .from("manga_tracking")
      .select("id, mangadex_id, title, cover_filename, last_chapter, last_chapter_id, reading_status")
      .eq("reading_status", "reading");

    if (error) throw new Error(`Supabase query failed: ${error.message}`);
    if (!mangaList?.length) {
      return new Response(JSON.stringify({ message: "No manga to check" }), { status: 200 });
    }

    const newChapters: NewChapter[] = [];
    const now = new Date().toISOString();

    for (const manga of mangaList as TrackedManga[]) {
      await delay(500);

      let latest = null;
      try {
        latest = await fetchLatestChapter(manga.mangadex_id);
      } catch (e) {
        console.error(`Failed to fetch chapters for ${manga.title}:`, e);
        continue;
      }

      await supabase
        .from("manga_tracking")
        .update({ last_checked_at: now })
        .eq("id", manga.id);

      if (!latest || !isNewerChapter(latest.chapter, manga.last_chapter)) continue;

      await supabase
        .from("manga_tracking")
        .update({
          last_chapter: latest.chapter,
          last_chapter_id: latest.chapterId,
          last_checked_at: now,
          last_updated_at: now,
        })
        .eq("id", manga.id);

      await supabase.from("manga_notifications").insert({
        manga_id: manga.id,
        mangadex_id: manga.mangadex_id,
        manga_title: manga.title,
        chapter_number: latest.chapter,
        chapter_id: latest.chapterId,
        chapter_title: latest.title,
        read: false,
        push_sent: false,
        email_sent: false,
      });

      newChapters.push({
        manga,
        chapterNumber: latest.chapter,
        chapterId: latest.chapterId,
        chapterTitle: latest.title,
      });
    }

    if (newChapters.length > 0) {
      const notifPromises: Promise<unknown>[] = [
        sendEmail(newChapters, resendKey, adminEmail),
      ];

      if (vapidPublic && vapidPrivate) {
        notifPromises.push(
          sendPushNotifications(newChapters, supabase, vapidPublic, vapidPrivate)
        );
      }

      await Promise.allSettled(notifPromises);

      await supabase
        .from("manga_notifications")
        .update({ email_sent: true, push_sent: !!vapidPublic })
        .in("manga_id", newChapters.map((u) => u.manga.id))
        .eq("email_sent", false);
    }

    return new Response(
      JSON.stringify({
        message: "Done",
        checked: mangaList.length,
        newChapters: newChapters.map((u) => ({
          title: u.manga.title,
          chapter: u.chapterNumber,
        })),
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("manga-check fatal error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});