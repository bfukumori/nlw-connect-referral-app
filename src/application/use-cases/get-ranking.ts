import { db } from "@/src/infrastructure/db/drizzle/client"
import { subscriptions } from "@/src/infrastructure/db/drizzle/schemas/subscriptions"
import { redis } from "@/src/infrastructure/db/redis/client"
import { inArray } from "drizzle-orm"

export async function getRanking() {
  const ranking = await redis.zrevrange("referral:ranking", 0, 2, "WITHSCORES")
  const subscriberIdAndScore: Record<string, number> = {}
  const subscribersIds: string[] = []

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberIdAndScore[ranking[i]] = Number(ranking[i + 1])
    subscribersIds.push(ranking[i])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, subscribersIds))

  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id],
      }
    })
    .sort((a, b) => b.score - a.score)

  return rankingWithScore
}
