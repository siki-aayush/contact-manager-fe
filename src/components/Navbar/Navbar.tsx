import {
  ContactsOutlined,
  LoginOutlined,
  MenuOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { clearUserLoginFromLocalStorage } from "../../utils/localstorage.util";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["contacts"]}
      overflowedIndicator={<MenuOutlined />}
      className="navbar"
    >
      <Menu.Item key="add-contacts" icon={<UserAddOutlined />}>
        <Link to="/contacts/add"> Add Contacts </Link>
      </Menu.Item>
      <Menu.Item
        key="contacts"
        icon={<ContactsOutlined />}
        className="testingChild"
      >
        <Link to="/contacts"> Contacts </Link>
      </Menu.Item>
      <Menu.Item
        key="login"
        icon={<LoginOutlined />}
        style={{ marginLeft: "auto" }}
      >
        <span
          onClick={() => {
            clearUserLoginFromLocalStorage();
            navigate("/login");
          }}
        >
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
