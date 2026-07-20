"use client"

//* Libraries imports
import { useMutation } from "@tanstack/react-query"

//* Utils imports
import { apiClient } from "@/lib/api-client"

export function useSendMessage() {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await apiClient["send-message"].post({
        content: message,
        type: "text"
      })
      return response.data
    },
    // onSuccess: (props) => {
    //   queryClient.setQueryData(["messages-history"], (oldData: MessageType[] | undefined) => {
    //     if (!oldData) {
    //       return [];
    //     }
    //     return [...oldData, { id: Date.now().toString(), sender: "myself", content: props?.message, type: "text", name: "Victor" }];
    //   });
    // }
  })
}
