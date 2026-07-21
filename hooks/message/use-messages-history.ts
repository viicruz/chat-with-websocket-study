"use client"

//* Libraries imports
import { useQuery } from "@tanstack/react-query"

//* Utils imports
import { apiClient } from "@/lib/api-client"

export function useMessageHistory() {
  return  useQuery({
    queryKey: ["messages-history"],
    queryFn: async () => {
      const response = await apiClient["messages-history"].get()
      return response.data
    },
  });
  
}
