import { useState } from "react";
import { FaRegPaperPlane, FaPlus } from 'react-icons/fa';
import exchangeTable from "../../exchangeTable";
import { socket } from "../../socket";

function Chat({ mySocketId, gameId }) {

    const [isChat, setIsChat] = useState();
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");

    const renderMessages = () => {
        return messages.map((message) => {
            return (
                <div className="chat__message message" key={message.author + "i" + message.content}>
                    <p className="message__author">{message.author}: </p>
                    <p className="message__content">{message.content}</p>
                </div>
            )
        })

    }

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("sendMessage", { socketId: mySocketId, gameId, message: messageToSend })
        setMessageToSend("");
    }

    socket.on("messagesUpdate", messages => {
        setMessages(messages);
    })

    return (
        <>
            {isChat ?
                <div className="chat">
                    <button className="chat__close-btn" onClick={() => setIsChat(false)}>
                        <FaPlus className="chat__close-icon" />
                    </button>
                    <header className="chat__header">
                        Chat
                    </header>
                    <div className="chat__messages">
                        {renderMessages()}
                    </div>
                    <form className="chat__form" onSubmit={(e) => sendMessage(e)}>
                        <input className="chat__input" value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} maxLength={200} />
                        <button className="chat__send-btn" onClick={(e) => sendMessage(e)} disabled={messageToSend.length === 0}>
                            SEND
                        </button>
                    </form>
                </div>
                :
                <button className="chat__show-btn" onClick={() => setIsChat(true)}>
                    <FaRegPaperPlane />
                </button>
            }
        </>
    )
}

export default Chat;