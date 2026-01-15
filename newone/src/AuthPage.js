import React, { useState } from 'react';
import './LoginPage.css'; // Your existing CSS

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Signup
  const [formData, setFormData] = useState({
    fullname: '', email: '', password: '', phone: '', confirmPassword: '', otp: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(true); // Always open like video

  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isLogin) { // Signup
      if (!formData.fullname.trim()) newErrors.fullname = 'Full name required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!validatePassword(formData.password)) newErrors.password = 'Password too weak';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOtpSent(true);
    setShowOTP(true);
  };

  const handleOTPVerify = () => {
    if (formData.otp === '123456') {
     localStorage.setItem('user', JSON.stringify(formData));
     window.location.href = '/dashboard';
    }
    else {
     alert('Invalid OTP. Try 123456');
    }
  };


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setShowOTP(false);
    setOtpSent(false);
    setErrors({});
    setFormData({ fullname: '', email: '', password: '', phone: '', confirmPassword: '', otp: '' });
  };

  return (
    <div className="login-container">
      {/* Navbar like video */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', 
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
        padding: '1rem 2rem', zIndex: 1000, boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: 0, color: '#667eea', fontWeight: 600 }}>YourApp</h3>
      </nav>

      {/* Main Modal/Popup - Always centered like video */}
      {isModalOpen && (
        <div className="login-form" style={{ animation: 'slideIn 0.5s ease-out' }}>
          <button 
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute', top: '15px', right: '20px',
              background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'
            }}
          >
            ×
          </button>

          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

          {/* Toggle Buttons like video */}
          <div style={{
            display: 'flex', marginBottom: '30px', borderRadius: '10px', overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <button 
              type="button"
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1, padding: '15px', border: 'none',
                background: isLogin ? '#667eea' : '#f3f4f6',
                color: isLogin ? 'white' : '#666',
                fontWeight: isLogin ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1, padding: '15px', border: 'none',
                background: !isLogin ? '#667eea' : '#f3f4f6',
                color: !isLogin ? 'white' : '#666',
                fontWeight: !isLogin ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && ( // Show fullname only for signup
              <div className="input-group">
                <input 
                  type="text" name="fullname" 
                  placeholder="Full Name" 
                  value={formData.fullname} 
                  onChange={handleChange} 
                />
                {errors.fullname && <span className="error">{errors.fullname}</span>}
              </div>
            )}

            <div className="input-group">
              <input 
                type="email" name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            <div className="input-group">
              <input 
                type="password" name="password" 
                placeholder="Strong Password" 
                value={formData.password} 
                onChange={handleChange} 
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            {!isLogin && ( // Confirm password only for signup
              <div className="input-group">
                <input 
                  type="password" name="confirmPassword" 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>
            )}

            <div className="input-group">
              <input 
                type="tel" name="phone" 
                placeholder="Phone (10 digits)" 
                value={formData.phone} 
                onChange={handleChange} 
                maxLength={10}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            {otpSent && (
              <p className="otp-message">
                OTP sent to {formData.phone}! Use: <strong>123456</strong>
              </p>
            )}

            {showOTP ? (
              <div className="input-group">
                <input 
                  type="text" name="otp" 
                  placeholder="Enter 6-digit OTP" 
                  value={formData.otp} 
                  onChange={handleChange} 
                  maxLength={6}
                />
                <button type="button" className="verify-btn" onClick={handleOTPVerify}>
                  Verify OTP
                </button>
              </div>
            ) : (
              <button type="submit" className="login-btn">
                {otpSent ? 'Resend OTP' : (isLogin ? 'Login with OTP' : 'Create Account')}
              </button>
            )}

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
              {isLogin ? 'New user?' : 'Already have account?'}
              <br />
              <button 
                type="button" 
                onClick={toggleForm}
                style={{ 
                  background: 'none', border: 'none', 
                  color: '#667eea', cursor: 'pointer', fontSize: '14px'
                }}
              >
                {isLogin ? 'Create Account' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success/Dashboard Screen */}
      {!isModalOpen && (
        <div className="success-message" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <h2>✅ Welcome to Dashboard!</h2>
          <p>{formData.fullname}, your account is active.</p>
          <button 
            className="login-btn" 
            style={{ maxWidth: '200px', margin: '0 auto' }}
            onClick={() => setIsModalOpen(true)}
          >
            New Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
