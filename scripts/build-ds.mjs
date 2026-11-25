// Builds both design systems as static pages and copies them into the site's
// public folder, so the site serves them at /ds/v1 and /ds/v2 with no second server.
//   node scripts/build-ds.mjs
import { execSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const systems = [
  { name: "payday", base: "/ds/v1", site: "/" },
  { name: "shift", base: "/ds/v2", site: "/v2" },
];

for (const s of systems) {
  const dir = join(root, "design-systems", s.name);
  console.log(`building ${s.name} for ${s.base}`);
  rmSync(join(dir, ".next-static"), { recursive: true, force: true });
  execSync("npx next build", {
    cwd: dir,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1", DS_BASE: s.base, NEXT_PUBLIC_SITE_URL: s.site },
  });
  const out = join(root, "site", "public", s.base);
  rmSync(out, { recursive: true, force: true });
  cpSync(join(dir, ".next-static"), out, { recursive: true });
}
console.log("done: site/public/ds/v1 and site/public/ds/v2");
