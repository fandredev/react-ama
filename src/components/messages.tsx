import { useParams } from "react-router-dom";
import { Message } from "./message";
import {
  getRoomMessages,
  GetRoomMessagesResponse,
} from "../http/get-room-messages";

import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function Messages() {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    ws.onmessage = (event) => {
      const data: {
        kind:
          | "message_created"
          | "message_anwsered"
          | "message_reaction_increased"
          | "message_reaction_decreased";
        value: any;
      } = JSON.parse(event.data);

      switch (data.kind) {
        case "message_created":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              return {
                messages: [
                  ...(state?.messages ?? []),
                  {
                    id: data.value.id,
                    text: data.value.text,
                    amountOfReactions: 0,
                    answered: false,
                  },
                ],
              };
            }
          );
          break;

        case "message_anwsered":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              if (!state) {
                return undefined;
              }

              return {
                messages: state.messages.map((message) => {
                  if (message.id === data.value.id) {
                    return {
                      ...message,
                      answered: true,
                    };
                  }

                  return message;
                }),
              };
            }
          );

          break;

        case "message_reaction_decreased":
        case "message_reaction_increased":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              if (!state) {
                return undefined;
              }

              return {
                messages: state.messages.map((message) => {
                  if (message.id === data.value.id) {
                    return {
                      ...message,
                      amountOfReactions: data.value.count,
                    };
                  }

                  return message;
                }),
              };
            }
          );

          break;
      }
    };

    return () => ws.close();
  }, [roomId, queryClient]);

  return (
    <ol className="list-decimal list-outside px-4 space-y-8">
      {data.messages.map((message) => {
        return (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        );
      })}
    </ol>
  );
}
