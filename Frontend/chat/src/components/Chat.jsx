export const Chat = ({ messages, chatRoom, closeChat }) => {
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
      </div>
    );
  };
  