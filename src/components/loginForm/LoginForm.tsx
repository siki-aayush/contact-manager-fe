import { Button, Form, Input } from "antd";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginDetail } from "../../interfaces/loginDetail";
import { setIsUserLoggedIn } from "../../reducers";
import { setId } from "../../reducers/userSlice";
import { addUserLoginToLocalStorage } from "../../utils/localstorage.util";

import "./LoginForm.css";

export const LoginForm = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [msg] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: loginDetail) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/login", values);
      const data = res.data.data;

      if (data) {
        addUserLoginToLocalStorage(
          "true",
          data.accessToken,
          data.refreshToken,
          data.user.id
        );
        dispatch(setIsUserLoggedIn(true));
        dispatch(setId(data.user.id));
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
