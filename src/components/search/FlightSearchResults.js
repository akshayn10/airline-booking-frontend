import React from "react";
import { Card } from "antd"; // Import Ant Design components
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "./FlightSearch.module.css"; // Import CSS Modules styles
import dayjs from "dayjs";

const FlightSearchResults = ({
  flightData,
  selectedFromCity,
  selectedToCity,
  departureDate,
  isLoading,
  flightNumber,
}) => {
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString); // Create a Date object
    const hours = dateTime.getHours().toString().padStart(2, "0"); // Add leading zero if needed
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`; // Format as "HH:MM"
  };

  //const slicedResults = flightData.slice(0, 7); // Slice the array to first 6 elements

  console.log(departureDate);
  return (
    <div className={styles.searchResultsContainer}>
      {isLoading ? (
        <p>Searching for flights...</p>
      ) : flightData.length > 0 ? (
        <div className={styles.flightResultRow}>
          {flightData.length > 0 ? (
            flightData.map((flight) => (
              <Card
                key={flight.id}
                title={
                  <span className={styles.cardTitle}>{`${flight.id}`}</span>
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
                    Departure Time: {formatDateTime(flight.departureTime)}
                  </p>
                  <p className={styles.flightTime}>
                    <ArrowRightOutlined />
                    Arrival Time: {formatDateTime(flight.arrivalTime)}
                  </p>
                  <p className={styles.price}>Price: $ {flight.economyFare}</p>
                  <a href="#" className={styles.bookNowButton}>
                    Book Now
                  </a>
                </div>
              </Card>
            ))
          ) : (
            <p>No flights found for your selected criteria.</p>
          )}
        </div>
      ) : (
        <p>No previous search results.</p>
      )}
    </div>
  );
};

export default FlightSearchResults;
