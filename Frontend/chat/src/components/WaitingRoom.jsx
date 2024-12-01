import React, { useState } from 'react';

export const WaitingRoom = ({ joinChat }) => {
  const [userName, setUsername] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    joinChat(userName, chatRoom);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm w-full bg-white p-8 rounded shadow-lg">
      <h1 className="text-xl font-bold">Online chat</h1>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          id="username"
          placeholder="Enter username"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="chatRoom" className="block text-sm">Chat room</label>
        <input
          onChange={(e) => setChatRoom(e.target.value)}
          name="chatRoom"
          id="chatRoom"
          placeholder="Enter chat room"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Join chat</button>
    </form>
  );
};
