/* eslint-disable @next/next/no-img-element */
'use client';

import Bubble from "../ui/bubble";
import type { Message as MessageType } from "@/schemas/message";
import MessageScroller from "../ui/message-scroller";

type MessageProps = {
  message: MessageType;
}

export function Message(props: MessageProps) {

  const { message } = props;

  if(message.type === "image"){
    return (
      <MessageScroller.Item
        key={message.id}
        messageId={message.id}
        scrollAnchor={message.sender === "myself"}
        className="w-full"
      >
        <Bubble.Root className="w-full max-w-full" align={message.sender === "myself" ? "end" : "start"} variant={message.sender === "myself" ? "default" : "tinted"}>
          <Bubble.Content className="max-w-1/2">
            <img src={message.content} alt="Mensagem de imagem" className="max-w-full h-auto" />
          </Bubble.Content>
        </Bubble.Root>
      </MessageScroller.Item>
    )
  }
  if(message.type === "audio"){
    return (
      <MessageScroller.Item
        key={message.id}
        messageId={message.id}
        scrollAnchor={message.sender === "myself"}
        className="w-full"
      >
        <Bubble.Root className="w-full max-w-full" align={message.sender === "myself" ? "end" : "start"} variant={message.sender === "myself" ? "default" : "tinted"}>
          <Bubble.Content className="max-w-1/2">
            <audio src={message.content} controls />
          </Bubble.Content>
        </Bubble.Root>
      </MessageScroller.Item>
    )
  }
  return (
    <>
      <MessageScroller.Item
        key={message.id}
        messageId={message.id}
        scrollAnchor={message.sender === "myself"}
        className="w-full"
      >
        <Bubble.Root className="w-full max-w-full" align={message.sender === "myself" ? "end" : "start"} variant={message.sender === "myself" ? "default" : "tinted"}>
          <Bubble.Content className="max-w-1/2">
            {message.content}
          </Bubble.Content>
        </Bubble.Root>
      </MessageScroller.Item>
    </>
  )
}