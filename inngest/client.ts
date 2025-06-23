// inngest/client.ts
import { Inngest } from 'inngest';

// Create a client to send and receive events
export const inngest = new Inngest({
  id: 'nexoria',
  // Explicitly set the base URL for Inngest Cloud
  baseUrl: process.env.INNGEST_BASE_URL || 'https://api.inngest.com/v1',
  // It's also good practice to explicitly pass the eventKey for clarity and robustness
  eventKey: process.env.INNGEST_EVENT_KEY,
});
