import type { Config } from "drizzle-kit"
import { env } from "./src/infrastructure/_env"

export default {
  schema: "./src/libs/drizzle/schemas/*.ts",
  out: "./src/libs/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config
