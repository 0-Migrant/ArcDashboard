import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});
const DATA_PATH = path.join(process.cwd(), 'data.json');

async function main() {
  console.log('🚀 Starting migration of data.json to Supabase...');

  if (!fs.existsSync(DATA_PATH)) {
    console.log('❌ data.json not found. Nothing to migrate.');
    return;
  }

  try {
    const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
    const jsonData = JSON.parse(rawData);

    await prisma.vault.upsert({
      where: { id: 1 },
      update: { data: jsonData },
      create: { id: 1, data: jsonData },
    });

    console.log('✅ Success! Your local data has been uploaded to Supabase.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
