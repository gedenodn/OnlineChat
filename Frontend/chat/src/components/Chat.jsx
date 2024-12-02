import React, { useState, useRef, useEffect } from "react";

export const Chat = ({ messages, chatRoom, closeChat, sendMessage }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const onSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white p-4 rounded shadow-lg border border-gray-300">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-lg font-bold">{chatRoom}</h1>
        <button
          onClick={closeChat}
          className="text-red-500 hover:text-red-700 font-bold text-xl"
        >
          ×
        </button>
      </div>
      {}
      <div className="overflow-y-auto h-96 p-2 border-t border-b border-gray-200">
        {messages.map((messageInfo, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-600">
              <strong>{messageInfo.userName}:</strong> {messageInfo.message}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {}
      <div className="mt-4">
        <div className="flex gap-2">
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
