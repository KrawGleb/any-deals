import "./OrderChat.scss";
import React, { useEffect, useRef } from "react";
import { OrderChatProps } from "./OrderChatProps";
import { Box, Button } from "@mui/material";
import Input from "../../common/input/Input";
import SendIcon from "@mui/icons-material/Send";
import { HubConnectionBuilder } from "@microsoft/signalr";
import {
  chatApiExtension,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../../features/api/extensions/chatApiExtension";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store/store";

export default function OrderChat(props: OrderChatProps) {
  const lastMessageRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: RootState) => state.auth.user?.profile.sub
  );

  const { data: messages } = useGetMessagesQuery({ id: props.orderId });
  const [sendMessage] = useSendMessageMutation();

  const handleSendClick = () => {
    const text = (inputRef.current! as HTMLInputElement).value;
    if (!text) return;

    sendMessage({
      orderId: props.orderId,
      text,
    });

    (inputRef.current! as HTMLInputElement).value = "";
  };

  useEffect(() => {
    const init = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(
          `${
            process.env.REACT_APP_CONTAINERIZED === "false"
              ? "https://localhost:5001"
              : ""
          }/hubs/chat`
        )
        .withAutomaticReconnect()
        .build();

      try {
        await connection.start();

        connection.on("NewMessage", (userId) => {
          if (props.customerId === userId || props.executorId === userId) {
            dispatch(chatApiExtension.util.invalidateTags(["Chat"]));
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lastMessageRef?.current) return;

    (lastMessageRef?.current! as Element).scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, lastMessageRef]);

  return (
    <Box className="order-chat__root">
      <Box className="order-chat__history">
        {messages &&
          messages.map((message, index) => (
            <p
              key={index}
              className={message.sender.id === userId ? "from-me" : "from-them"}
              ref={index === messages.length - 1 ? lastMessageRef : undefined}
            >
              {message.text}
            </p>
          ))}
      </Box>
      <form className="order-chat__input" onSubmit={(e) => e.preventDefault()}>
        <Input
          ref={inputRef}
          label="Write a message"
          disabled={props.disabled}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSendClick}
          disabled={props.disabled}
        >
          Send
        </Button>
      </form>
    </Box>
  );
}
