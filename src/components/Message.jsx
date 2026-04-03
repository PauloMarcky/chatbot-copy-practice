import './Message.css'

export function Message({ message, sender }) {
  return (
    <div className={sender === 'user' ? 'user-message' : 'robot-message'}>
      {sender === 'bot' && <img src="/images/robot.png" alt="bot" width="45px" height='45px' />}
      <p>{message}</p>
      {sender === 'user' && <img src="/images/user.png" alt="user" width="45px" height='45px' />}
    </div>
  );
}