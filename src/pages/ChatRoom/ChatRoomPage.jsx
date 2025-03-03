import { useEffect, useState, useRef } from "react";
import chatService from "../../services/chatService";
import "./ChatRoomPage.css"; // Đảm bảo bạn tạo file CSS riêng

const ChatRoomPage = ({ chatRoomId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const sender = localStorage.getItem("username");
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (!sender || !chatRoomId) return;

        setIsLoading(true);
        chatService.getOldMessages(chatRoomId)
            .then((oldMessages) => {
                setMessages(oldMessages.reverse());
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("❌ Lỗi khi lấy tin nhắn cũ:", error);
                setIsLoading(false);
            });

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
            if (socketRef.current) {
                socketRef.current.emit("leaveRoom", { chatRoomId });
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [chatRoomId, sender]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = (e) => {
        e?.preventDefault();
        if (message.trim() !== "") {
            const newMsg = {
                sender,
                content: message,
                timestamp: new Date().toISOString(),
                pending: true
            };
            
            setMessages((prev) => [...prev, newMsg]);
            chatService.sendMessage(chatRoomId, sender, message);
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const renderMessageGroups = () => {
        let currentDate = null;
        let currentSender = null;
        const groupedMessages = [];
        
        messages.forEach((msg, index) => {
            const messageDate = formatDate(msg.timestamp);
            
            // Add date separator if date changes
            if (currentDate !== messageDate) {
                groupedMessages.push(
                    <div key={`date-${index}`} className="date-separator">
                        <span>{messageDate}</span>
                    </div>
                );
                currentDate = messageDate;
                currentSender = null; // Reset sender when date changes
            }
            
            // Determine if sender changed
            const isSenderChanged = currentSender !== msg.sender;
            currentSender = msg.sender;
            
            groupedMessages.push(
                <div 
                    key={`msg-${index}`} 
                    className={`message-wrapper ${msg.sender === sender ? "sent" : "received"} ${isSenderChanged ? "new-sender" : ""}`}
                >
                    {isSenderChanged && msg.sender !== sender && (
                        <div className="sender-name">{msg.sender}</div>
                    )}
                    <div className="message">
                        <div className="message-content">{msg.content}</div>
                        <div className="message-time">{formatTime(msg.timestamp)}</div>
                        {msg.pending && <div className="message-status">Đang gửi...</div>}
                    </div>
                </div>
            );
        });
        
        return groupedMessages;
    };

    return (
        <div className="chat-room">
            <div className="chat-header">
                <h2>Phòng Chat</h2>
                <div className="chat-info">
                    <span className="chat-status">
                        {socketRef.current?.connected ? "Đang kết nối" : "Mất kết nối"}
                    </span>
                </div>
            </div>
            
            <div className="messages-container" ref={messagesContainerRef}>
                {isLoading ? (
                    <div className="loading-messages">
                        <div className="loading-spinner"></div>
                        <p>Đang tải tin nhắn...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="no-messages">
                        <p>Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
                    </div>
                ) : (
                    renderMessageGroups()
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <form className="chat-input-form" onSubmit={sendMessage}>
                <div className="chat-input-container">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Nhập tin nhắn..."
                        rows={1}
                    />
                    <button type="submit" className="send-button" disabled={message.trim() === ""}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatRoomPage;