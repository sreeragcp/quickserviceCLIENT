import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBoxUser";
import InputTextUser from "./InputTextUser";
import { useSelector } from "react-redux";

const ChatContainerUser = ({
  bookingId,
  userId,
  partnerId,
  closeChatModal,
}) => {
  const userData = useSelector((state) => state?.tocken?.userData);

  let socketio = socketIOClient("https://quickservice.website");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("userData.name"));

  const [messageList, setMessageList] = useState([]);

  const currentUserId = userData._id;

  const [messageTriger, setMessageTriger] = useState(new Date());

  useEffect(() => {
    socketio.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
  }, []);

  useEffect(() => {
    socketio.emit("listMessages", { bookingId });

    socketio.on("messageList", (receivedMessages) => {
      // Update the state with the received messages
      setMessageList(receivedMessages?.messages);
    });
    return () => {
      // Disconnect the socket when the component unmounts
      socketio.disconnect();
    };
  }, [messageTriger, bookingId]);

  console.log(messageList, "-----------receivedMessages");

  const [message, setMessage] = useState("");

  async function sendMessageToServer() {
    try {
      socketio.emit("addMessage", {
        bookingId,
        userId,
        partnerId,
        message,
        currentUserId,
      });

      // Listen for the "messageList" event from the server
      socketio.on("messageAdded", () => {
        // Update the state with the received messages
        setMessageTriger(new Date());
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full messagebox overflow-scroll h-[93%]">
        {messageList.map((chat, index) => {
          if (chat.sender === currentUserId) {
            return (
              <ChatBoxSender
                message={chat.text}
                user={"Me"}
                timestamp={chat.timestamp}
              />
            );
          } else {
            return (
              <ChatBoxReciever
                key={index}
                message={chat.text}
                user={chat.userName}
                timestamp={chat.timestamp}
              />
            );
          }
        })}
      </div>
      <div className="absolute  w-[95%] mx-auto bottom-0">
        <InputTextUser
          addMessage={sendMessageToServer}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </>
  );
};

export default ChatContainerUser;
