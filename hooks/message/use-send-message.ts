"use client"

//* Libraries imports
import { useMutation } from "@tanstack/react-query"

//* Utils imports
import { apiClient } from "@/lib/api-client"

//* Hooks imports
import { useGetUser } from "@/hooks/user/use-get-user"

export function useSendMessage() {
  const user = useGetUser();

  return useMutation({
    mutationFn: async (message: string) => {
      const response = await apiClient["send-message"].post({
        content: message,
        type: "text",
        name: user.data?.username || "Unknown",
        sender: user.data?.id || "",
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
