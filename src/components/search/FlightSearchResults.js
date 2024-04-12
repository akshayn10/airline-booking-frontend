import React from "react";
import { Card } from "antd"; // Import Ant Design components
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "./FlightSearch.module.css"; // Import CSS Modules styles

const FlightSearchResults = ({ flightResults }) => {
  const slicedResults = flightResults.slice(0, 7); // Slice the array to first 6 elements
  return (
    <div className={styles.searchResultsContainer}>
      <div className={styles.flightResultRow}>
        {slicedResults.map((flight) => (
          <Card
            key={flight.flightNumber}
            title={
              <span className={styles.cardTitle}>
                {`${flight.airline} - ${flight.flightNumber}`}
              </span>
            }
            style={{
              marginBottom: 16,
              marginRight: "20px",
              border: "4px solid #ddd",
            }} // Add marginRight
          >
            <div>
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default FlightSearchResults;
