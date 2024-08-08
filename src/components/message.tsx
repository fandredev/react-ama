import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  id: messageId,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within a room pages");
  }

  async function createMessageReactionAction() {
    if (!roomId) return;

    try {
      await createMessageReaction({ roomId, messageId });
    } catch {
      toast.error("An error occurred while reacting to the message.");
    }

    setHasReacted(true);
  }

  async function removeMessageReactionAction() {
    if (!roomId) return;

    try {
      await removeMessageReaction({ roomId, messageId });
    } catch {
      toast.error("An error occurred while unreacting to the message.");
    }

    setHasReacted(false);
  }
  return (
    <li
      data-answered={answered}
      className="ml-4 text-zinc-100 leading-relaxed data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          onClick={removeMessageReactionAction}
          type="button"
          className="flex items-center mt-3 gap-2 text-orange-400 text-small font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          onClick={createMessageReactionAction}
          type="button"
          className="flex items-center mt-3 gap-2 text-zinc-400 text-small font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  );
}
