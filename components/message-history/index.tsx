"use client";

import { useSubscribeMessages } from "@/hooks/message/use-subscribe-messages";
//* Libraries imports
import { Message } from "../message";
import MessageScroller from "../ui/message-scroller";

//* Hooks imports
import { useMessageHistory } from "@/hooks/message/use-messages-history";
import { useGetUser } from "@/hooks/user/use-get-user";

export function MessageHistory() {
  const messageHistory = useMessageHistory();
  const user = useGetUser();

  if (user.data === null || user.isLoading || user.data?.id === undefined) {
    return null
  }

  return (
    <MessageScroller.Content className="pt-4 pb-20">
      {messageHistory.data?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <SocketHook userId={user?.data?.id} />
    </MessageScroller.Content>
  )
}

function SocketHook({ userId }: { userId: string }) {
  useSubscribeMessages(userId);
  return null;
}