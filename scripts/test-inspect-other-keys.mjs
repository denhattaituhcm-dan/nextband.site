import dotenv from "dotenv";
import fs from "fs";

for (const f of [".env.f68a", ".env.nextband"]) {
  if (fs.existsSync(f)) {
    const envConfig = dotenv.parse(fs.readFileSync(f));
    const key = envConfig.SUPABASE_SERVICE_ROLE_KEY || "";
    console.log(`[${f}] SUPABASE_SERVICE_ROLE_KEY length:`, key.length);
    if (key.length > 20) {
      try {
        const parts = key.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
          console.log(`[${f}] payload:`, payload);
        }
      } catch (e) {
        console.log(`[${f}] error parsing key:`, e.message);
      }
    }
  }
}
