import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const data = await userService.login(email, password);

            if (data.success) {
                setMessage("✅ Đăng nhập thành công!");
                setTimeout(() => navigate("/dashboard"), 1000);
            } else {
                setMessage("❌ Đăng nhập thất bại! Kiểm tra lại email hoặc mật khẩu.");
            }
        } catch (error) {
            setMessage("⚠ Lỗi đăng nhập! Vui lòng thử lại. Lỗi: " + error.message);
        }
    };

    return (
        <div>
            <h2>Đăng nhập</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
