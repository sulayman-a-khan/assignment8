import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const dbUrl = process.env.DATABASE_URL?.replace(/^["']|["']$/g, ''); // Remove potential quotes

if (!dbUrl) {
  console.error("CRITICAL: DATABASE_URL is missing in environment variables.");
}

const sql = neon(dbUrl || "postgresql://user:pass@ep-mock-host.us-east-2.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql, { schema });
