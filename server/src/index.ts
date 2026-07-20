//* Libraries imports
import { Elysia } from "elysia"
import { z } from "zod"
import { cors } from '@elysia/cors'

//* Types imports
import type { Message } from "@/schemas/message"

const messages = new Set<Message>();

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .post(
    "/send-message",
    (request) => {
      console.log("Received message:", request.body.content);
      const message: Message = {
        id: Date.now().toString(),
        name: "Victor",
        sender: "myself",
        content: request.body.content,
        type: request.body.type,
      }

      messages.add(message)
      return {
        status: "success",
        message: request.body.content,
      }
    },
    {
      body: z.object({
        content: z.string().min(1, "Message cannot be empty"),
        type: z.enum(["text", "image", "audio"]),
      }),
    }
  )
  .get("/messages-history", () => {
    return Array.from(messages);
  });

app.listen(3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type ElysiaServer = typeof app
