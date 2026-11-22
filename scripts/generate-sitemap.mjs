import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOMAIN = "https://nextband.site";
const TODAY = new Date().toISOString().slice(0, 10);

const ROUTES = [
  // Core Landing & Brand
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/method", changefreq: "monthly", priority: "0.9" },
  { path: "/academic-system", changefreq: "monthly", priority: "0.9" },
  { path: "/teachers", changefreq: "monthly", priority: "0.8" },
  { path: "/results", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/news", changefreq: "weekly", priority: "0.8" },
  { path: "/buddy", changefreq: "monthly", priority: "0.7" },

  // Courses & Assessment Funnel
  { path: "/courses", changefreq: "weekly", priority: "0.9" },
  { path: "/courses/cambridge-kids", changefreq: "monthly", priority: "0.8" },
  { path: "/courses/starter", changefreq: "monthly", priority: "0.8" },
  { path: "/courses/dreamer", changefreq: "monthly", priority: "0.8" },
  { path: "/courses/builder", changefreq: "monthly", priority: "0.8" },
  { path: "/courses/master", changefreq: "monthly", priority: "0.8" },
  { path: "/courses/leader", changefreq: "monthly", priority: "0.8" },
  { path: "/self-study-courses", changefreq: "weekly", priority: "0.9" },
  { path: "/assessment", changefreq: "weekly", priority: "0.9" },
  { path: "/diagnostic", changefreq: "weekly", priority: "0.9" },

  // Public Self-Study & IELTS Traffic Hubs
  { path: "/ielts-speaking-forecast", changefreq: "weekly", priority: "0.9" },
  { path: "/reading", changefreq: "weekly", priority: "0.9" },
  { path: "/reading-challenge", changefreq: "weekly", priority: "0.9" },
  { path: "/reading/idioms", changefreq: "weekly", priority: "0.8" },
  { path: "/vocab-c1", changefreq: "weekly", priority: "0.8" },
  { path: "/vocab-c2", changefreq: "weekly", priority: "0.8" },
  { path: "/cambridge-vocab", changefreq: "weekly", priority: "0.9" },
  { path: "/vocab-in-use", changefreq: "weekly", priority: "0.8" },
  { path: "/essential-vocabulary", changefreq: "weekly", priority: "0.8" },
  { path: "/c1-mastery", changefreq: "monthly", priority: "0.7" },
  { path: "/preposition-lab", changefreq: "monthly", priority: "0.7" },
  { path: "/arena", changefreq: "weekly", priority: "0.8" },
  { path: "/chemistry", changefreq: "monthly", priority: "0.6" },

  // Careers
  { path: "/careers", changefreq: "weekly", priority: "0.8" },
  { path: "/careers/ielts-teacher", changefreq: "monthly", priority: "0.7" },
  { path: "/careers/k12-english-teacher", changefreq: "monthly", priority: "0.7" },
  { path: "/careers/academic-coordinator", changefreq: "monthly", priority: "0.7" },
  { path: "/careers/teaching-assistant", changefreq: "monthly", priority: "0.7" },

  // Legal
  { path: "/terms", changefreq: "yearly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.5" },
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.map(
    (r) =>
      `  <url>\n    <loc>${DOMAIN}${r.path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  ),
  "</urlset>",
  "",
].join("\n");

const outPath = path.resolve(__dirname, "../nextband/public/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");
console.log(`Generated sitemap.xml with ${ROUTES.length} URLs at ${outPath}`);
