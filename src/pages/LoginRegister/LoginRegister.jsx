import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService.js";
import "./LoginRegister.css";

const LoginRegister = () => {
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
        <div className="login-container">
            <div className="login-register-container">
                <input type= "checkbox" id= "chk" aria-hidden="true"/>
                <div className="register-form">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Sign Up</label>
                        <input type="text" name="txt" placeholder="Username" required/>
                        <input type="email" name="email" placeholder="Email" required/>
                        <input type="password" name="pswd" placeholder="Password" required/>
                        <button>Register</button>
                    </form>
                </div>
                <div className="login-form">
                    <label htmlFor="chk" aria-hidden="true">Sign In</label>
                    {message && <p className="login-message">{message}</p>}
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
