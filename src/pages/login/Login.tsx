import { Link } from "react-router-dom";
import { LoginForm } from "../../components/loginForm/LoginForm";
import "./Login.css";

export const Login: React.FC = () => {
  return (
    <div className="wrapper center">
      <div className="card center">
        <h1 className="card__title">
          <span>Contact Management</span>
        </h1>
        <LoginForm />

        <div className="card__footer">
          Don't have an account?{" "}
          <span>
            <Link to="#">Sign up for free</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
