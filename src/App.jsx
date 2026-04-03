import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './App.css';

function Message({ message, sender }) {
  return (
    <div className={sender === 'user' ? 'user-message' : 'robot-message'}>
      {sender === 'bot' && <img src="/images/robot.png" alt="bot" width="45px" height='45px' />}
      <p>{message}</p>
      {sender === 'user' && <img src="/images/user.png" alt="user" width="45px" height='45px' />}
    </div>
  );
}

function MessageComponents({ chatMessage, isLoading }) {
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
          <img src="/images/robot.png" alt="typing" />
          <p>Typing...</p>
        </div>
      }
    </div>
  );
}

function TextInput({ chatMessage, setChatMessage, isLoading, setIsLoading }) {
  const [messageInput, setMessageInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [chatMessage]);

  async function sendingMessage() {
    if (!messageInput.trim()) return;

    const newMessages = [
      ...chatMessage,
      { message: messageInput, sender: 'user', id: crypto.randomUUID() }
    ];

    setChatMessage(newMessages);
    setMessageInput('');
    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(messageInput);

    setIsLoading(false);
    setChatMessage([
      ...newMessages,
      { message: response, sender: 'bot', id: crypto.randomUUID() }
    ]);
  }

  return (
    <div className='text-input-container'>
      <input
        placeholder="Type here..."
        onChange={(e) => setMessageInput(e.target.value)}
        value={messageInput}
        onKeyDown={(e) => e.key === 'Enter' && sendingMessage()}
        disabled={isLoading}
        ref={inputRef}
      />
      <button onClick={sendingMessage} disabled={isLoading}>Send</button>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState([]);

  return (
    <div className='main-container'>
      <MessageComponents chatMessage={chatMessage} isLoading={isLoading} />
      <TextInput
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}