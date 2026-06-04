import {
  pgTable,
  uuid,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    clerkUserId: text("clerk_user_id")
      .notNull(),

    role: text("role")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    organizationUserUnique: unique().on(
      table.organizationId,
      table.clerkUserId
    ),
  })
);