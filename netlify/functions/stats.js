import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const url = new URL(req.url);
  const pin = url.searchParams.get("pin") || "";

  if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const store = getStore("scans");
  const { blobs } = await store.list();
  const entries = await Promise.all(
    blobs.map((b) => store.get(b.key, { type: "json" }))
  );
  entries.sort((a, b) => new Date(b.ts) - new Date(a.ts));

  return new Response(JSON.stringify(entries), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};

export const config = { path: "/stats" };
