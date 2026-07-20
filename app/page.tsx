'use client';
//* Libraries imports
import React from "react"


//* Components imports
import MessageScroller from "@/components/ui/message-scroller"
import { ArrowUpIcon, ImageIcon, MicIcon } from "lucide-react";
import { Message } from "@/components/message";

import InputGroup from "@/components/ui/input-group";

//* Hooks imports
import { useSendMessage } from "@/hooks/message/use-send-message";
import { useMessageHistory } from "@/hooks/message/use-messages-history";

//*Utils imports
import { apiClient } from "@/lib/api-client"


export default function Page() {
  const [message, setMessage] = React.useState<string>("");
  const sendMessage = useSendMessage();
  const messageHistory = useMessageHistory();


  React.useEffect(() => {
    const ws = apiClient.websocket.subscribe();
    ws.on("open", () => { 
      console.log("WebSocket connection opened");
    })
    ws.on("message", (message) => {
      console.log("Received WebSocket message", message);
    })
  }, [])

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
    <div className="flex flex-col min-h-svh w-full justify-center items-center">
      <div className="w-full max-w-7xl h-svh">
        <MessageScroller.Provider autoScroll>
          <MessageScroller.Root className="w-full h-[calc(100%-3.3rem)]">
            <MessageScroller.Viewport>
              <MessageScroller.Content className="pt-4 pb-20">
                {messageHistory.data?.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </MessageScroller.Content>
            </MessageScroller.Viewport>
            <MessageScroller.Button />
          </MessageScroller.Root>
        </MessageScroller.Provider>

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
      </div>

    </div>
  )
}
