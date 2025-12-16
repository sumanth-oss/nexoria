import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

export async function createIndexes() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing');
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`
      CREATE INDEX IF NOT EXISTS idx_history_record_id ON "historyTable"("recordId");
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_history_user_email ON "historyTable"("userEmail");
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_history_created_at ON "historyTable"("createdAt");
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON "users"("email");
    `;
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
    throw error;
  }
}

