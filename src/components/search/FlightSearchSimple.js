import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Select, DatePicker, Button, Space, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FlightSearchAdvanced from "./FlightSearchAdvanced";
import FlightSearchResults from "./FlightSearchResults"; // Import FlightSearchResults
import { GetFlightLocations } from "../../redux/actions/SearchAction";
import "./FlightSearch.css";
import background from "/home/shashimal/Desktop/airline-booking-frontend/src/assets/images/searchBackground.png";

const styles = {
  width: "100%", // Set width and height as needed
  height: "100vh",
  backgroundImage: `url(${background})`,
  backgroundPosition: "center", // Adjust as needed (e.g., 'center top')
  backgroundSize: "cover", // Adjust as needed (e.g., 'contain', 'auto')
  backgroundRepeat: "no-repeat", // Adjust as needed
  backgroundAttachment: "fixed",
};

const FlightSearchSimple = () => {
  const dispatch = useDispatch();
  const cities = useSelector(
    (state) => state.flightLocationsReducer.flightLocations
  );

  const [selectedFromCity, setSelectedFromCity] = useState(cities[0]); // Initialize with first city
  const [selectedToCity, setSelectedToCity] = useState(cities[1]); // Initialize with second city
  const [departureDate, setDepartureDate] = useState("");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false); // State for advanced search visibility
  const [flightResults, setFlightResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    dispatch(GetFlightLocations());
  }, [dispatch]);

  const toggleAdvancedSearch = () => {
    setFlightResults([]);
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
    setFlightResults([]);
    // Basic validation for empty fields
    if (!selectedFromCity || !selectedToCity || !departureDate) {
      message.error(
        "Please fill in all required fields (From City, To City, Departure Date) to search for flights."
      );
      return;
    }

    setIsLoading(true); // Set loading indicator

    try {
      const results = await fetchFlights(
        selectedFromCity,
        selectedToCity,
        departureDate
      );
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
    <div style={styles}>
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
                  className="reduced-width-input"
                  required
                  validationStatus={!selectedFromCity && "error"}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={selectedFromCity}
                    filterOption={(inputValue, option) =>
                      option.children
                        .join("")
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                    onChange={(value) => setSelectedFromCity(value)}
                  >
                    {cities.map((city) => (
                      <Select.Option key={city.id} value={city.id}>
                        {city.cityName} ({city.code}) - {city.country} - (
                        {city.airportName})
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="To City"
                  className="reduced-width-input"
                  required
                  validationStatus={!selectedToCity && "error"}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={selectedToCity}
                    filterOption={(inputValue, option) =>
                      option.children
                        .join("")
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                    onChange={(value) => setSelectedToCity(value)}
                  >
                    {cities.map((city) => (
                      <Select.Option key={city.id} value={city.id}>
                        {city.cityName} ({city.code}) - {city.country} - (
                        {city.airportName})
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Departure Date"
                  className="reduced-width-input"
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
              {isLoading && (
                <p>
                  <div className={styles.spinnerContainer}>
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 200,
                          }}
                          spin
                        />
                      }
                    />
                  </div>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {flightResults.length > 0 && !isLoading && (
        <FlightSearchResults flightResults={flightResults} />
      )}
    </div>
  );
};

export default FlightSearchSimple;
