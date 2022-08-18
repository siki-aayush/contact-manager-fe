import RegisterForm from "../../components/registerForm/RegisterForm";
import React, { useState } from "react";

import "./Register.css";
import { Typography } from "antd";
import Loading from "../../hoc/Loading";

/**
 * Register.
 */
const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { Title } = Typography;
  return (
    <Loading isLoading={isLoading}>
      <div className="register center">
        <div className="register__wrapper">
          <Title className="register__title">Sign Up</Title>
          <RegisterForm setIsLoading={setIsLoading} />
        </div>
      </div>
    </Loading>
  );
};

export default Register;
