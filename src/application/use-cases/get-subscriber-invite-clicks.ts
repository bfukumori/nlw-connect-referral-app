import { redis } from "@/src/infrastructure/db/redis/client"

interface GetSubscriberInviteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget("referral:access-count", subscriberId)

  return count ? Number(count) : 0
}
