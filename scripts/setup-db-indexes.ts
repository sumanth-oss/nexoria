import 'dotenv/config';
import { createIndexes } from '../configs/db-indexes';

async function run() {
  await createIndexes();
  console.log('Database setup complete');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
