import SignupForm from "./signupForm/signupForm/signupForm";
import SignupWelcome from "./signupForm/signupWelcome/signupWelcome";
import "./signup.css";
import background from "../../../assets/images/flightbg.jpg";
import React, { useState } from "react";
import { Steps } from "antd";
import ConfirmEmail from "./confirmEmail/confirmEmail";
import Contact from "./contact/contact";

export const SignupSection = ({ next }) => {
  return (
    <div className="signup__section">
      <div className="signup__welcome">
        <SignupWelcome />
      </div>
      <div className="signup__form">
        <SignupForm next={next} />
      </div>
    </div>
  );
};

const Signup = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  // const prev = () => {
  //   setCurrent(current - 1);
  // };
  const steps = [
    {
      title: "Signup",
      content: <SignupSection next={next} />,
    },
    {
      title: "Confirm Email",
      content: <ConfirmEmail next={next} />,
    },
    {
      title: "Contact Details",
      content: <Contact />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const styles = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={styles}>
      <div className="signup__text">User Signup</div>
      <div className="signup__container">
        <div className="steps_container">
          <Steps
            current={current}
            items={items}
          />
        </div>
        <div>{steps[current].content}</div>
      </div>
    </div>
  );
};

export default Signup;
