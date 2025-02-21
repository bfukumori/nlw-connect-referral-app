import { fastifyCors } from "@fastify/cors"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import fastify from "fastify"
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { accessInviteLinkController } from "./controllers/access-invite-link.controller.js"
import { getRankingController } from "./controllers/get-ranking.controller.js"
import { getSubscriberInviteClicksController } from "./controllers/get-subscriber-invite-clicks.controller.js"
import { getSubscriberInvitesCountController } from "./controllers/get-subscriber-invites-count.controller.js"
import { getSubscriberRankingPositionController } from "./controllers/get-subscriber-ranking-position.controller.js"
import { subscribeToEventController } from "./controllers/subscribe-to-event.controller.js"
import { env } from "./infrastructure/_env/index.js"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "NLW Connect API",
      version: "1.0.0",
      description:
        "API do NLW Connect para se inscrever e indicar amigos para um evento.",
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

app.register(subscribeToEventController)
app.register(accessInviteLinkController)
app.register(getSubscriberInviteClicksController)
app.register(getSubscriberInvitesCountController)
app.register(getSubscriberRankingPositionController)
app.register(getRankingController)

app.listen({ port: env.PORT }, () => {
  console.log(`Http server is running on port ${env.PORT}`)
})
