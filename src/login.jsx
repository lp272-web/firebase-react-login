import { useState } from "react";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";
import { Form, Input, Button } from "antd";
import "./app.css";
import { useAuth } from "./authContext";

const heroImage =
  "https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Login() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [status, setStatus] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { setLoading } = useAuth();

  const switchForm = () => {
  setIsAnimating(true);

  setTimeout(() => {
    setShowSignup((prev) => !prev);
    setIsAnimating(false);
  }, 400);
};

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      //set spinning to true
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setStatus("Login successful: " + userCredential.user.email);
      navigate("/dashboard");
    } catch (error) {
      setStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setStatus("Registration successful: " + userCredential.user.email);
      navigate("/dashboard");
    } catch (error) {
      setStatus("Error");
    } finally {
       setLoading(false);
    }
  };

  if (showSignup) {
    return (
      <div className="app-wrapper">
         <div className={`auth-card ${ isAnimating ? "fade-out-left" : "fade-in-right"}`}>
          <h1>Get Started Now</h1>
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" }
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <p className="toggle-text">
            Have an account?{" "}
            <button className="toggle-link" onClick={switchForm}
>
              Sign In
            </button>
          </p>

          {status && <p className="status-message">{status}</p>}
        

         </div>
        <div className="image-panel" style={{ backgroundImage: `url(${heroImage})` }}></div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <div className={`auth-card ${ isAnimating ? "fade-out-right" : "fade-in-left"}`}>
        <h1>Welcome Back!</h1>
        <h4>Enter your credentials to access your account</h4>
        <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input a valid password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="toggle-text">
          Don't have an account?{" "}
          <button className="toggle-link" onClick={switchForm}>
            Signup
          </button>
        </p>

        {status && <p className="status-message">{status}</p>}
      </div>
      <div className="image-panel" style={{ backgroundImage: `url(${heroImage})` }}></div>

    </div>
  );
}

export default Login;

