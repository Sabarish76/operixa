import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { products } from "./products";

export const productRequirements = pgTable("product_requirements", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  content: text("content").notNull(),

  version: text("version").notNull().default("1.0"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
