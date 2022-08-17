import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload } from "antd";
import CountryPhoneInput from "antd-country-phone-input";
import axios from "axios";
import React from "react";
import { Contact } from "../../interfaces/Contact";
import { getUserIdFromLocalStorage } from "../../utils/localstorage.util";

import { ConfigProvider } from "antd-country-phone-input";
import { useNavigate } from "react-router-dom";
import en from "world_countries_lists/data/countries/en/world.json";

import "./ContactForm.css";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
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
/* eslint-enable no-template-curly-in-string */

interface ContactFormInterface {
  initialValues?: Contact;
  id?: string;
  update: boolean;
}

const ContactForm = (props: ContactFormInterface) => {
  const [favourite, setFavourite] = React.useState(false);
  const user_id = getUserIdFromLocalStorage();
  const navigate = useNavigate();
  console.log(props.initialValues);

  const URL = props.update
    ? `/contacts/${props.initialValues?.id}`
    : "/contacts";
  const METHOD = props.update ? "PUT" : "POST";

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone.phone);
    formData.append("address", values.address);
    formData.append("photograph", values.photograph[0].originFileObj);
    formData.append("is_favourite", `${favourite}`);
    formData.append("user_id", user_id as string);
    if (props.update) {
      formData.append("id", props.id as string);
    }

    try {
      const res = await axios(URL, {
        method: METHOD,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.data) {
        console.log("Contact created successfully");
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <ConfigProvider locale={en}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={props.initialValues ? props.initialValues : {}}
        className="contact-form"
        size="large"
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="address" label="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <CountryPhoneInput value={{ short: "NP" }} size="small" />
        </Form.Item>

        <Form.Item name="favourite" label="Favourite">
          <Checkbox.Group>
            <Checkbox
              value={true}
              onChange={(e) => setFavourite(e.target.checked)}
            />
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="photograph"
          label="Profile Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <Upload name="photo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Document Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            {props.update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default ContactForm;
