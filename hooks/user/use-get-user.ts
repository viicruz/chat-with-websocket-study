"use client"

//* Libraries imports
import { useQuery } from "@tanstack/react-query"

export function useGetUser() {
  return useQuery({
    queryKey: ["username"],
    queryFn: async () => {
      const username = localStorage.getItem("username")
      if (!username) {
        throw new Error("Username not found in localStorage")
      }
      const userId = localStorage.getItem("userId")
      if (!userId) {
        throw new Error("User ID not found in localStorage")
      }
      return {
        id: userId,
        username
      }
    }
  });
}
