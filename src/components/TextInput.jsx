import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './TextInput.css'

export function TextInput({ chatMessage, setChatMessage, isLoading, setIsLoading }) {
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
