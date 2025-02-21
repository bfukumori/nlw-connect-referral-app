import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { subscribeToEvent } from "../application/use-cases/subscribe-to-event"

export const subscribeToEventController: FastifyPluginAsyncZod = async app => {
  app.post(
    "/subscriptions",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrerId: z.string().uuid().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string().uuid(),
          }),
        },
        tags: ["subscriptions"],
        summary: "Subscribe to an event.",
        description: "Subscribe to an event by providing your name and email.",
      },
    },
    async (request, reply) => {
      const { name, email, referrerId } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId,
      })

      return reply.status(201).send({ subscriberId })
    }
  )
}
