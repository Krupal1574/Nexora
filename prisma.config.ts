import "dotenv/config";
import { defineConfig } from "@prisma/orm-postgres/config";

export default defineConfig({
  contract: "prisma/schema.prisma",

  migrations: {
    dir: "prisma/migrations",
  },

  db: {
    connection: process.env.DATABASE_URL!,
  },
});