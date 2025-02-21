import { redis } from "@/src/infrastructure/db/redis/client"

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const position = await redis.zrevrank("referral:ranking", subscriberId)

  if (position === null) {
    return null
  }

  return position + 1
}
