import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginDetail } from "../../interfaces/loginDetail";
import { addUserLoginToLocalStorage } from "../../utils/localstorage.util";

import "./LoginForm.css";

export const LoginForm: React.FC = () => {
  const [msg] = useState<string>("");
  const navigate = useNavigate();

  const onFinish = async (values: loginDetail) => {
    try {
      const res = await axios.post("/login", values);

      if (res.data.data) {
        addUserLoginToLocalStorage(
          "true",
          res.data.data.accessToken,
          res.data.data.refreshToken,
          res.data.data.user.id
        );
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = () => {
    console.log("failed");
  };

  return (
    <Form
      layout="vertical"
      size="large"
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="login"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email" }]}
        className="login__email"
        wrapperCol={{ span: 24 }}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password className="login__password" />
      </Form.Item>
      <div style={{ textAlign: "center", color: "red" }}>{msg}</div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login__submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
