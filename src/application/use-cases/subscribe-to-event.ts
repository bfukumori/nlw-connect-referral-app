import { db } from "@/src/infrastructure/db/drizzle/client"
import { subscriptions } from "@/src/infrastructure/db/drizzle/schemas/subscriptions"
import { redis } from "@/src/infrastructure/db/redis/client"
import { eq } from "drizzle-orm"

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning({ subscriberId: subscriptions.id })

  if (referrerId) {
    await redis.zincrby("referral:ranking", 1, referrerId)
  }

  return {
    subscriberId: result[0].subscriberId,
  }
}
