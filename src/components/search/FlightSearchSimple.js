import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Space, message } from "antd";
import FlightSearchAdvanced from "./FlightSearchAdvanced";
import FlightSearchResults from "./FlightSearchResults"; // Import FlightSearchResults
import "./FlightSearch.css";

const FlightSearchSimple = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false); // State for advanced search visibility
  const [flightResults, setFlightResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen); // Toggle advanced search visibility
  };

  const fetchFlights = async (fromCity, toCity, departureDate) => {
    // Simulate API call with mock data (replace with your actual API logic)
    return new Promise((resolve) => setTimeout(() => resolve(mockData), 1000)); // Simulate API delay
  };

  const mockData = [
    {
      airline: "Airline A",
      flightNumber: "AA123",
      departureTime: "10:00",
      arrivalTime: "15:00",
      price: 250.0,
    },
    {
      airline: "Airline B",
      flightNumber: "BB456",
      departureTime: "12:00",
      arrivalTime: "17:00",
      price: 300.0,
    },
    {
      airline: "Airline A",
      flightNumber: "AA123",
      departureTime: "10:00",
      arrivalTime: "15:00",
      price: 250.0,
    },
    {
      airline: "Airline B",
      flightNumber: "BB456",
      departureTime: "12:00",
      arrivalTime: "17:00",
      price: 300.0,
    },
    {
      airline: "Airline A",
      flightNumber: "AA123",
      departureTime: "10:00",
      arrivalTime: "15:00",
      price: 250.0,
    },
    {
      airline: "Airline B",
      flightNumber: "BB456",
      departureTime: "12:00",
      arrivalTime: "17:00",
      price: 300.0,
    },
  ];

  const handleSearch = async () => {
    // Basic validation for empty fields
    if (!fromCity || !toCity || !departureDate) {
      message.error(
        "Please fill in all required fields (From City, To City, Departure Date) to search for flights."
      );
      return;
    }

    setIsLoading(true); // Set loading indicator

    try {
      const results = await fetchFlights(fromCity, toCity, departureDate);
      setFlightResults(results);
    } catch (error) {
      console.error("Error fetching flights:", error);
      message.error(
        "An error occurred while searching for flights. Please try again later."
      );
    } finally {
      setIsLoading(false); // Clear loading indicator
    }
  };

  return (
    <div class="background-image">
      <div className="flight-search-overlay">
        {/* Wrapper for potential styling (CSS not included here) */}

        <div className="flight-search-content">
          {isAdvancedSearchOpen ? (
            <FlightSearchAdvanced />
          ) : (
            <div className="flight-search-simple">
              <Form layout="vertical" justify="center" align="middle">
                <Form.Item
                  label="From City"
                  className="label"
                  required
                  validationStatus={!fromCity && "error"}
                >
                  <Input
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="reduced-width-input"
                  />
                </Form.Item>
                <Form.Item
                  label="To City"
                  className="label"
                  required
                  validationStatus={!toCity && "error"}
                >
                  <Input
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="reduced-width-input"
                  />
                </Form.Item>
                <Form.Item
                  label="Departure Date"
                  className="label"
                  required
                  validationStatus={!departureDate && "error"}
                >
                  <DatePicker
                    value={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    className="reduced-width-input"
                  />
                </Form.Item>
                <Form.Item>
                  <Space size={8}>
                    <Button
                      type="primary"
                      disabled={isAdvancedSearchOpen}
                      onClick={handleSearch}
                    >
                      Search Flights
                    </Button>
                    <Button type="primary" onClick={toggleAdvancedSearch}>
                      Advanced Search
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          )}
          {isLoading && <p>Searching for flights...</p>}
          {flightResults.length > 0 && !isLoading && (
            <FlightSearchResults flightResults={flightResults} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchSimple;
