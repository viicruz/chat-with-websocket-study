"use client"

//* Libraries imports
import { useMutation } from "@tanstack/react-query"

//* Utils imports
import { apiClient } from "@/lib/api-client"

export function useSendMessage() {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await apiClient["send-message"].post({
        message,
      })
      return response.data
    },
  })
}
