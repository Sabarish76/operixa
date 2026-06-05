import { pgTable, uuid, text, timestamp, unique } from "drizzle-orm/pg-core";

import { organizations } from "./organizations";

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    name: text("name").notNull(),

    slug: text("slug").notNull(),

    description: text("description"),

    status: text("status").notNull().default("idea"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    organizationSlugUnique: unique().on(table.organizationId, table.slug),
  }),
);
