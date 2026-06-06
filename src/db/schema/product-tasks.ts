import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

import { products } from "./products";

export const productTasks = pgTable("product_tasks", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  description: text("description").notNull(),

  status: text("status").notNull().default("todo"),

  priority: text("priority").notNull().default("medium"),

  estimatedHours: integer("estimated_hours"),

  version: text("version").notNull().default("1.0"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
