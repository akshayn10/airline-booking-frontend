import { Button, Form, Input, Select } from "antd";
import styles from "./contactForm.module.css";
import CountryDropdown from "./countryDropdown";
import PhoneNumber from "./phoneNumber";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { SaveContactDetails } from "../../../../../redux/actions/AuthActions";

const ContactForm = ({ email }) => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState();

  const onFinish = (values) => {
    values = { ...values, email: email };
    console.log(values);
    dispatch(SaveContactDetails(values));
    console.log("Received values of form: ", values);
  };
  useEffect(() => {
    console.log("hello",selectedCountry)
  }
  ,[selectedCountry])
  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item
          name="addressLine"
          rules={[
            {
              required: true,
              message: "Please input Address Line",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Address Line" />
        </Form.Item>
        <div
          style={{
            display: "flex",
            gap: "1%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="zipCode"
            rules={[
              {
                required: true,
                message: "Please input your Zip code!",
              },
            ]}
            hasFeedback
          >
            <Input type="number" placeholder="Zip Code" />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please input City!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="City" />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <CountryDropdown setSelectedCountry={setSelectedCountry} />
          <Form.Item
            name="state"
            rules={[
              {
                required: true,
                message: "Please input your State",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="State" />
          </Form.Item>
        </div>
        <PhoneNumber selectedCountry={selectedCountry} />

        <Form.Item>
          <Button
            shape="round"
            type="primary"
            htmlType="submit"
            className="signup__button"
          >
            Complete Registration
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
