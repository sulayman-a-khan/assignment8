import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import * as schema from './schema';

let dbPath = path.join(process.cwd(), 'sqlite.db');

// Vercel Serverless Functions have a read-only filesystem except for /tmp
if (process.env.VERCEL) {
  const tmpPath = '/tmp/sqlite.db';
  if (!fs.existsSync(tmpPath)) {
    try {
      fs.copyFileSync(dbPath, tmpPath);
    } catch (e) {
      console.error("Failed to copy sqlite DB to /tmp", e);
    }
  }
  dbPath = tmpPath;
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
