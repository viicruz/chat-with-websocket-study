//* Libraries imports
import { Elysia } from "elysia"
import { z } from "zod"
import { cors } from "@elysia/cors"
import { staticPlugin } from "@elysia/static"

//* Types imports
import { type Message, messageSchema } from "@/schemas/message"

//* Utils imports
import { presence } from "./presence"

const messages = new Set<Message>()

const app = new Elysia()
  .use(cors())
  .use(staticPlugin())
  .get("/", () => "Hello Elysia")
  .post(
    "/send-message",
    (request) => {
      console.log("Received message:", request.body.content)
      const message: Message = {
        id: Date.now().toString(),
        name: request.body.name,
        sender: request.body.sender,
        content: request.body.content,
        type: request.body.type,
      }

      messages.add(message)

      presence.messageAll(message)

      return {
        status: "success",
        message: request.body.content,
      }
    },
    {
      body: z.object({
        content: z.string().min(1, "Message cannot be empty"),
        type: z.enum(["text", "image", "audio"]),
        name: z.string().min(1, "Name cannot be empty"),
        sender: z.string(),
      }),
    }
  )
  .get("/messages-history", () => {
    return Array.from(messages)
  })
  .ws("/websocket", {
    open(ws) {
      console.log("WebSocket connection opened")
      presence.add(ws.data.query.userId, ws.id, ws)
      console.log("query", ws.data.query)
    },
    close(ws) {
      console.log("WebSocket connection closed")
      presence.remove(ws.data.query.userId, ws.id)
    },
    response: messageSchema,
    body: z.object({
      id: z.string(),
    }),
  })

app.listen(3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type ElysiaServer = typeof app
