import { env } from "@/src/infrastructure/_env"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { subscriptions } from "./schemas/subscriptions"

const pg = postgres(env.POSTGRES_URL)
const db = drizzle(pg, {
  schema: {
    subscriptions,
  },
})

export { db }
