const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function checkDb() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    const result = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log("Tables found:", result.map(r => r.table_name));
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

checkDb();
