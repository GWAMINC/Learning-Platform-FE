import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService.js";
import "./LoginRegister.css";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageregister, setMessageregister] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [formMode, setFormMode] = useState("login"); // "login" or "register"
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset messages when switching tabs
    setMessage("");
    setMessageregister("");
  }, [formMode]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const data = await userService.login(email, password);

      if (data.success) {
        setMessage("✅ Đăng nhập thành công!");
        if (localStorage.getItem("username")) {
          localStorage.removeItem("username");
        }
        localStorage.setItem("username", data.username);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage("❌ Đăng nhập thất bại! Kiểm tra lại email hoặc mật khẩu.");
      }
    } catch (error) {
      setMessage("⚠ Lỗi đăng nhập! Vui lòng thử lại. Lỗi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessageregister("");
    setIsLoading(true);
    
    try {
      const data = await userService.register(username, email, password, role);
      if (data.success) {
        setMessageregister("✅ Đăng ký thành công! Bạn có thể đăng nhập.");
        setTimeout(() => {
          document.getElementById("chk").checked = true;
          setFormMode("login");
        }, 1500);
      } else {
        setMessageregister(data.message);
      }
    } catch (error) {
      setMessageregister("⚠ Lỗi đăng ký! Vui lòng thử lại. Lỗi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("❌ Vui lòng nhập email để khôi phục mật khẩu");
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await userService.forgotPassword(email);
      if (data.success) {
        setMessage("✅ Đã gửi email khôi phục mật khẩu!");
      } else {
        setMessage("❌ Email không tồn tại!");
      }
    } catch (error) {
      setMessage("⚠ Lỗi! Vui lòng thử lại. Lỗi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchForm = (mode) => {
    setFormMode(mode);
    if (mode === "login") {
      document.getElementById("chk").checked = true;
    } else {
      document.getElementById("chk").checked = false;
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-background"></div>
      <div className="login-register-container">
        <input type="checkbox" id="chk" aria-hidden="true" onChange={() => setFormMode(document.getElementById("chk").checked ? "login" : "register")} />
        
        <div className="form-switch-buttons">
          <button 
            className={`switch-btn ${formMode === 'register' ? 'active' : ''}`} 
            onClick={() => handleSwitchForm('register')}>
            Đăng ký
          </button>
          <button 
            className={`switch-btn ${formMode === 'login' ? 'active' : ''}`} 
            onClick={() => handleSwitchForm('login')}>
            Đăng nhập
          </button>
        </div>
        
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <h2 className="form-title">Đăng ký tài khoản</h2>
            
            {messageregister && (
              <div className={`message-box ${messageregister.includes('✅') ? 'success' : 'error'}`}>
                {messageregister}
              </div>
            )}
            
            <div className="input-group">
              <input
                type="text"
                name="txt"
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="input-icon">👤</span>
            </div>
            
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-icon">✉️</span>
            </div>
            
            <div className="input-group password-group">
              <input
                type={passwordVisible ? "text" : "password"}
                name="pswd"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-icon">🔒</span>
              <span 
                className="password-toggle" 
                onClick={togglePasswordVisibility}>
                {passwordVisible ? "🙈" : "👁️"}
              </span>
            </div>
            
            <div className="input-group select-group">
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Học viên</option>
                <option value="teacher">Giảng viên</option>
              </select>
              <span className="input-icon">🎓</span>
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>
        </div>
        
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <h2 className="form-title">Đăng nhập</h2>
            
            {message && (
              <div className={`message-box ${message.includes('✅') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
            
            <div className="input-group">
              <input
                type="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-icon">✉️</span>
            </div>
            
            <div className="input-group password-group">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-icon">🔒</span>
              <span 
                className="password-toggle" 
                onClick={togglePasswordVisibility}>
                {passwordVisible ? "🙈" : "👁️"}
              </span>
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                "Đăng nhập"
              )}
            </button>
            
            <div className="forgot-password" onClick={handleForgotPassword}>
              Quên mật khẩu?
            </div>
          </form>
          
          <div className="social-login">
            <p>Hoặc đăng nhập với</p>
            <div className="social-icons">
              <button className="social-btn google">
                <span>G</span>
              </button>
              <button className="social-btn facebook">
                <span>f</span>
              </button>
              <button className="social-btn github">
                <span>Git</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;