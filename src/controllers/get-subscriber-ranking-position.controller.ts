import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { getSubscriberRankingPosition } from "../application/use-cases/get-subscriber-ranking-position"

export const getSubscriberRankingPositionController: FastifyPluginAsyncZod =
  async app => {
    app.get(
      "/subscribers/:subscriberId/ranking/position",
      {
        schema: {
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          tags: ["referral"],
          summary: "Subscriber ranking position.",
          description: "Get the ranking position of a subscriber.",
          response: {
            200: z.object({
              position: z.number().int().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const position = await getSubscriberRankingPosition({ subscriberId })

        return { position }
      }
    )
  }
