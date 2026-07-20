"use client"

//* Libraries imports
import { useQuery } from "@tanstack/react-query"

export function useGetUser() {
  return useQuery({
    queryKey: ["username"],
    queryFn: async () => {
      const username = localStorage.getItem("username")
      if (!username) {
        return null;
      }
      const userId = localStorage.getItem("userId")
      if (!userId) {
        return null;
      }
      return {
        id: userId,
        username
      }
    }
  });
}
