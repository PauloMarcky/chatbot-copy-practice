import { useRef, useEffect } from 'react';
import { Message } from './Message';
import './MessageComponents.css'

export function MessageComponents({ chatMessage, isLoading }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const container = chatMessagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessage]);

  return (
    <div className='message-container' ref={chatMessagesRef}>
      {chatMessage.map((msg) => (
        <Message message={msg.message} sender={msg.sender} key={msg.id} />
      ))}
      {isLoading &&
        <div className='loading-type'>
          <img src="/images/robot.png" />
          <p>Typing...</p>
        </div>
      }
    </div>
  );
}