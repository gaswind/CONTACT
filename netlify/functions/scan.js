import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  try {
    const ip = context.ip || "";
    let geo = {};
    try {
      const r = await fetch(`https://ipapi.co/${ip}/json/`);
      if (r.ok) {
        const d = await r.json();
        geo = {
          city: d.city || null,
          region: d.region || null,
          country: d.country_name || null,
        };
      }
    } catch (e) {
      // géoloc indisponible : on continue sans bloquer
    }

    const ua = req.headers.get("user-agent") || "";
    let device = "Ordinateur";
    if (/iPhone|Android|Mobi/i.test(ua)) device = "Mobile";
    else if (/iPad|Tablet/i.test(ua)) device = "Tablette";

    const store = getStore("scans");
    const key = `scan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await store.setJSON(key, {
      ts: new Date().toISOString(),
      city: geo.city,
      region: geo.region,
      country: geo.country,
      device,
    });
  } catch (e) {
    // même si le log échoue, on renvoie quand même la fiche contact
  }

  const name = process.env.CONTACT_NAME || "Prénom Nom";
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${name}`,
    `FN:${fname}`,
    `TEL;TYPE=CELL:${process.env.CONTACT_PHONE || ""}`,
    `EMAIL:${process.env.CONTACT_EMAIL || ""}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="contact.vcf"',
      "Cache-Control": "no-store",
    },
  });
};

export const config = { path: "/scan" };
