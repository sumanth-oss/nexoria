// inngest/client.ts
import { Inngest } from 'inngest';

// Create a client to send and receive events
export const inngest = new Inngest({
  id: 'nexoria',
  // eventKey: process.env.INNGEST_EVENT_KEY,
  // baseUrl: process.env.INNGEST_BASE_URL || 'https://api.inngest.com/v1',
});
