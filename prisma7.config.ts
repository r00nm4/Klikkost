import { loadEnvConfig } from "@next/env";
import { defineConfig, env } from "@prisma/prisma7/config";

loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DIRECT_URL || env("DATABASE_URL"),
  },
});
