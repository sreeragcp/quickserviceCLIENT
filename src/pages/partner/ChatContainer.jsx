import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBoxPartnerSide";
import InputText from "./InputText";
import { useSelector } from "react-redux";



// const styles = {
     
// }

const ChatContainer = ({ bookingId, userId, partnerId, closeChatModal}) => {
;

const partnerData = useSelector((state)=>state.tocken.partnerData)

  let socketio = socketIOClient("https://quickservice.website");

  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("partnerData.name"));


  const [messageList, setMessageList] = useState([]);


 const currentUserId=partnerData._id
  const [messageTriger, setMessageTriger] = useState(new Date());

  useEffect(() => {
    socketio.on("connect", () => {
      console.log("Connected to Socket.IO server");
    },[]);



    socketio.emit("listMessages", {bookingId});

    socketio.on("messageList", (receivedMessages) => {
      // Update the state with the received messages
      setMessageList(receivedMessages?.messages);
    });
    return () => {
      // Disconnect the socket when the component unmounts
      socketio.disconnect();
    };
  },[messageTriger,bookingId]);

console.log(messageList,"this is the recived ");


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

  console.log(message,"this is the message");

  return (

    <>
      
      <div className=  "chats w-full h-[85%] overflow-y-scroll">
        
        {messageList?.map((chat,index) => {

          if (chat.sender === currentUserId) {
            return (
              <ChatBoxSender
                message={chat.text}
                timestamp={chat.timestamp}
                user={chat.userName}
              />
            );
          } else {
            return (
              <ChatBoxReciever
                key={index}
                message={chat.text}
                timestamp={chat.timestamp}
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
