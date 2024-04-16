import { Button, Form, Input } from "antd";
import styles from "./userAccountManagement.module.css";
import { UserOutlined } from "@ant-design/icons";
import CountryDropDown from "../../auth/signup/contact/contactForm/countryDropdown";
import PhoneNumber from "../../auth/signup/contact/contactForm/phoneNumber";
import { useEffect } from "react";
import { useState } from "react";
import UserImage from "./userImage/userImage";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetailsByEmail, UpdateUserDetails } from "../../../redux/actions/UserActions";

const UserAccountManagement = () => {
  const dispatch = useDispatch();
  const [initialFormValues, setInitialFormValues] = useState(null);
  const authState = useSelector((state) => state.authenticationStateReducer);
  const getUserByEmailResponse = useSelector((state) => state.getUserByEmailReducer);
  const updateUserDetailsResponse = useSelector((state) => state.updateUserReducer);
  const getUserAccountDetails = (email) => {
    dispatch(GetUserDetailsByEmail(email));
  };
  useEffect(() => {
    getUserAccountDetails(authState.user.email);
  }, []);
  useEffect(() => {
    if(getUserByEmailResponse.status === true){
      const responseUserDetails = getUserByEmailResponse.data;
      setSelectedCountry(responseUserDetails.country);
      setInitialFormValues({
        firstName: responseUserDetails.firstName,
        lastName: responseUserDetails.lastName,
        email: responseUserDetails.email,
        username: responseUserDetails.username,
        addressLine: responseUserDetails.addressLine,
        city: responseUserDetails.city,
        zipCode: responseUserDetails.zipCode,
        country: responseUserDetails.country,
        state: responseUserDetails.state,
        phoneNumberPrefix: responseUserDetails.prefix,
        phoneNumber: responseUserDetails.phone,
      });
    
      console.log(initialFormValues);
    }

  },[getUserByEmailResponse])
  useEffect(() => {},[updateUserDetailsResponse])


  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(UpdateUserDetails(values))
  };
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    console.log("hello", selectedCountry);
  }, []);

  return (
    <div className={styles.container}>
      {
        initialFormValues &&
        <Form 
        className={styles.form__container}
        onFinish={onFinish}
        initialValues={initialFormValues}
      >
        <UserImage />
        <div
          style={{
            display: "flex",
            gap: "1%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "The email address is invalid!",
            },
          ]}
          hasFeedback
        >
          <Input
            disabled={true}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input a Username!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Username" />
        </Form.Item>

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
          <CountryDropDown setSelectedCountry={setSelectedCountry} />
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
            Update Details
          </Button>
        </Form.Item>
      </Form>
      }
      
    </div>
  );
};
export default UserAccountManagement;
