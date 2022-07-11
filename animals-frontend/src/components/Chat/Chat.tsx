import { useState } from "react";
import { FaRegPaperPlane, FaPlus } from "react-icons/fa";
import socket from "../../connection/socket";

interface ChatInterface {
  mySocketId: string;
  gameId: string;
}

interface MessageInterface {
  author: string;
  content: string;
}

function Chat(props: ChatInterface) {
  const { mySocketId, gameId } = props;

  const [isChat, setIsChat] = useState(false);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [messageToSend, setMessageToSend] = useState("");

  const renderMessages = () =>
    messages.map((message) => (
      <div className="chat__message message" key={message.content}>
        <p className="message__author">{message.author}:</p>
        <p className="message__content">{message.content}</p>
      </div>
    ));

  const sendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    socket.emit("sendMessage", {
      socketId: mySocketId,
      gameId,
      message: messageToSend,
    });
    setMessageToSend("");
  };

  socket.on("messagesUpdate", (messagesUpdated: MessageInterface[]) => {
    setMessages(messagesUpdated);
  });

  return isChat ? (
    <div className="chat">
      <button
        type="submit"
        className="chat__close-btn"
        onClick={() => setIsChat(false)}
      >
        <FaPlus className="chat__close-icon" />
      </button>
      <header className="chat__header">Chat</header>
      <div className="chat__messages">{renderMessages()}</div>
      <form className="chat__form" onSubmit={(e) => sendMessage(e)}>
        <input
          className="chat__input"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          maxLength={200}
        />
        <button
          type="submit"
          className="chat__send-btn"
          onClick={() => sendMessage()}
          disabled={messageToSend.length === 0}
        >
          SEND
        </button>
      </form>
    </div>
  ) : (
    <button
      type="submit"
      className="chat__show-btn"
      onClick={() => setIsChat(true)}
    >
      <FaRegPaperPlane />
    </button>
  );
}

export default Chat;
