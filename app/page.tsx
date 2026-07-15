'use client';

//* Components imports
import MessageScroller from "@/components/ui/message-scroller"
import Bubble from "@/components/ui/bubble"

const messages = [
  {
    id: "1",
    role: "assistant",
    content: "Olá! Como posso ajudar você hoje?",
  },
  {
    id: "2",
    role: "user",
    content: "Quero testar o MessageScroller.",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Perfeito! Vamos adicionar algumas mensagens para simular uma conversa.",
  },
  {
    id: "4",
    role: "user",
    content: "Legal, obrigado!",
  },
  {
    id: "5",
    role: "assistant",
    content: "De nada! 🚀",
  },
  {
    id: "6",
    role: "user",
    content: "Será que o scroll acompanha novas mensagens automaticamente?",
  },
  {
    id: "7",
    role: "assistant",
    content:
      "Sim, esse é um comportamento comum em interfaces de chat. Basta rolar para o final quando uma nova mensagem for adicionada.",
  },
  {
    id: "8",
    role: "user",
    content: "E se o usuário subir para ler mensagens antigas?",
  },
  {
    id: "9",
    role: "assistant",
    content:
      "Nesse caso, normalmente o scroll automático é desabilitado até que o usuário volte para o final da conversa.",
  },
  {
    id: "10",
    role: "user",
    content: "Faz sentido. Vou implementar isso depois.",
  },
  {
    id: "11",
    role: "assistant",
    content: "Boa ideia! Isso melhora bastante a experiência do usuário.",
  },
  {
    id: "12",
    role: "user",
    content: "Também quero testar mensagens bem longas.",
  },
  {
    id: "13",
    role: "assistant",
    content:
      "Uma mensagem longa é útil para verificar quebra de linha, espaçamento, largura máxima do balão e comportamento do scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat, nisi nec vulputate faucibus, turpis libero ultrices mauris, vitae tincidunt augue nisl non nunc. Suspendisse potenti. Donec euismod, augue sed posuere tincidunt, lacus justo feugiat justo, quis pretium nisl elit sed massa.",
  },
  {
    id: "14",
    role: "user",
    content: "Agora vou adicionar várias mensagens seguidas.",
  },
  {
    id: "15",
    role: "assistant",
    content: "Perfeito!",
  },
  {
    id: "16",
    role: "assistant",
    content: "Mensagem de teste #1",
  },
  {
    id: "17",
    role: "assistant",
    content: "Mensagem de teste #2",
  },
  {
    id: "18",
    role: "assistant",
    content: "Mensagem de teste #3",
  },
  {
    id: "19",
    role: "assistant",
    content: "Mensagem de teste #4",
  },
  {
    id: "20",
    role: "assistant",
    content: "Mensagem de teste #5",
  },
  {
    id: "21",
    role: "user",
    content: "Ainda está funcionando direitinho.",
  },
  {
    id: "22",
    role: "assistant",
    content: "Ótimo! Continue adicionando mensagens para testar listas maiores.",
  },
  {
    id: "23",
    role: "user",
    content: "Vou chegar em umas 50 mensagens.",
  },
  {
    id: "24",
    role: "assistant",
    content: "Excelente. Assim você consegue validar performance e virtualização, se existir.",
  },
  {
    id: "25",
    role: "user",
    content: "Obrigado pela ajuda!",
  },
  {
    id: "26",
    role: "assistant",
    content: "Sempre que precisar. Bons testes! 🚀",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh w-full justify-center items-center">
      <div className="w-full max-w-7xl h-svh">
        <MessageScroller.Provider autoScroll>
          <MessageScroller.Root className="w-full">
            <MessageScroller.Viewport>
              <MessageScroller.Content className="pt-4 pb-20">
                {messages.map((message) => (
                  <MessageScroller.Item
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={message.role === "user"}
                    className="w-full"
                  >
                    <Bubble.Root className="w-full max-w-full" align={message.role === "user" ? "end" : "start"} variant={message.role === "user" ? "default" : "tinted"}>
                      <Bubble.Content className="max-w-1/2">
                        {message.content}
                      </Bubble.Content>
                    </Bubble.Root>
                  </MessageScroller.Item>
                ))}
              </MessageScroller.Content>
            </MessageScroller.Viewport>
            <MessageScroller.Button />
          </MessageScroller.Root>
        </MessageScroller.Provider>
      </div>

    </div>
  )
}
