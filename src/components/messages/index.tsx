import React from "react";

interface MessagesProps {
  text?: string;
  className?: string;
}

const Messages = (props: MessagesProps) => {
  return (
    <div
      role="alert"
      className={`flex border border-red-700 rounded-lg p-4 mb-4 text-sm ${props.className}`}
    >
      <p>{props.text}</p>
    </div>
  );
};

export default Messages;
