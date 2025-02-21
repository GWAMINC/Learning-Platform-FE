import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import chatService from "../../services/chatService";

const ChatRoomPage = () => {
    const { chatRoomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const sender = localStorage.getItem("username");
    const socketRef = useRef(null);

    useEffect(() => {
        if (!sender) {
            console.warn("⚠ Chưa đăng nhập!");
            return;
        }

        console.log("🔥 Lấy tin nhắn cũ...");
        chatService.getOldMessages(chatRoomId)
            .then((oldMessages) => setMessages(oldMessages.reverse()))
            .catch((error) => console.error("❌ Lỗi khi lấy tin nhắn cũ:", error));

        console.log("🌐 Kết nối Socket.io...");
        if (!socketRef.current) {
            chatService.socket.connect();
            socketRef.current = chatService.socket;
        }

        // 🛠 Tránh việc đăng ký lặp sự kiện bằng cách xóa listener cũ trước khi thêm mới
        socketRef.current.off("receiveMessage");
        socketRef.current.on("receiveMessage", (newMessage) => {
            console.log("📩 Nhận tin nhắn:", newMessage);
            setMessages((prev) => [...prev, newMessage]);
        });

        // ✅ Chỉ join room nếu chưa join trước đó
        socketRef.current.emit("joinRoom", { chatRoomId });

        return () => {
            console.log("🚪 Ngắt kết nối Socket.io...");
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
        <div className="chat-room-container">
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
