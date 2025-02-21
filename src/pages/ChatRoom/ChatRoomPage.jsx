import { useEffect, useState, useRef } from "react";
import chatService from "../../services/chatService";

const ChatRoomPage = ({ chatRoomId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const sender = localStorage.getItem("username");
    const socketRef = useRef(null);

    useEffect(() => {
        if (!sender || !chatRoomId) return;

        chatService.getOldMessages(chatRoomId)
            .then((oldMessages) => setMessages(oldMessages.reverse()))
            .catch((error) => console.error("❌ Lỗi khi lấy tin nhắn cũ:", error));

        if (!socketRef.current) {
            chatService.socket.connect();
            socketRef.current = chatService.socket;
            socketRef.current.emit("joinRoom", { chatRoomId });
        }

        socketRef.current.off("receiveMessage");
        socketRef.current.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socketRef.current.disconnect();
            socketRef.current = null;
        };
    }, [chatRoomId]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            chatService.sendMessage(chatRoomId, sender, message);
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Phòng Chat</h2>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === sender ? "sent" : "received"}`}>
                        <strong>{msg.sender}: </strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={sendMessage}>Gửi</button>
            </div>
        </div>
    );
};

export default ChatRoomPage;

