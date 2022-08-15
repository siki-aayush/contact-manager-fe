import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../../components/ContactForm/ContactForm";
import { Contact } from "../../interfaces/Contact";
import { Typography } from "antd";

import "./ContactUpdate.css";

const ContactUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact>();
  const { Title } = Typography;

  useEffect(() => {
    axios
      .get(`/contacts/${id}`)
      .then((res) => {
        const data = res.data.data;
        const initialValues = {
          ...data,
          photograph: [],
          favourite: [data.is_favourite],
          phone: {
            phone: data.phone,
            short: "NP",
          },
        };
        setContact(initialValues);
      })
      .catch((error) => {
        console.log("error", error);
        navigate("/contacts");
      });
  }, [id, navigate]);

  return (
    <div className="contact-update center">
      <Title className="contact-update__title">Update Contact</Title>
      {contact && (
        <ContactForm initialValues={contact} update={true} id={id as string} />
      )}
    </div>
  );
};

export default ContactUpdate;
