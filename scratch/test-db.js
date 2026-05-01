import { db } from '../lib/db.js';
import { user } from '../lib/schema.js';

async function test() {
  try {
    const res = await db.insert(user).values({
      id: "test-user",
      name: "Test",
      email: "test@example.com",
      emailVerified: true
    }).returning();
    console.log("Insert success:", res);
    
    // delete
    await db.delete(user);
    console.log("Cleanup success");
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
