import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { products } from "./products";

export const productTestCases = pgTable("product_test_cases", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  description: text("description").notNull(),

  expectedResult: text("expected_result").notNull(),

  priority: text("priority").notNull().default("medium"),

  status: text("status").notNull().default("pending"),

  version: text("version").notNull().default("1.0"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
