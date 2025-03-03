import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService.js";
import "./LoginRegister.css";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Thêm state mới cho xác nhận mật khẩu
  const [message, setMessage] = useState("");
  const [messageregister, setMessageregister] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [formMode, setFormMode] = useState("login"); // "login" or "register"
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State cho việc hiển thị xác nhận mật khẩu
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    // Reset messages when switching tabs
    setMessage("");
    setMessageregister("");
    
    // Kiểm tra xem có thông tin đăng nhập đã lưu không
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [formMode]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
        
        // Lưu thông tin đăng nhập nếu người dùng đã chọn "Ghi nhớ đăng nhập"
        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
          localStorage.setItem("savedPassword", password);
        } else {
          localStorage.removeItem("savedEmail");
          localStorage.removeItem("savedPassword");
        }
        
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
    
    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      setMessageregister("❌ Mật khẩu xác nhận không khớp!");
      return;
    }
    
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

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
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

            <div className="input-group password-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirm-pswd"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="input-icon">🔒</span>
              <span 
                className="password-toggle" 
                onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? "🙈" : "👁️"}
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
            
            {/* Thêm checkbox "Ghi nhớ đăng nhập" */}
            <div className="remember-me-container">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <span className="checkmark"></span>
                Ghi nhớ đăng nhập
              </label>
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