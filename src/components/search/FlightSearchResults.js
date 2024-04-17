import React from "react";
import { Button, Card, Input, Form } from "antd"; // Import Ant Design components
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "./FlightSearch.module.css"; // Import CSS Modules styles
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FlightSearchResults = ({ flightResults }) => {
  const isAuthenticated = useSelector(
    (state) => state.authenticationStateReducer.authenticated
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let noOfPassengers;
  const navigate = useNavigate();
  const buttonClicked = () => {
    localStorage.setItem("passengerCount", noOfPassengers);
    if (isAuthenticated) {
      navigate("/booking/passenger-form");
    } else {
      localStorage.setItem("isBooking", true);
      navigate("/auth/login");
    }
  };

  const handleFormChange = (value) => {
    noOfPassengers = value;
  };

  return (
    <div className="flight-search-results">
      {flightResults.map((flight) => (
        <Card
          key={flight.flightNumber}
          title={
            <span className={styles.cardTitle}>
              {`${flight.airline} - ${flight.flightNumber}`}
            </span>
          }
          bordered={true}
          style={{ marginBottom: 16, border: "4px solid #ddd" }}
        >
          <p className={styles.flightTime}>
            <ArrowLeftOutlined />
            Departure Time: {flight.departureTime}
          </p>
          <p className={styles.flightTime}>
            <ArrowRightOutlined />
            Arrival Time: {flight.arrivalTime}
          </p>
          <p className={styles.price}>
            Price: {flight.price.toFixed(2)} (currency unit)
          </p>

          <a href="#" className={styles.bookNowButton}></a>
          {/* Add any additional flight details you want to display */}
        </Card>
      ))}
      <Form>
        <Form.Item>
          <Input
            type="number"
            name="passengers"
            onChange={(e) => handleFormChange(e.target.value)}
          ></Input>
        </Form.Item>
      </Form>
      <Button onClick={buttonClicked} className={styles.bookNowButton}>
        Book Now
      </Button>
    </div>
  );
};

export default FlightSearchResults;
