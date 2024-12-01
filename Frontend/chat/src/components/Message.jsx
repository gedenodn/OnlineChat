export const Messagee = ({ messageInfo }) => {
    return (
      <div className="w-fit mb-2">
        <span className="text-sm text-slate-600">{messageInfo.userName}</span>
        <div className="p-2 bg-gray-100 rounded-lg shadow-md">
          {console.log(messageInfo)}
          {messageInfo.message}
        </div>
      </div>
    );
  };
  