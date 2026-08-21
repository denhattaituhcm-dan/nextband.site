import { PrismaClient } from "../ielts-api/node_modules/@prisma/client/default.js";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:anhxtanhmat1@db.gzpdlqxjggyxlkeatvvf.supabase.co:6543/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20",
    },
  },
});

async function main() {
  try {
    console.log("Connecting to PostgreSQL at Supabase...");
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'ENROLLED', 'CANCELLED', 'ARCHIVED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS public.contact_leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        goal TEXT,
        source TEXT DEFAULT 'contact_page',
        status TEXT DEFAULT 'NEW',
        assigned_to TEXT,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await prisma.$executeRawUnsafe(`ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;`);

    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        DROP POLICY IF EXISTS "Allow anon insert on contact_leads" ON public.contact_leads;
        CREATE POLICY "Allow anon insert on contact_leads" ON public.contact_leads FOR INSERT TO anon, authenticated WITH CHECK (true);
      EXCEPTION
        WHEN undefined_table THEN null;
      END $$;
    `);

    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        DROP POLICY IF EXISTS "Allow authenticated select on contact_leads" ON public.contact_leads;
        CREATE POLICY "Allow authenticated select on contact_leads" ON public.contact_leads FOR SELECT TO anon, authenticated USING (true);
      EXCEPTION
        WHEN undefined_table THEN null;
      END $$;
    `);

    await prisma.$executeRawUnsafe(`NOTIFY pgrst, 'reload schema';`);

    console.log("✅ Successfully created/verified contact_leads table and reloaded schema cache!");
  } catch (err) {
    console.error("❌ SQL Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();