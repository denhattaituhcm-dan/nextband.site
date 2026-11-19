import { env } from "../config/env.js";

/**
 * Lấy base URL của server (API host).
 * Dùng APP_URL nếu có trong env, ngược lại tự build từ PORT.
 */
function getBaseUrl(): string {
  // Ưu tiên APP_URL từ .env (khuyên set trên production: https://api.yourdomain.com)
  if (env.APP_URL) return env.APP_URL;
  const port = env.PORT ?? "3000";
  return `http://localhost:${port}`;
}

/**
 * Chuyển một đường dẫn tương đối (relative path) của file thành Full URL.
 *
 * @example
 * toFileUrl("/uploads/images/avatar.jpg")
 * // => "http://localhost:3000/uploads/images/avatar.jpg"
 *
 * toFileUrl("http://cdn.example.com/image.jpg")
 * // => "http://cdn.example.com/image.jpg"  (giữ nguyên nếu đã là full URL)
 *
 * toFileUrl(null) // => null
 */
export function toFileUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  const supabaseBase = (env.SUPABASE_URL || "https://qxtpbonwjmxmogriyfox.supabase.co").replace(/\/$/, "");

  // Legacy host mapping: api.nextband.site or nextband.site /uploads/(images|audio)/<file>
  const legacyHostMatch = path.match(/^https?:\/\/(?:api\.)?nextband\.site\/uploads\/(images|audio)\/(.+)$/i);
  if (legacyHostMatch && legacyHostMatch[1] && legacyHostMatch[2]) {
    const folder = legacyHostMatch[1].toLowerCase();
    const filename = legacyHostMatch[2].replace(/^\/+/, "");
    return `${supabaseBase}/storage/v1/object/public/exam-assets/${folder}/${filename}`;
  }

  // Canonical mapping: /uploads/images/<filename> hoặc uploads/images/<filename>
  const imgMatch = path.match(/^(?:\/)?uploads\/images\/(.+)$/);
  if (imgMatch && imgMatch[1]) {
    const filename = imgMatch[1].replace(/^\/+/, "");
    return `${supabaseBase}/storage/v1/object/public/exam-assets/images/${filename}`;
  }

  // Canonical mapping: /uploads/audio/<filename> hoặc uploads/audio/<filename>
  const audioMatch = path.match(/^(?:\/)?uploads\/audio\/(.+)$/);
  if (audioMatch && audioMatch[1]) {
    const filename = audioMatch[1].replace(/^\/+/, "");
    return `${supabaseBase}/storage/v1/object/public/exam-assets/audio/${filename}`;
  }

  // Direct exam-assets storage path: exam-assets/(images|audio|speaking-recordings)/<file>
  const examAssetMatch = path.match(/^(?:\/)?exam-assets\/(images|audio|speaking-recordings)\/(.+)$/);
  if (examAssetMatch && examAssetMatch[1] && examAssetMatch[2]) {
    const folder = examAssetMatch[1];
    const filename = examAssetMatch[2].replace(/^\/+/, "");
    return `${supabaseBase}/storage/v1/object/public/exam-assets/${folder}/${filename}`;
  }

  // Direct Supabase storage path (vd: /storage/v1/...)
  if (path.startsWith("/storage/v1/")) {
    return `${supabaseBase}${path}`;
  }

  // Nếu đã là URL đầy đủ (http/https hoặc data:) thì giữ nguyên
  if (/^(https?:\/\/|data:)/i.test(path)) return path;

  // Fallback: relative path khác giữ nguyên behavior cũ
  const base = getBaseUrl().replace(/\/$/, "");
  const relative = path.startsWith("/") ? path : `/${path}`;
  return `${base}${relative}`;
}

/**
 * Áp dụng toFileUrl cho một tập hợp key của object.
 * Trả về object mới với các field được chỉ định đã được chuyển thành Full URL.
 *
 * @example
 * withFileUrls(user, ["avatarUrl", "coverUrl"])
 * // => { ...user, avatarUrl: "http://localhost:3000/uploads/...", coverUrl: null }
 */
export function withFileUrls<T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[],
): T {
  if (!obj) return obj;
  const result = { ...obj };
  for (const key of keys) {
    (result as any)[key] = toFileUrl((obj as any)[key]);
  }
  return result;
}

/**
 * Áp dụng withFileUrls cho một mảng object.
 *
 * @example
 * withFileUrlsMany(users, ["avatarUrl"])
 */
export function withFileUrlsMany<T extends Record<string, any>>(
  arr: T[],
  keys: (keyof T)[],
): T[] {
  return arr.map((item) => withFileUrls(item, keys));
}
