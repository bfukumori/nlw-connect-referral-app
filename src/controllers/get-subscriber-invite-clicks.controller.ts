import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { getSubscriberInviteClicks } from "../application/use-cases/get-subscriber-invite-clicks"

export const getSubscriberInviteClicksController: FastifyPluginAsyncZod =
  async app => {
    app.get(
      "/subscribers/:subscriberId/ranking/clicks",
      {
        schema: {
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          tags: ["referral"],
          summary: "Subscriber invite clicks.",
          description:
            "Get the number of clicks on a subscriber's invite link.",
          response: {
            200: z.object({
              count: z.number().int(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const count = await getSubscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
