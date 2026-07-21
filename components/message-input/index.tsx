"use client";

//*Libraries imports
import { ArrowUpIcon, ImageIcon, MicIcon } from "lucide-react";
import React from "react"

//* Components imports
import InputGroup from "@/components/ui/input-group";

//* Hooks imports
import { useSendMessage } from "@/hooks/message/use-send-message";

export function MessageInput() {
  const [message, setMessage] = React.useState<string>("");
  const sendMessage = useSendMessage();
  const handleSendMessage = () => {
    sendMessage.mutate(message, {
      onError: () => {
        console.error("Failed to send message");
      },
      onSuccess: () => {
        console.log("Message sent successfully");
        setMessage("");
      },
    });
  }
  return (
    <InputGroup.Root>
      <InputGroup.Addon align="block-end" className="pt-2">
        <div className="flex w-full justify-between">
          <div className="flex flex-row gap-4 items-center">
            <InputGroup.Button
              type="button"
              variant="default"
              size="icon-sm"
              // disabled={disabled}
              className="ml-auto"
            >
              <ImageIcon />
              <span className="sr-only">Foto</span>
            </InputGroup.Button>
            <div className=" flex items center">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}>
                <InputGroup.Input placeholder="Digite uma mensagem..." value={message} onChange={(e) => setMessage(e.target.value)} />
              </form>
            </div>
          </div>
          <div className="flex gap-2">
            <InputGroup.Button
              type="button"
              variant="default"
              size="icon-sm"
              // disabled={disabled}
              className="ml-auto"
            >
              <MicIcon />
              <span className="sr-only">Audio</span>
            </InputGroup.Button>
            <InputGroup.Button
              type="button"
              variant="default"
              size="icon-sm"
              // disabled={disabled}
              className="ml-auto"
              onClick={handleSendMessage}
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroup.Button>
          </div>
        </div>
      </InputGroup.Addon>
    </InputGroup.Root>
  )
}