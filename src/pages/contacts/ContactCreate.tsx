import { Space, Spin, Typography } from "antd";
import { useState } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Loading from "../../hoc/Loading";

import "./ContactCreate.css";

const ContactCreate = () => {
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Loading isLoading={isLoading}>
      <div className="contact-create center">
        <Title className="contact-create__title">Add New Contact</Title>
        <ContactForm update={false} setIsLoading={setIsLoading} />
      </div>
    </Loading>
  );
};

export default ContactCreate;
