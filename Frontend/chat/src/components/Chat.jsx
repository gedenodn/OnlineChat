import React, { useState } from "react";

export const Chat = ({ messages, chatRoom, closeChat, sendMessage }) => {
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="w-1/2 bg-white p-8 rounded shadow-lg">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-lg font-bold">{chatRoom}</h1>
        <button
          onClick={closeChat}
          className="text-red-500 hover:text-red-700 font-bold"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        {messages.map((messageInfo, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded shadow">
            <p className="text-sm text-gray-700">
              <strong>{messageInfo.userName}:</strong> {messageInfo.message}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message ..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={onSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
