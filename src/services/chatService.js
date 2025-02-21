import { io } from "socket.io-client";

const API_BASE = "http://localhost:8084/api/chat";
const SOCKET_BASE = "http://localhost:5001";

const socket = io(SOCKET_BASE, {
    transports: ["websocket"],
    autoConnect: false,
});

// ✅ Ngăn chặn sự kiện bị lặp bằng cách xóa listener cũ
const setupSocketListeners = () => {
    socket.off("receiveMessage"); // 🔥 Xóa listener cũ trước khi đăng ký mới
    socket.on("receiveMessage", (message) => {
        console.log("📩 Tin nhắn mới:", message);
    });
};

// ✅ Gửi tin nhắn
const sendMessage = (chatRoomId, sender, content) => {
    if (!socket.connected) {
        console.error("⚠ Không thể gửi tin nhắn vì WebSocket chưa kết nối.");
        return;
    }
    socket.emit("sendMessage", { chatRoomId, sender, content });
};

// ✅ API lấy tin nhắn cũ
const getOldMessages = async (chatRoomId) => {
    const response = await fetch(`${API_BASE}/messages/${chatRoomId}`);
    return response.json();
};

// ✅ API tạo chatroom
const createOrGetChatRoom = async (user1, user2) => {
    const response = await fetch(`${API_BASE}/chatroom?user1=${user1}&user2=${user2}`, {
        method: "POST",
    });
    return response.json();
};

export default { socket, setupSocketListeners, sendMessage, getOldMessages, createOrGetChatRoom };
