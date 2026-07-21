//* Libraries imports
import { Elysia } from "elysia"
import { z } from "zod"
import { cors } from "@elysia/cors"
import { staticPlugin } from "@elysia/static"
import fs from "node:fs"
import path from "node:path"

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
        profile_picture: request.body.profile_picture || "/public/default_user.png",
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
        profile_picture: z.string().nullable(),
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
  .post(
    "/create-user",
    async (request) => {
      console.log("Creating user:", request.body)

      let imagePath: string | null = null
      if (request.body.profile_picture) {
        const imageExtension = request.body.profile_picture?.name
          .split(".")
          .pop()
        imagePath = `${crypto.randomUUID()}.${imageExtension}`
        const publicDir = path.join(process.cwd(), "public")

        await fs.promises.mkdir(publicDir, { recursive: true })

        const destination = path.join(publicDir, imagePath)

        await Bun.write(destination, request.body.profile_picture)
      }
      return {
        status: "success",
        username: request.body.username,
        profile_picture: imagePath,
      }
    },
    {
      body: z.object({
        username: z.string().min(1, "Username cannot be empty"),
        profile_picture: z.file().nullable(),
      }),
    }
  )

app.listen(3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type ElysiaServer = typeof app
