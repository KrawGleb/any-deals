import "./OrderChat.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: RootState) => state.auth.user?.profile.sub
  );
  const [message, setMessage] = useState("");
  const handleMessageInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const { data: messages } = useGetMessagesQuery({ id: props.orderId });
  const [sendMessage] = useSendMessageMutation();

  const handleSendClick = () => {
    sendMessage({ orderId: props.orderId, text: message });
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(
        `${
          process.env.REACT_APP_CONTAINERIZED === "false"
            ? "https://localhost:44315"
            : ""
        }/hubs/chat`
      )
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        connection.on("NewMessage", (userId) => {
          if (props.customerId === userId || props.executorId === userId) {
            setMessage(message);
            dispatch(chatApiExtension.util.invalidateTags(["Chat"]));
          }
        });
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="order-chat__root">
      <Box className="order-chat__history">
        {messages &&
          messages.map((message, index) => (
            <p
              key={index}
              className={message.sender.id === userId ? "from-me" : "from-them"}
            >
              {message.text}
            </p>
          ))}
      </Box>
      <Box className="order-chat__input">
        <Input
          label="Write a message"
          onChange={handleMessageInputChange}
          disabled={props.disabled}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSendClick}
          disabled={props.disabled}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
