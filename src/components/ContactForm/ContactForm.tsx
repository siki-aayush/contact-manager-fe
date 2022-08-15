import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, Checkbox } from "antd";
import CountryPhoneInput from "antd-country-phone-input";
import axios from "axios";
import React from "react";
import { getUserIdFromLocalStorage } from "../../utils/localstorage.util";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
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

const ContactForm = () => {
  const [favourite, setFavourite] = React.useState(false);
  const id = getUserIdFromLocalStorage();

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone.phone);
    formData.append("address", values.address);
    formData.append("photograph", values.photograph[0].originFileObj);
    formData.append("is_favourite", `${favourite}`);
    formData.append("user_id", id as string);

    try {
      const res = await axios.post("/contacts", formData, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.data) {
        console.log("Contact created successfully");
        window.location.reload();
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
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
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

      <Form.Item name="favourite" label="Favourite">
        <Checkbox.Group>
          <Checkbox onChange={(e) => setFavourite(e.target.checked)} />
        </Checkbox.Group>
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <CountryPhoneInput />
      </Form.Item>

      <Form.Item
        name="photograph"
        label="Profile Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="photo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Document Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
