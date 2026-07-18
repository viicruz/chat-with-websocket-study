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
  const profilePicture = message.profile_picture || "https://i.pravatar.cc/150?img=32";

  if (message.type === "image") {
    return (
      <MessageScroller.Item
        key={message.id}
        messageId={message.id}
        scrollAnchor={message.sender === "myself"}
        className="w-full flex flex-row gap-3"
      >
        {
          message.sender === "other" && (
            <span>
              <img className="size-8 rounded-full" src={profilePicture} alt="Foto do usuário" />
            </span>
          )
        }
        <Bubble.Root className="w-full max-w-full" align={message.sender === "myself" ? "end" : "start"} variant={message.sender === "myself" ? "default" : "tinted"}>

          {
            message.sender === "other" && (
              <span>{props.message.name}</span>
            )
          }

          <Bubble.Content className="max-w-1/2 p-0">
            <img src={message.content} alt="Mensagem de imagem" className="max-w-full h-auto" />
          </Bubble.Content>
        </Bubble.Root>
      </MessageScroller.Item>
    )
  }
  if (message.type === "audio") {
    return (
      <MessageScroller.Item
        key={message.id}
        messageId={message.id}
        scrollAnchor={message.sender === "myself"}
        className="w-full flex flex-row gap-3"
      >
        {
          message.sender === "other" && (
            <span>
              <img className="size-8 rounded-full" src={profilePicture} alt="Foto do usuário" />
            </span>
          )
        }
        <Bubble.Root className="w-full max-w-full" align={message.sender === "myself" ? "end" : "start"} variant={message.sender === "myself" ? "default" : "tinted"}>
          {
            message.sender === "other" && (
              <span>{props.message.name}</span>
            )
          }
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
        className="w-full flex flex-row gap-3"
      >
        {
          message.sender === "other" && (
            <span>
              <img className="size-8 rounded-full" src={profilePicture} alt="Foto do usuário" />
            </span>
          )
        }
        <Bubble.Root className="w-full max-w-full" align={message.sender === "myself" ? "end" : "start"} variant={message.sender === "myself" ? "default" : "tinted"}>
          {
            message.sender === "other" && (
              <span>{props.message.name}</span>
            )
          }
          <Bubble.Content className="max-w-1/2">
            {message.content}
          </Bubble.Content>
        </Bubble.Root>
      </MessageScroller.Item>
    </>
  )
}