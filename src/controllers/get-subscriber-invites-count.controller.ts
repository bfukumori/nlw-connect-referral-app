import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { getSubscriberInvitesCount } from "../application/use-cases/get-subscriber-invites-count"

export const getSubscriberInvitesCountController: FastifyPluginAsyncZod =
  async app => {
    app.get(
      "/subscribers/:subscriberId/ranking/count",
      {
        schema: {
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          tags: ["referral"],
          summary: "Subscriber invites count.",
          description: "Get the number of invites a subscriber has.",
          response: {
            200: z.object({
              count: z.number().int(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const count = await getSubscriberInvitesCount({ subscriberId })

        return { count }
      }
    )
  }
