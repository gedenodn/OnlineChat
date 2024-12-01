import { WaitingRoom } from "./components/WaitingRoom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useState } from "react";
import { Chat } from "./components/Chat";

function App() {
  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");

  const joinChat = async (userName, room) => {
    console.log({ userName, room });
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5185/chat")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (userName, message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { userName, message },
      ]);
    });

    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatRoom: room });
      setConnection(connection);
      setChatRoom(room);
      setUserName(userName); 
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const sendMessage = async (message) => {
    if (connection && chatRoom) {
      try {
        await connection.invoke("SendMessage", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const closeChat = async () => {
    if (connection) {
      await connection.stop();
      setConnection(null);
      setMessages([]);
      setChatRoom("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {connection ? (
        <Chat
          messages={messages}
          chatRoom={chatRoom}
          closeChat={closeChat}
          sendMessage={sendMessage} // Pass sendMessage function here
        />
      ) : (
        <WaitingRoom joinChat={joinChat} />
      )}
    </div>
  );
}

export default App;
