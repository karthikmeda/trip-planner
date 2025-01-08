import React, { useState } from 'react';
import { auth } from '../../firebase'; // Import auth
import './Login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Firebase auth methods
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State for managing forgot password
  const navigate = useNavigate();
  const { email, password, confirmPassword } = data;

  const toggleMode = () => {
    setIsSignUp((prevMode) => !prevMode);
    setError(""); // Clear error when toggling
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(""); // Clear error as user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (password !== confirmPassword) {
        toast.error('password do not match!', {
          position: "top-right",
          autoClose: 3000,
        });
        setError("Passwords do not match!"); // Set error message
        return;
      }
      signUp();
    } else if (isForgotPassword) {
      resetPassword();
    } else {
      login();
    }

    // Reset form after submission
    setData({ email: "", password: "", confirmPassword: "" });
    setError("");
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Signed Up:", userCredential.user);
        //alert("Sign Up Successful!");
        toast.success("Successfully Signed Up", {
          position: "top-right",
          autoClose: 2000, // Adjust timing as needed
          onClose: () => navigate('/home'), // Navigate after toast closes
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Error:", err.message);
        setError(err.message); // Display Firebase error message
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Signed In:", userCredential.user);
        //alert("Login Successful!");
        toast.success("Successfully Login", {
          position: "top-right",
          autoClose: 2000, // Adjust timing as needed
          onClose: () => navigate('/home'), // Navigate after toast closes
        });
        
        // navigate('/home')
      })
      .catch((err) => {
        console.log("Error:", err.message);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setError(err.message); // Display Firebase error message
      });
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('password reset  mail  sent!!!', {
          position: "top-right",
          autoClose: 5000,
        });
        // alert("Password reset email sent!");
        setIsForgotPassword(false); // Hide the reset form after submission
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setError(err.message); // Display Firebase error message
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
        toast.success("Successfully Signed Up", {
          position: "top-right",
          autoClose: 2000, // Adjust timing as needed
          onClose: () => navigate('/home'), // Navigate after toast closes
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Error:", err.message);
        setError(err.message); // Display Firebase error message
      });
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">{isSignUp ? 'Sign Up' : isForgotPassword ? 'Forgot Password' : 'Login'}</h2>
          <p className="login-subtitle">
            {isSignUp
              ? 'Please fill out the form to create an account!'
              : isForgotPassword
              ? 'Enter your email to reset your password!'
              : 'Please enter your login and password!'}
          </p>

          <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={changeHandler}
                className="form-input"
                required
              />
            </div>
            {!isForgotPassword && (
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={changeHandler}
                className="form-input"
                required
              />
            </div>
            )}
            {isSignUp && !isForgotPassword && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={changeHandler}
                  className="form-input"
                  required
                />
              </div>
            )}

            {error && <p className="error-message">{error}</p>}

            {!isForgotPassword && !isSignUp && (
              <p className="forgot-password">
                <a href="#!" onClick={() => setIsForgotPassword(true)}>
                  Forgot password?
                </a>
              </p>
            )}

            <button type="submit" className="login-button">
              {isForgotPassword
                ? 'Send Reset Email'
                : isSignUp
                ? 'Sign Up'
                : 'Login'}
            </button>
          </form>

          {!isForgotPassword && !isSignUp && (
            <div>
              <button onClick={googleSignIn} className="google-login-button">
                Sign In with Google
              </button>
              <p className="signup-link">
                Don't have an account?{' '}
                <a href="#!" onClick={toggleMode}>
                  Sign Up
                </a>
              </p>
            </div>
          )}

          {isSignUp && (
            <p className="signup-link">
              Already have an account?{' '}
              <a href="#!" onClick={toggleMode}>
                Login
              </a>
            </p>
          )}
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;
