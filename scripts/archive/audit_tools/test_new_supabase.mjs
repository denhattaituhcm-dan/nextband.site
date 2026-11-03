import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const OLD_URL = "https://gzpdlqxjggyxlkeatvvf.supabase.co";
const NEW_URL = "https://dmamqxiukfiyhfbbcqsq.supabase.co";
const NEW_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtYW1xeGl1a2ZpeWhmYmJjcXNxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDQzNTg3MiwiZXhwIjoyMTA2MDExODcyfQ.LZZXXodeRqrHxuVZ5M0VqVmrP7F4RZW3vtkwr9oNlSQ";

console.log("Testing connection to new Supabase project...");
const supabaseNew = createClient(NEW_URL, NEW_SERVICE_KEY);

async function test() {
  const { data: buckets, error } = await supabaseNew.storage.listBuckets();
  if (error) {
    console.error("Storage error:", error);
  } else {
    console.log("Existing buckets in new project:", buckets.map(b => b.name));
  }
}

test();
