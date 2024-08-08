import { useEffect } from "react";
import { GetRoomMessagesResponse } from "../http/get-room-messages";
import { useQueryClient } from "@tanstack/react-query";

interface UseMessageWebsocketsParams {
  roomId: string;
}

type WebhookMessage =
  | {
      kind: "message_created";
      value: {
        id: string;
        text: string;
      };
    }
  | {
      kind: "message_anwsered";
      value: {
        id: string;
      };
    }
  | {
      kind: "message_reaction_increased" | "message_reaction_decreased";
      value: {
        id: string;
        count: number;
      };
    };

export function useMessagesWebSockets({ roomId }: UseMessageWebsocketsParams) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    ws.onmessage = (event) => {
      const data: WebhookMessage = JSON.parse(event.data);

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
}
