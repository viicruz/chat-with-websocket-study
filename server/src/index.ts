//* Libraries imports
import { Elysia } from "elysia"
import { z } from "zod"
import { cors } from '@elysia/cors'

//* Utils imports
import { mockMessages } from "@/utils/mock-messages"

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .post(
    "/send-message",
    (request) => {
      console.log("Received message:", request.body.message)
      return {
        status: "success",
      }
    },
    {
      body: z.object({
        message: z.string().min(1, "Message cannot be empty"),
      }),
    }
  )
  .get("/messages-history", () => {
    return mockMessages
  });

app.listen(3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type ElysiaServer = typeof app
