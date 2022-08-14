import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { loginDetail } from "../../interfaces/loginDetail";

import "./LoginForm.css";
import axios from "axios";
import { addUserLoginToLocalStorage } from "../../utils/localstorage.util";

export const LoginForm: React.FC = () => {
  const [msg] = useState<string>("");
  const onFinish = async (values: loginDetail) => {
    console.log("values", values);
    const res = await axios("http://localhost:3002/login", {
      method: "POST",
      data: values,
    });

    if (res.data.data) {
      addUserLoginToLocalStorage(
        "true",
        res.data.data.accessToken,
        res.data.data.refreshToken
      );
    }
    // Send the request to the server.
    // const resp = await reqInstance('/login', {
    //   method: 'POST',
    //   data: values,
    // });
    // Checks if the request was successful.
    // if (resp.data.data) {
    //   addUserLoginToLocalStorage('true', resp.data.data.token);
    //   dispatch(setIsUserLoggedIn(true));
    //   navigate('/');
    // }
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
