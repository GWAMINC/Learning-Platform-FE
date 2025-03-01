import { useEffect, useState } from "react";
import userService from "../../services/userService";
import chatService from "../../services/chatService";
import "./ChatPage.css";
import ChatRoomPage from "../ChatRoom/ChatRoomPage.jsx";

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const currentUser = localStorage.getItem("username");

    useEffect(() => {
        userService.getAllUsers().then((data) => setUsers(data.users || []));
    }, []);

    const startChat = async (otherUser) => {
        try {
            const chatRoom = await chatService.createOrGetChatRoom(currentUser, otherUser);
            localStorage.setItem("receiver", otherUser);
            setSelectedChatRoom(chatRoom.id); // Cập nhật chatroom được chọn
        } catch (error) {
            console.error("❌ Lỗi khi tạo hoặc lấy chatroom:", error);
        }
    };

    return (
        <div className="chat-container">
            {/* Sidebar hiển thị danh sách user/chatroom */}
            <div className="sidebar">
                <h2>Danh sách bạn bè</h2>
                <div className="user-list">
                    {users.map((user) => (
                        <div key={user.id} className="user-item" onClick={() => startChat(user.username)}>
                            <img src={`https://ui-avatars.com/api/?name=${user.username}`} alt="avatar" />
                            <p>{user.username}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Khu vực chatroom */}
            <div className="chat-room-container">
                {selectedChatRoom ? (
                    <ChatRoomPage chatRoomId={selectedChatRoom} />
                ) : (
                    <h2>Hãy bắt đầu cuộc trò chuyện với ai đó!</h2>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
