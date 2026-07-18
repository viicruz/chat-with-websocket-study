"use client"

//* Libraries imports
import { useMutation } from "@tanstack/react-query"

//* Utils imports
import { apiClient } from "@/lib/api-client"
import { queryClient } from "@/lib/query-client";

//* Types imports
import type { Message as MessageType } from "@/schemas/message";

export function useSendMessage() {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await apiClient["send-message"].post({
        message,
      })
      return response.data
    },
    onSuccess: (props) => {
      queryClient.setQueryData(["messages-history"], (oldData: MessageType[] | undefined) => {
        if (!oldData) {
          return [];
        }
        return [...oldData, { id: Date.now().toString(), sender: "myself", content: props?.message, type: "text", name: "Victor" }];
      });
    }
  })
}
