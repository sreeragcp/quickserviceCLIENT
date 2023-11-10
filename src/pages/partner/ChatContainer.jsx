import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBoxPartnerSide";
import InputText from "./InputText";
// import { useParams } from "react-router-dom";


const styles = {
     
}

const ChatContainer = ({ bookingId, userId, partnerId, closeChatModal }) => {

  let socketio = socketIOClient("http://localhost:4002");
  // let socketio = socketIOClient("https://www.car-rentals.shop");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("partnerData.name"));
  // const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  //   const { bookingId, userId, partnerId } = useParams();

  const [messageList, setMessageList] = useState([]);
  const currentUserId = JSON.parse(localStorage.getItem("partnerId"));

  console.log(currentUserId, "this si th e userdo");

  const [messageTriger, setMessageTriger] = useState(new Date());

  useEffect(() => {
    socketio.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });



    socketio.emit("listMessages", {bookingId});

    socketio.on("messageList", (receivedMessages) => {
      // Update the state with the received messages
      setMessageList(receivedMessages?.messages);
    });
    return () => {
      // Disconnect the socket when the component unmounts
      socketio.disconnect();
    };
  }, [messageTriger,bookingId]);

  console.log(messageList, "-----------receivedMessages");



  const [message, setMessage] = useState("");

  async function sendMessageToServer() {;

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

  console.log(messageList,"this is the ess");

  return (

    <>
      
      <div className=  "chats w-full h-[85%] overflow-y-scroll">
        
        {messageList.map((chat, index) => {

          if (chat.sender === currentUserId) {
            return (
              <ChatBoxSender
                // key={index}
                message={chat.text}
                // avatar={chat.avatar}
                user={chat.userName}
              />
            );
          } else {
            return (
              <ChatBoxReciever
                key={index}
                message={chat.text}
                // avatar={chat.avatar}
                user={chat.userName}
              />
            );
          }
       
        })
        } 
      </div>
      <div className="absolute w-full bottom-0">
        <InputText
          addMessage={sendMessageToServer}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </>
  );
};

export default ChatContainer;
