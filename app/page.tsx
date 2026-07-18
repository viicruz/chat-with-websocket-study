'use client';
//* Libraries imports
import React from "react"


//* Components imports
import MessageScroller from "@/components/ui/message-scroller"
import { ArrowUpIcon, ImageIcon, MicIcon } from "lucide-react";
import { Message } from "@/components/message";

import InputGroup from "@/components/ui/input-group";
import type { Message as MessageType } from "@/schemas/message";

//* Hooks imports
import { useSendMessage } from "@/hooks/message/use-send-message";


const messages: MessageType[] = [
  {
    id: "1",
    sender: "other",
    name: "Ana",
    profile_picture: "https://i.pravatar.cc/150?img=32",
    type: "text",
    content: "Oi! Você conseguiu terminar aquele projeto?",
  },
  {
    id: "2",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Quase. Falta só revisar alguns detalhes.",
  },
  {
    id: "3",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Boa! Achei que você já tinha entregue.",
  },
  {
    id: "4",
    sender: "myself",
    name: "Você",
    profile_picture: "https://i.pravatar.cc/150?img=12",
    type: "text",
    content: "Vou enviar ainda hoje, se tudo der certo.",
  },
  {
    id: "5",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Perfeito! Depois me mostra como ficou.",
  },
  {
    id: "6",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Pode deixar! 😄",
  },
  {
    id: "7",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Aliás, você vai participar da reunião amanhã?",
  },
  {
    id: "8",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Sim, às 9h, né?",
  },
  {
    id: "9",
    sender: "other",
    name: "Ana",
    profile_picture: "https://i.pravatar.cc/150?img=32",
    type: "text",
    content: "Isso mesmo. O pessoal vai apresentar as novidades do sistema.",
  },
  {
    id: "10",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Legal, estou curioso para ver.",
  },
  {
    id: "11",
    sender: "other",
    name: "Ana",
    type: "image",
    content: "https://picsum.photos/600/400?random=1",
  },
  {
    id: "12",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Olha o layout novo que o designer enviou.",
  },
  {
    id: "13",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Ficou muito bonito! Gostei bastante das cores.",
  },
  {
    id: "14",
    sender: "other",
    name: "Ana",
    profile_picture: "https://i.pravatar.cc/150?img=32",
    type: "audio",
    content: "audio-message-01.mp3",
  },
  {
    id: "15",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Depois escuto o áudio. Estou em uma reunião agora.",
  },
  {
    id: "16",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Sem problemas!",
  },
  {
    id: "17",
    sender: "myself",
    name: "Você",
    profile_picture: "https://i.pravatar.cc/150?img=12",
    type: "text",
    content: "Agora consegui ouvir. Faz sentido o que você comentou.",
  },
  {
    id: "18",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Ótimo! Então seguimos com essa ideia.",
  },
  {
    id: "19",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Fechado. Vou abrir uma PR daqui a pouco.",
  },
  {
    id: "20",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Quando abrir, me marca para revisar.",
  },
  {
    id: "21",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Combinado 👍",
  },
  {
    id: "22",
    sender: "other",
    name: "Ana",
    profile_picture: "https://i.pravatar.cc/150?img=32",
    type: "image",
    content: "https://picsum.photos/500/700?random=2",
  },
  {
    id: "23",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Também tirei essa foto hoje cedo.",
  },
  {
    id: "24",
    sender: "myself",
    name: "Você",
    type: "text",
    content: "Nossa, ficou muito boa! Parece papel de parede.",
  },
  {
    id: "25",
    sender: "other",
    name: "Ana",
    type: "text",
    content: "Hahaha, valeu!",
  },
  {
    id: "26",
    sender: "myself",
    name: "Você",
    profile_picture: "https://i.pravatar.cc/150?img=12",
    type: "text",
    content: "Bom, vou voltar ao trabalho. Até mais!",
  },
];

export default function Page() {
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
    <div className="flex flex-col min-h-svh w-full justify-center items-center">
      <div className="w-full max-w-7xl h-svh">
        <MessageScroller.Provider autoScroll>
          <MessageScroller.Root className="w-full h-[calc(100%-3.3rem)]">
            <MessageScroller.Viewport>
              <MessageScroller.Content className="pt-4 pb-20">
                {messages.map((message) => (
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
