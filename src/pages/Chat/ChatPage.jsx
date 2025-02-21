import { useEffect, useState } from "react";
import userService from "../../services/userService";
import chatService from "../../services/chatService";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("username");
    useEffect(() => {
        userService.getAllUsers().then((data) => setUsers(data.users || []));
    }, []);

    const startChat = async (otherUser) => {
        try {
            const chatRoom = await chatService.createOrGetChatRoom(currentUser, otherUser);
            localStorage.setItem("receiver", otherUser);
            navigate(`/chatroom/${chatRoom.id}`); // Điều hướng đến chatroom
        } catch (error) {
            console.error("❌ Lỗi khi tạo hoặc lấy chatroom:", error);
        }
    };

    return (
        <div className="chat-container">
            <h2>Danh sách bạn bè</h2>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user.id} className="user-item" onClick={() => startChat(user.username)}>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatPage;
