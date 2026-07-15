'use client';

//* Components imports
import { Button } from "@/components/ui/button"
import MessageScroller from "@/components/ui/message-scroller"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <Button>Click me</Button>
      <MessageScroller.Root>
      </MessageScroller.Root>
    </div>
  )
}
