"use client"

//* Libraries imports
import { useMutation } from "@tanstack/react-query"

//* Utils imports
import { queryClient } from "@/lib/query-client"

export function useSetUser() {
  return useMutation({
    mutationFn: async (username: string) => {
      localStorage.setItem("username", username)
      const id = crypto.randomUUID()
      localStorage.setItem("userId", id)
      return {
        id,
        username
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["username"] })
    }
  })
}
