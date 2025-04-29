
import React from 'react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button className="chat-button" onClick={onClick}>
      HI, chat with our ai about your goals!
    </button>
  );
};

export default ChatButton;
