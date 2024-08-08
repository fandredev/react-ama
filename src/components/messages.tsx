import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";

import { useSuspenseQuery } from "@tanstack/react-query";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within a room pages");
  }

  // const { messages } = use(
  //   getRoomMessages({
  //     roomId,
  //   })
  // );

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  return (
    <ol className="list-decimal list-outside px-4 space-y-8">
      {data.messages.map((message) => {
        return (
          <Message
            key={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        );
      })}
    </ol>
  );
}
