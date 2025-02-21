import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { accessInviteLink } from "../application/use-cases/access-invite-link"
import { env } from "../infrastructure/_env"

export const accessInviteLinkController: FastifyPluginAsyncZod = async app => {
  app.get(
    "/invites/:subscriberId",
    {
      schema: {
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
        tags: ["referral"],
        summary: "Access an invite link and redirect to the event page.",
        description: "Access an invite link by providing a subscriber ID.",
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)
      redirectUrl.searchParams.set("referrer", subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
