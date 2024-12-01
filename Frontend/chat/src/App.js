import { WaitingRoom } from "./components/WaitingRoom"; 
import { HubConnectionBuilder } from "@microsoft/signalr";
import React from 'react';

function App() {
  const joinChat = async (userName, chatRoom) => {
    console.log({ userName, chatRoom }); 
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5185/chat")
      .withAutomaticReconnect()
      .build();
  
    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatRoom });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <WaitingRoom joinChat={joinChat} />
    </div>
  );
}

export default App;
