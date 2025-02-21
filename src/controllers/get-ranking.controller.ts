import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { getRanking } from "../application/use-cases/get-ranking"

export const getRankingController: FastifyPluginAsyncZod = async app => {
  app.get(
    "/subscribers/ranking",
    {
      schema: {
        tags: ["referral"],
        summary: "Subscribers ranking.",
        description: "Get the ranking of the top 3 subscribers.",
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                score: z.number().int(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const ranking = await getRanking()

      return { ranking }
    }
  )
}
