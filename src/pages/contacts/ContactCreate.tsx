import { Typography } from "antd";
import ContactForm from "../../components/ContactForm/ContactForm";

import { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";

import "./ContactCreate.css";

const ContactCreate = () => {
  const { Title } = Typography;
  return (
    <ConfigProvider locale={en}>
      <div className="contact-form center">
        <Title className="contact-form__title">Add New Contact</Title>
        <ContactForm />
      </div>
    </ConfigProvider>
  );
};

export default ContactCreate;
