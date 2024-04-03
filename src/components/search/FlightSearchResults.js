import React from "react";
import { Card } from "antd"; // Import Ant Design components
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "./FlightSearch.module.css"; // Import CSS Modules styles

const FlightSearchResults = ({ flightResults }) => {
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
          <a href="#" className={styles.bookNowButton}>
            Book Now
          </a>
          {/* Add any additional flight details you want to display */}
        </Card>
      ))}
    </div>
  );
};

export default FlightSearchResults;
