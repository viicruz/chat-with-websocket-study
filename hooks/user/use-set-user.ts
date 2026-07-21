"use client"

//* Libraries imports
import { useMutation } from "@tanstack/react-query"

//* Utils imports
import { queryClient } from "@/lib/query-client"
import { apiClient } from "@/lib/api-client"

export function useSetUser() {
  return useMutation({
    mutationFn: async (props: {
      username: string
      profilePicture: File | null
    }) => {
      localStorage.setItem("username", props.username)
      const id = crypto.randomUUID()
      localStorage.setItem("userId", id)

      const response = await apiClient["create-user"].post({
        username: props.username,
        profile_picture: props.profilePicture,
      })

      if (response.data?.profile_picture){
        localStorage.setItem("profilePicture", response.data.profile_picture)
      }

      return {
        id,
        username: props.username,
        profile_picture: response.data?.profile_picture || null,
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["username"] })
    },
  })
}
