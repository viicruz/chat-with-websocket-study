'use client';
//* Libraries imports
import React from "react"


//* Components imports
import MessageScroller from "@/components/ui/message-scroller"
import { MessageHistory } from "@/components/message-history";
import { MessageInput } from "@/components/message-input";
import Dialog from "@/components/ui/dialog";

//* Hooks imports
import { useGetUser } from "@/hooks/user/use-get-user";
import { useSetUser } from "@/hooks/user/use-set-user";
import { Button, Input } from "@base-ui/react";

export default function Page() {
  const setUser = useSetUser();
  const user = useGetUser();

  const [open, setOpen] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [profilePicture, setProfilePicture] = React.useState<File | null>(null);

  const handleSetUser = () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername.length === 0) {
      alert("username cannot be empty");
      return;
    }
    setUser.mutate({ username: trimmedUsername, profilePicture }, {
      onError: () => {
        console.error("Failed to set user");
      },
      onSuccess: () => {
        console.log("User set successfully");
        setOpen(false);
      },
    });
  }

  const handleCloseModal = () => {
    return
  }

  React.useEffect(() => {
    if (!user.data && !user.isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
      console.log("User not set, opening dialog", user.data);
    }
  }, [user.data, user.isLoading]);

  return (
    <div className="flex flex-col min-h-svh w-full justify-center items-center">
      <div className="w-full max-w-7xl h-svh">
        <MessageScroller.Provider autoScroll>
          <MessageScroller.Root className="w-full h-[calc(100%-3.3rem)]">
            <MessageScroller.Viewport>
              <MessageHistory />
            </MessageScroller.Viewport>
            <MessageScroller.Button />
          </MessageScroller.Root>
        </MessageScroller.Provider>
        <MessageInput />
      </div>
      <Dialog.Root open={open} onOpenChange={handleCloseModal}>
        <Dialog.Content showCloseButton={false}>
          <Dialog.Header>
            <Dialog.Title>Digite seu nome de usuário</Dialog.Title>
            <Dialog.Description>
              Este nome será usado para identificar você no chat.
            </Dialog.Description>
          </Dialog.Header>
          <div>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu nome de usuário" />
            <Input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)} />
          </div>
          <Dialog.Footer>
            <Button type="button" onClick={handleSetUser}>
              Confirmar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
