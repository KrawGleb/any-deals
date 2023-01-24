import "./OrderChat.scss";
import React from "react";
import { OrderChatProps } from "./OrderChatProps";
import { Box, Button } from "@mui/material";
import Input from "../../common/Input";
import SendIcon from "@mui/icons-material/Send";

const lorem =
  "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export default function OrderChat(props: OrderChatProps) {
  // array with 10 zeros
  const messages = Array(10).fill(lorem);

  return (
    <Box className="order-chat__root">
      <Box className="order-chat__history">
        {messages.map((message, index) => (
          <Box
            key={index}
            className={
              "order-chat__history__message order-chat-message " +
              (index % 2 === 0
                ? "order-chat-message__left"
                : "order-chat-message__right")
            }
          >
            <Box className="order-chat-message__content">{message}</Box>
          </Box>
        ))}
      </Box>
      <Box className="order-chat__input">
        <Input label="Write a message" />
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
