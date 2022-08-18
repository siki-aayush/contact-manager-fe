import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../interfaces/register";
import axios from "axios";

interface registerFormInterface {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
/**
 * RegisterForm.
 * Renders the registration form
 */
const RegisterForm = ({ setIsLoading }: registerFormInterface) => {
  const [confirmPassErr, setConfirmPassErr] = useState<string>("");

  const navigate = useNavigate();

  // Size of the input fields and labels.
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  /**
   * onFinish.
   * @param {registerInterface} values
   */
  const onFinish = async (values: register) => {
    if (values.password !== values.confirmPassword) {
      setConfirmPassErr("The password and confirm password doesn't match");
      return;
    }

    setIsLoading(false);

    try {
      await axios("/register", {
        method: "POST",
        data: {
          email: values.email,
          password: values.password,
        },
      });

      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      {...layout}
      className="register-form"
      name="register-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      size="large"
      style={{ minWidth: "280px" }}
    >
      <Form.Item name="email" rules={[{ type: "email" }]}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: "Please input your confirm password!" },
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <p style={{ color: "red" }}>{confirmPassErr}</p>

      <Form.Item
        wrapperCol={{ ...layout.wrapperCol, offset: 7 }}
        style={{ marginTop: "35px" }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
