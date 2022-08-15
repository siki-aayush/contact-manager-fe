import { Typography } from "antd";
import ContactForm from "../../components/ContactForm/ContactForm";

import "./ContactCreate.css";

const ContactCreate = () => {
  const { Title } = Typography;
  return (
    <div className="contact-create center">
      <Title className="contact-create__title">Add New Contact</Title>
      <ContactForm update={false} />
    </div>
  );
};

export default ContactCreate;
