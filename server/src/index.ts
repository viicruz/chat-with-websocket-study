//* Libraries imports
import { Elysia } from "elysia"
import { z } from "zod"
import { cors } from '@elysia/cors'

//* Types imports
import type { Message } from "@/schemas/message"

//* Utils imports
import { presence } from "./presence"

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

      presence.message("Victor", { message: request.body.content, type: request.body.type });
      
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
  })
  .ws("/websocket", {
    open(ws){
      console.log("WebSocket connection opened");
      presence.add("Victor", ws.id, ws);
    },
    close(ws){
      console.log("WebSocket connection closed");
      presence.remove("Victor", ws.id);
    },
    response: z.object({
      message: z.string()
    })
  })

app.listen(3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type ElysiaServer = typeof app
