import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Form, Input, Button } from "antd";
import "../app.css";
import { useAuth } from "../hooks/authContext";

const heroImage =
  "https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { setLoading } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      setStatus("Login successful: " + userCredential.user.email);
      navigate("/dashboard");
    } catch (error) {
      setStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="auth-card fade-in-left">
        <h1>Welcome Back!</h1>
        <h4>Enter your credentials to access your account</h4>

        <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input a valid password!" },
            ]}
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
          <button
            type="button"
            className="toggle-link"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </p>

        {status && <p className="status-message">{status}</p>}
      </div>

      <div
        className="image-panel"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
    </div>
  );
}

export default Login;
