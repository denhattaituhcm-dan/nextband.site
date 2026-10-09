import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const indexes = await prisma.$queryRawUnsafe(`
    SELECT indexname, indexdef 
    FROM pg_indexes 
    WHERE tablename = 'arena_rooms';
  `);
  console.log('ARENA_ROOMS INDEXES:', JSON.stringify(indexes, null, 2));

  const funcs = await prisma.$queryRawUnsafe(`
    SELECT routine_name, routine_type, specific_name
    FROM information_schema.routines
    WHERE routine_schema = 'public' AND routine_name = 'admin_create_user';
  `);
  console.log('ADMIN_CREATE_USER FUNCTIONS:', JSON.stringify(funcs, null, 2));

  const params = await prisma.$queryRawUnsafe(`
    SELECT specific_name, parameter_name, data_type, ordinal_position, parameter_default
    FROM information_schema.parameters
    WHERE specific_schema = 'public' AND specific_name LIKE '%admin_create_user%'
    ORDER BY specific_name, ordinal_position;
  `);
  console.log('ADMIN_CREATE_USER PARAMETERS:', JSON.stringify(params, null, 2));

  await prisma.$disconnect();
}

run().catch(console.error);
