export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let url = searchParams.get("url");

  if (!url) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLink/1.0; +https://onebite.link)",
      },
      signal: AbortSignal.timeout(8000),
    });

    const html = await res.text();

    function getMeta(property: string): string | null {
      const patterns = [
        new RegExp(
          `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*?)["']`,
          "i"
        ),
        new RegExp(
          `<meta[^>]+content=["']([^"']*?)["'][^>]+(?:property|name)=["']${property}["']`,
          "i"
        ),
      ];
      for (const re of patterns) {
        const m = html.match(re);
        if (m?.[1]) return m[1].trim();
      }
      return null;
    }

    const title =
      getMeta("og:title") ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ||
      url;

    const description =
      getMeta("og:description") || getMeta("description") || "";

    const thumbnail = getMeta("og:image") || null;

    return Response.json({ title, description, thumbnail, url });
  } catch {
    return Response.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
}
