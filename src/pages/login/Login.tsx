import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../../components/loginForm/LoginForm";
import Loading from "../../hoc/Loading";
import "./Login.css";

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Loading isLoading={isLoading}>
      <div className="wrapper center">
        <div className="card center">
          <h1 className="card__title">
            <span>Contact Management</span>
          </h1>
          <LoginForm setIsLoading={setIsLoading} />

          <div className="card__footer">
            Don't have an account?{" "}
            <span>
              <Link to="#">Sign up for free</Link>
            </span>
          </div>
        </div>
      </div>
    </Loading>
  );
};
