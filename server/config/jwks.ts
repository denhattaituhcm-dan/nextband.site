import { createRemoteJWKSet } from "jose";
import { env } from "./env.js";

const getJwksUrl = () => {
  const base = env.SUPABASE_URL || "https://gzpdlqxjggyxlkeatvvf.supabase.co";
  return env.SUPABASE_JWKS_URL || `${base.replace(/\/$/, "")}/auth/v1/.well-known/jwks.json`;
};

export const supabaseJWKS = createRemoteJWKSet(new URL(getJwksUrl()));
