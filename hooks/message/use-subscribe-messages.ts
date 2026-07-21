"use client"

//* Libraries imports
import React from "react"

//* Types imports
import type { Message } from "@/schemas/message"

//* Utils imports
import { apiClient } from "@/lib/api-client"
import { queryClient } from "@/lib/query-client"

export function useSubscribeMessages(userId: string) {
  React.useEffect(() => {
    const ws = apiClient.websocket.subscribe({
      query:{
        userId
      }
    })

    ws.on("open", () => {
      console.log("WebSocket connection opened")
    })

    ws.on("message", (message) => {
      console.log("Received WebSocket message", message)
      queryClient.setQueryData(
        ["messages-history"],
        (oldData: Message[] | undefined) => {
          if (!oldData) {
            return []
          }
          return [
            ...oldData,
            {
              id: message.data.id,
              sender: message.data.sender,
              content: message.data.content,
              type: message.data.type,
              name: message.data.name,
              profile_picture: message.data.profile_picture || "/public/default_user.png",
            },
          ]
        }
      )
    })

    return () => {
      ws.close()
      console.log("WebSocket connection closed")
    }
  }, [])
}
