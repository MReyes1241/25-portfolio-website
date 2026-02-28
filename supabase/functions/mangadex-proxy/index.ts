// Proxies requests to api.mangadex.org to avoid CORS issues

const ALLOWED_PATHS = ["/manga", "/manga/"];

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const url = new URL(req.url);

  // Extract the MangaDex path and query from our URL
  // Expected format: /functions/v1/mangadex-proxy/manga?title=...
  // or: /functions/v1/mangadex-proxy/manga/{id}/feed?...
  const proxyPath = url.pathname.replace(/.*\/mangadex-proxy/, "");
  const queryString = url.search;

  // Only allow manga-related endpoints
  if (!proxyPath.startsWith("/manga")) {
    return new Response(JSON.stringify({ error: "Forbidden path" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const mangadexUrl = `https://api.mangadex.org${proxyPath}${queryString}`;

  try {
    const res = await fetch(mangadexUrl, {
      headers: {
        "User-Agent": "reyesjr-manga-tracker/1.0",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});