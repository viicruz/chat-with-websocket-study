export type BaseMessage = {
  content: string
  type: "text" | "image" | "audio"
}

export interface Message extends BaseMessage {
  id: string
  name: string
  sender: "myself" | "other"
  profile_picture?: string
}
