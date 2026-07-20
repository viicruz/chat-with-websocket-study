//* Libraries imports
import { z } from "zod"

export const baseMessageSchema = z.object({
  content: z.string(),
  type: z.enum(["text", "image", "audio"]),
})

export type BaseMessage = z.infer<typeof baseMessageSchema>

export const messageSchema = baseMessageSchema.extend({
  id: z.string(),
  name: z.string(),
  sender: z.string(),
  profile_picture: z.string().optional(),
})

export type Message = z.infer<typeof messageSchema>
