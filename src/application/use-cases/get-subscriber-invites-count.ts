import { redis } from "@/src/infrastructure/db/redis/client"

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore("referral:ranking", subscriberId)

  return count ? Number(count) : 0
}
