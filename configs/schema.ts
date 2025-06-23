import { metadata } from '@/app/layout';
import { integer, pgTable, varchar, json } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
});

export const HistoryTable = pgTable('historyTable', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  recordId: varchar('recordId', { length: 255 }).notNull(),
  content: json('content').notNull(),
  userEmail: varchar('userEmail', { length: 255 }).references(
    () => usersTable.email
  ),
  createdAt: varchar('createdAt', { length: 255 }).default('now()'),
  aiAgentType: varchar(),
  metaData: varchar(),
});
