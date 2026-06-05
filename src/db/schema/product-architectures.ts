import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { products } from "./products";

export const productArchitectures = pgTable("product_architectures", {
  id: uuid("id").defaultRandom().primaryKey(),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  systemDesign: text("system_design").notNull(),

  databaseDesign: text("database_design").notNull(),

  apiDesign: text("api_design").notNull(),

  folderStructure: text("folder_structure").notNull(),

  version: text("version").notNull().default("1.0"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
