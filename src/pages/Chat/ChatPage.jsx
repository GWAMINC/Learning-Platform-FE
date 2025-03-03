import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import userService from "../../services/userService";
import chatService from "../../services/chatService";
import "./ChatPage.css";
import ChatRoomPage from "../ChatRoom/ChatRoomPage.jsx";
import { Link } from 'react-router-dom';

// Fake user data for demonstration
const fakeUsers = [
  { id: 1, username: "emily_chen", lastSeen: "just now", avatar: "https://ui-avatars.com/api/?name=Emily+Chen&background=4A90E2&color=fff" },
  { id: 2, username: "alex_johnson", lastSeen: "2m ago", avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=50E3C2&color=fff" },
  { id: 3, username: "taylor_swift", lastSeen: "5m ago", avatar: "https://ui-avatars.com/api/?name=Taylor+Swift&background=F5A623&color=fff" },
  { id: 4, username: "david_miller", lastSeen: "10m ago", avatar: "https://ui-avatars.com/api/?name=David+Miller&background=D0021B&color=fff" },
  { id: 5, username: "sophia_rodriguez", lastSeen: "15m ago", avatar: "https://ui-avatars.com/api/?name=Sophia+Rodriguez&background=7ED321&color=fff" },
  { id: 6, username: "michael_brown", lastSeen: "30m ago", avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=BD10E0&color=fff" },
  { id: 7, username: "olivia_jones", lastSeen: "1h ago", avatar: "https://ui-avatars.com/api/?name=Olivia+Jones&background=9013FE&color=fff" },
  { id: 8, username: "james_wilson", lastSeen: "2h ago", avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=F8E71C&color=fff" },
  { id: 9, username: "emma_garcia", lastSeen: "3h ago", avatar: "https://ui-avatars.com/api/?name=Emma+Garcia&background=4A90E2&color=fff" },
  { id: 10, username: "william_martinez", lastSeen: "5h ago", avatar: "https://ui-avatars.com/api/?name=William+Martinez&background=FF9500&color=fff" },
  { id: 11, username: "ava_anderson", lastSeen: "yesterday", avatar: "https://ui-avatars.com/api/?name=Ava+Anderson&background=FF3B30&color=fff" },
  { id: 12, username: "liam_thomas", lastSeen: "yesterday", avatar: "https://ui-avatars.com/api/?name=Liam+Thomas&background=34C759&color=fff" },
  { id: 13, username: "amelia_white", lastSeen: "2 days ago", avatar: "https://ui-avatars.com/api/?name=Amelia+White&background=5856D6&color=fff" },
  { id: 14, username: "noah_harris", lastSeen: "3 days ago", avatar: "https://ui-avatars.com/api/?name=Noah+Harris&background=FF9500&color=fff" },
  { id: 15, username: "isabella_clark", lastSeen: "4 days ago", avatar: "https://ui-avatars.com/api/?name=Isabella+Clark&background=FF2D55&color=fff" }
];

// Recent chat snippets to make the UI more realistic
const recentChatSnippets = [
  "Hey, how are you doing today?",
  "Are we still meeting tomorrow?",
  "Thanks for sending that file",
  "Did you see the latest update?",
  "I'll check and get back to you",
  "That sounds great!",
  "Can you help me with something?",
  "Just sent you an email",
  "Let's catch up soon",
  "Have you tried the new feature?",
  "I'm available after 3pm",
  "Looking forward to it!",
  "Sorry I missed your call",
  "What do you think about the project?",
  "Let me know when you're free"
];

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isChangingChat, setIsChangingChat] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [userLastMessages, setUserLastMessages] = useState({});
    const currentUser = localStorage.getItem("username") || "current_user";

    // Fetch users with useCallback to avoid recreation on each render
    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            let usersList = [];
            const onlineThreshold = ["just now", "2m ago", "5m ago", "10m ago", "15m ago"];
      const onlineUsersList = usersList.filter(user => onlineThreshold.includes(user.lastSeen)).map(user => user.username);
      const offlineUsersList = usersList.filter(user => !onlineThreshold.includes(user.lastSeen));

      // Gán tin nhắn gần đây cho tất cả users
      const messages = {};
      usersList.forEach(user => {
        const randomIndex = Math.floor(Math.random() * recentChatSnippets.length);
        messages[user.username] = onlineUsersList.includes(user.username) 
          ? recentChatSnippets[randomIndex] 
          : user.lastSeen;
      });
            
            setUsers(usersList);
            setFilteredUsers(usersList);
            setOnlineUsers(randomOnlineUsers);
            setUserLastMessages(messages);
        } catch (error) {
            console.error("Failed to fetch users:", error);

            const usersList = fakeUsers.filter(user => user.username !== currentUser);
            const randomOnlineUsers = [...usersList]
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.ceil(usersList.length * 0.4))
                .map(user => user.username);
            
            // Generate last messages
            const messages = {};
            usersList.forEach(user => {
                const randomIndex = Math.floor(Math.random() * recentChatSnippets.length);
                messages[user.username] = recentChatSnippets[randomIndex];
            });
            
            setUsers(usersList);
            setFilteredUsers(usersList);
            setOnlineUsers(randomOnlineUsers);
            setUserLastMessages(messages);
        } finally {
            setIsLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchUsers();
        
        // Add event listener for responsive handling
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [fetchUsers]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users]);

    const startChat = async (otherUser) => {
        try {
            setIsChangingChat(true);
            const selectedUser = users.find(user => user.username === otherUser);
            setSelectedUser(selectedUser);
            
            try {
                const chatRoom = await chatService.createOrGetChatRoom(currentUser, otherUser);
                localStorage.setItem("receiver", otherUser);
                setSelectedChatRoom(chatRoom.id);
            } catch (chatError) {
                console.warn("Using fake chatroom ID because API call failed:", chatError);
                // Fallback: create a fake chatroom ID if API fails
                const fakeChatRoomId = `chat_${currentUser}_${otherUser}`.replace(/[^a-z0-9]/gi, '_');
                localStorage.setItem("receiver", otherUser);
                setSelectedChatRoom(fakeChatRoomId);
            }
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
            }
        } catch (error) {
            console.error("❌ Error creating or getting chatroom:", error);
        } finally {
            setTimeout(() => setIsChangingChat(false), 300); // Add small delay for smoother transition
        }
    };

    // Function to go back to user list (for mobile)
    const backToUserList = () => {
        setIsSidebarOpen(true);
    };

    // Function to refresh user list
    const refreshUserList = () => {
        fetchUsers();
    };

    const getLastSeenTime = (username) => {
        const isOnline = onlineUsers.includes(username);
        if (isOnline) return "Active now";
        
        const user = fakeUsers.find(u => u.username === username);
        if (user?.lastSeen) return user.lastSeen;

        const times = ["1h ago", "2h ago", "yesterday", "3d ago", "1w ago"];
        return times[Math.floor(Math.random() * times.length)];
    };

    // Function to get user avatar
    const getUserAvatar = (username) => {
        const user = fakeUsers.find(u => u.username === username);
        if (user?.avatar) return user.avatar;
        return `https://ui-avatars.com/api/?name=${username}&background=random&color=fff`;
    };

    return (
        <div className="chat-page-container">
            {/* Sidebar toggle button for mobile */}
            <div 
                className={`sidebar-toggle ${!isSidebarOpen ? 'sidebar-closed' : ''}`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle sidebar"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Sidebar showing user/chatroom list */}
            <motion.div 
                className={`chat-sidebar ${!isSidebarOpen ? 'sidebar-closed' : ''}`}
                initial={{ x: window.innerWidth <= 768 ? '-100%' : 0 }}
                animate={{ x: isSidebarOpen ? 0 : '-100%' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="sidebar-header">
                <Link to="/" className="logo-container">
                    <svg viewBox="0 0 36 36" id="chat-logo" className="is-active">
                        <path id="tanuki-right-ear" className="tanuki-shape" fill="#a3a3a3" d="M2 14l9.38 9v-9l-4-12.28c-.205-.632-1.176-.632-1.38 0z"></path>
                        <path id="tanuki-left-ear" className="tanuki-shape" fill="#a3a3a3" d="M34 14l-9.38 9v-9l4-12.28c.205-.632 1.176-.632 1.38 0z"></path>
                        <path id="tanuki-nose" className="tanuki-shape" fill="#a3a3a3" d="M18,34.38 3,14 33,14 Z"></path>
                        <path id="tanuki-right-eye" className="tanuki-shape" fill="#575757" d="M18,34.38 11.38,14 2,14 6,25Z"></path>
                        <path id="tanuki-left-eye" className="tanuki-shape" fill="#575757" d="M18,34.38 24.62,14 34,14 30,25Z"></path>
                        <path id="tanuki-right-cheek" className="tanuki-shape" fill="#7d7d7d" d="M2 14L.1 20.16c-.18.565 0 1.2.5 1.56l17.42 12.66z"></path>
                        <path id="tanuki-left-cheek" className="tanuki-shape" fill="#7d7d7d" d="M34 14l1.9 6.16c.18.565 0 1.2-.5 1.56L18 34.38z"></path>
                    </svg>
                    <h2>Foxtle</h2>
                </Link>
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm bạn bè..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search friends"
                        />
                        <div className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                    <button 
                        className="refresh-button" 
                        onClick={refreshUserList}
                        aria-label="Refresh user list"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 4v6h-6"></path>
                            <path d="M1 20v-6h6"></path>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                            <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                    </button>
                </div>
                
                <div className="user-sections">
                    <div className="user-section-header">
                        <span className="online-indicator"></span>
                        <h3>Online ({filteredUsers.filter(user => onlineUsers.includes(user.username)).length})</h3>
                    </div>
                    <div className="user-list online-users">
                        <AnimatePresence>
                            {isLoading ? (
                                <div className="list-loading">
                                    <div className="loading-spinner small"></div>
                                </div>
                            ) : filteredUsers
                                .filter(user => onlineUsers.includes(user.username) && user.username !== currentUser)
                                .map((user) => (
                                    <motion.div
                                        key={user.id || user.username}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`user-item ${selectedUser?.username === user.username ? 'active' : ''}`}
                                        onClick={() => startChat(user.username)}
                                    >
                                        <div className="user-avatar">
                                            <img src={getUserAvatar(user.username)} alt={`${user.username}'s avatar`} />
                                            <span className="status-dot online"></span>
                                        </div>
                                        <div className="user-info">
                                            <p className="user-name">{user.username}</p>
                                            <p className="user-last-message">{userLastMessages[user.username] || "Active now"}</p>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                        {!isLoading && filteredUsers.filter(user => onlineUsers.includes(user.username) && user.username !== currentUser).length === 0 && (
                            <div className="no-results">
                                <p>Không có người dùng online</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="user-section-header">
                        <h3>All Friends ({filteredUsers.filter(user => user.username !== currentUser && !onlineUsers.includes(user.username)).length})</h3>
                    </div>
                    <div className="user-list">
                        <AnimatePresence>
                            {isLoading ? (
                                <div className="list-loading">
                                    <div className="loading-spinner small"></div>
                                </div>
                            ) : filteredUsers
                                .filter(user => user.username !== currentUser && !onlineUsers.includes(user.username))
                                .map((user) => (
                                    <motion.div
                                        key={user.id || user.username}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`user-item ${selectedUser?.username === user.username ? 'active' : ''}`}
                                        onClick={() => startChat(user.username)}
                                    >
                                        <div className="user-avatar">
                                            <img src={getUserAvatar(user.username)} alt={`${user.username}'s avatar`} />
                                            <span className="status-dot offline"></span>
                                        </div>
                                        <div className="user-info">
                                            <p className="user-name">{user.username}</p>
                                            <p className="user-last-message">{getLastSeenTime(user.username)}</p>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                        {!isLoading && filteredUsers.filter(user => user.username !== currentUser && !onlineUsers.includes(user.username)).length === 0 && (
                            <div className="no-results">
                                <p>Không tìm thấy người dùng</p>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="current-user-profile">
                    <div className="user-avatar">
                        <img src={`https://ui-avatars.com/api/?name=${currentUser}&background=845ef7&color=fff`} alt="Your avatar" />
                        <span className="status-dot online"></span>
                    </div>
                    <div className="user-info">
                        <p className="user-name">{currentUser}</p>
                        <p className="user-status">Active</p>
                    </div>
                    <div className="user-settings">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </div>
                </div>
            </motion.div>

            {/* Chatroom area */}
            <motion.div 
                className="chat-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Đang tải...</p>
                    </div>
                ) : isChangingChat ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Đang mở cuộc trò chuyện...</p>
                    </div>
                ) : selectedChatRoom ? (
                    <>
                        {/* Back button for mobile */}
                        <div className="mobile-chat-header">
                            <button 
                                className="back-button" 
                                onClick={backToUserList}
                                aria-label="Back to user list"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                            </button>
                            <div className="current-chat-info">
                                {selectedUser && (
                                   <>
                                   <div className="user-avatar small">
                                       <img 
                                           src={getUserAvatar(selectedUser.username)} 
                                           alt={`${selectedUser.username}'s avatar`} 
                                       />
                                       <span className={`status-dot ${onlineUsers.includes(selectedUser.username) ? 'online' : 'offline'}`}></span>
                                   </div>
                                   <span>{selectedUser.username}</span>
                               </>                               
                                )}
                            </div>
                        </div>
                        
                        <ChatRoomPage 
                            chatRoomId={selectedChatRoom} 
                            selectedUser={selectedUser} 
                            isOnline={selectedUser ? onlineUsers.includes(selectedUser.username) : false}
                            lastSeen={selectedUser ? getLastSeenTime(selectedUser.username) : ""}
                        />
                    </>
                ) : (
                    <div className="welcome-screen">
                        <div className="welcome-icon">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#845ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h1>Foxtle</h1>
                        <p>Hãy chọn một người bạn để bắt đầu cuộc trò chuyện</p>
                        <button 
                            className="mobile-start-chat" 
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Start chat"
                        >
                            Bắt đầu trò chuyện
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ChatPage;