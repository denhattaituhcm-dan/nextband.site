import dotenv from "dotenv";
dotenv.config({ path: ".env.site" });

const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
console.log("Length of key:", key.length);
try {
  const parts = key.split(".");
  console.log("Parts count:", parts.length);
  if (parts.length === 3) {
    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    console.log("Header:", header);
    console.log("Payload:", payload);
  }
} catch (e) {
  console.log("Parse error:", e.message);
}
