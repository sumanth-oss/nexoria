import { sql } from 'drizzle-orm';
import { db } from './db';

export async function createIndexes() {
  try {
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_history_record_id ON "historyTable"("recordId");
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_history_user_email ON "historyTable"("userEmail");
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_history_created_at ON "historyTable"("createdAt");
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON "users"("email");
    `);
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}

