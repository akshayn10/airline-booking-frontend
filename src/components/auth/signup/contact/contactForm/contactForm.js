import { Button, Form, Input, Select } from "antd";
import styles from "./contactForm.module.css";
import CountryDropdown from "./countryDropdown";
import PhoneNumber from "./phoneNumber";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SaveContactDetails } from "../../../../../redux/actions/AuthActions";
import { useNotificationContext } from "../../../../../context/notificationContext";
import { useNavigate } from "react-router-dom";
const ContactForm = ({ email }) => {
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();
  const addContactDetailsResponse = useSelector((state) => state.addContactDetailsResponseReducer);
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState();

  const onFinish = (values) => {
    console.log("Success:", email);
    const submitValues = { ...values, email: email };
    console.log(submitValues);
    dispatch(SaveContactDetails(submitValues));
    console.log("Received values of form: ", submitValues);
  };
  useEffect(() => {
    if (addContactDetailsResponse.status === true) {
      openNotification("success", addContactDetailsResponse.data);
      navigate("/auth/login");
    } else if (addContactDetailsResponse.status === false) {
      openNotification("error", addContactDetailsResponse.message);
    }
  }, [addContactDetailsResponse]);
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
