import { useState } from 'react';
import './App.css';
import { MessageComponents } from './components/MessageComponents';
import { TextInput } from './components/TextInput';


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