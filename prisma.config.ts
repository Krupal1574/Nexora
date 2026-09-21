import "dotenv/config";
import { defineConfig } from "@prisma/orm-postgres/config";
import { definePrismaConfig } from "@prisma/cli-engine";

export default definePrismaConfig({
  orm: defineConfig({
    contract: "prisma8/contract.prisma",

    migrations: {
      dir: "prisma/migrations",
    },

    db: {
      connection: process.env.DATABASE_URL!,
    },
  })
});