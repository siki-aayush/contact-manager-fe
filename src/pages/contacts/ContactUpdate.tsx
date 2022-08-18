import { Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../../components/ContactForm/ContactForm";
import { Contact } from "../../interfaces/Contact";

import Loading from "../../hoc/Loading";
import "./ContactUpdate.css";

const ContactUpdate = () => {
  const { id } = useParams();
  const { Title } = Typography;
  const [contact, setContact] = useState<Contact>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        navigate("/contacts");
      });
  }, [id, navigate]);

  return (
    <Loading isLoading={isLoading}>
      <div className="contact-update center">
        <Title className="contact-update__title">Update Contact</Title>
        {contact && (
          <ContactForm
            initialValues={contact}
            update={true}
            id={id as string}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </Loading>
  );
};

export default ContactUpdate;
