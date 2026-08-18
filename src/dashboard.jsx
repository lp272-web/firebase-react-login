import { useState } from "react";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { Form, Input, Button, Modal } from "antd";
import "./app.css";

function Dashboard() {
  const [status, setStatus] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleChangePassword = async (values) => {
    const user = auth.currentUser;

    if (!user) {
      setStatus("Error: No user is logged in.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, values.newPassword);

      setStatus("Password updated successfully!");
      form.resetFields();
    } catch (error) {
      setStatus("Incorrect password.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="auth-card">
      <h2>Welcome!</h2>
      <p>You are logged in as {auth.currentUser?.email}</p>

      <h2>Change Password</h2>
      <Form form={form} layout="vertical" onFinish={handleChangePassword} autoComplete="off">
        <Form.Item
          name="currentPassword"
          rules={[{ required: true, message: "Please enter your current password!" }]}
        >
          <Input.Password placeholder="Current Password" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please enter a new password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Password
          </Button>
        </Form.Item>
      </Form>

      <button className="logout-btn" onClick={() => setIsLogoutModalOpen(true)}>
        Logout
      </button>

      {status && <p className="status-message">{status}</p>}

      <Modal
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
}

export default Dashboard;
