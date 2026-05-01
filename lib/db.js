import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const dbUrl = (process.env.NEON_DB_URL || process.env.DATABASE_URL)?.replace(/^["']|["']$/g, ''); 

if (!dbUrl) {
  console.error("CRITICAL ERROR: No database URL found! Please add NEON_DB_URL to Vercel Settings.");
}

const sql = neon(dbUrl || "postgresql://user:pass@ep-mock-host.us-east-2.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql, { schema });
