import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface MessageProps {
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);

  function handleReactToMessage() {
    setHasReacted((prev) => !prev);
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 text-zinc-100 leading-relaxed data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          type="button"
          className="flex items-center mt-3 gap-2 text-orange-400 text-small font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          onClick={handleReactToMessage}
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
