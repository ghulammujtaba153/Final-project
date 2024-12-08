import React from 'react';

const Message = ({ message, own }) => {
  console.log(own);
  const formattedDate = new Date(message.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    message?.sender && (
      <div className={`flex items-center ${own ? 'justify-end' : 'justify-start'} my-4`}>
        <div
          className={`flex flex-col max-w-xs p-2  ${
            own ? 'bg-blue-200 text-right rounded-l-lg rounded-br-lg' : 'bg-gray-200 text-left rounded-r-lg rounded-bl-lg'
          }`}
        >
          <div>{message.content}</div>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>
    )
  );
};

export default Message;
