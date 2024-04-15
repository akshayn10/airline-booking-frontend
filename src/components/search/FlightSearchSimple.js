import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Select,
  DatePicker,
  Button,
  Space,
  message,
  Spin,
  Radio,
  Input,
  TimePicker,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import FlightSearchResults from "./FlightSearchResults"; // Import FlightSearchResults
import {
  GetFlightLocations,
  GetFlights,
} from "../../redux/actions/SearchAction";
import "./FlightSearch.css";
import background from "/home/shashimal/Desktop/airline-booking-frontend/src/assets/images/searchBackground.png";
import { searchSimpleFlights } from "../../redux/actions/SearchAction";
import dayjs from "dayjs";

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

  const flightData = useSelector((state) => state.searchFlightsReducer.flights);

  const [selectedFromCity, setSelectedFromCity] = useState(cities[0]); // Initialize with first city
  const [selectedToCity, setSelectedToCity] = useState(cities[1]); // Initialize with second city
  const [departureDate, setDepartureDate] = useState("");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false); // State for advanced search visibility

  const [flightNumber, setFlightNumber] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [travelClass, setTravelClass] = useState("economy"); // Default class
  const [tripType, setTripType] = useState("roundTrip"); // Default trip type
  const [numPassengers, setNumPassengers] = useState(1); // Default number of passengers

  const [flightResults, setFlightResults] = useState([]); // State for search results

  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const format = "HH:mm";

  const [buttonText, setButtonText] = useState("Advanced Search");

  useEffect(() => {
    dispatch(GetFlightLocations());
  }, []);

  const toggleAdvancedSearch = () => {
    if (!isAdvancedSearchOpen) {
      setButtonText("Close Advanced Search");
    } else {
      setButtonText("Advanced Search");
    }

    setFlightResults([]);
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen); // Toggle advanced search visibility
    setFlightResults([]);
  };

  const simpleSearchFlights = async (fromCity, toCity) => {
    const arg = { fromCity: fromCity, toCity: toCity };
    dispatch(searchSimpleFlights(arg));
  };

  const handleSearch = async () => {
    setFlightResults([]);
    // Basic validation for empty fields
    if (!selectedFromCity || !selectedToCity || !departureDate) {
      message.error(
        "Please fill in all required fields (From City, To City, Departure Date) to search for flights."
      );
      return;
    } else if (selectedFromCity === selectedToCity) {
      message.error("From City and To City cannot be same.");
      return;
    }

    setIsLoading(true); // Set loading indicator

    try {
      const results = await simpleSearchFlights(
        selectedFromCity, //101,102
        selectedToCity,
        flightNumber
      );

      if (!isAdvancedSearchOpen) {
        const filteredFlights = flightData.filter(
          (flight) =>
            flight.departureLocation === selectedFromCity &&
            flight.arrivalLocation === selectedToCity //&&
          //flight.departureTime == departureDate
        );
        setFlightResults(filteredFlights); // Set filtered results
      } else {
        const filteredFlights = flightData.filter(
          (flight) =>
            flight.departureLocation === selectedFromCity &&
            flight.arrivalLocation === selectedToCity &&
            flight.id == flightNumber
        );
        setFlightResults(filteredFlights); // Set filtered results
      }
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
                    {buttonText}
                  </Button>
                </Space>

                {isAdvancedSearchOpen && (
                  <>
                    <Form.Item label="Flight Number & Time" className="label">
                      {" "}
                      {/* Label change */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Input
                          value={flightNumber}
                          onChange={(e) => setFlightNumber(e.target.value)}
                          className="reduced-width-input"
                          style={{ width: "calc(50% - 10px)" }}
                        />
                        <TimePicker
                          value={selectedTime}
                          defaultValue={dayjs("00:00", format)}
                          format={format}
                          onChange={(time) => setSelectedTime(time)}
                          style={{ width: "calc(50% - 10px)" }}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item label="Class" className="label">
                      <Radio.Group
                        buttonStyle="solid"
                        value={travelClass}
                        onChange={(e) => setTravelClass(e.target.value)}
                      >
                        {/* Modified Radio Buttons with custom style */}
                        <Radio.Button
                          value="economy"
                          style={{
                            backgroundColor:
                              travelClass === "economy" ? "green" : "white",
                          }}
                        >
                          Economy
                        </Radio.Button>
                        <Radio.Button
                          value="business"
                          style={{
                            backgroundColor:
                              travelClass === "business" ? "green" : "white",
                          }}
                        >
                          Business
                        </Radio.Button>
                        <Radio.Button
                          value="firstClass"
                          style={{
                            backgroundColor:
                              travelClass === "firstClass" ? "green" : "white",
                          }}
                        >
                          First Class
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Trip Type" className="label">
                      <Radio.Group
                        buttonStyle="solid"
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value)}
                      >
                        <Radio.Button
                          value="roundTrip"
                          style={{
                            backgroundColor:
                              tripType === "roundTrip" ? "green" : "white",
                          }}
                        >
                          Round Trip
                        </Radio.Button>
                        <Radio.Button
                          value="oneWay"
                          style={{
                            backgroundColor:
                              tripType === "oneWay" ? "green" : "white",
                          }}
                        >
                          One Way
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Number of Passengers" className="label">
                      <Radio.Group
                        buttonStyle="solid"
                        value={numPassengers}
                        onChange={(e) => setNumPassengers(e.target.value)}
                      >
                        {/* Modified Radio Buttons with custom style */}
                        <Radio.Button
                          value={1}
                          style={{
                            backgroundColor:
                              numPassengers === 1 ? "green" : "white",
                          }}
                        >
                          1
                        </Radio.Button>
                        <Radio.Button
                          value={2}
                          style={{
                            backgroundColor:
                              numPassengers === 2 ? "green" : "white",
                          }}
                        >
                          2
                        </Radio.Button>
                        <Radio.Button
                          value={3}
                          style={{
                            backgroundColor:
                              numPassengers === 3 ? "green" : "white",
                          }}
                        >
                          3
                        </Radio.Button>
                        <Radio.Button
                          value={4}
                          style={{
                            backgroundColor:
                              numPassengers === 4 ? "green" : "white",
                          }}
                        >
                          4
                        </Radio.Button>
                        <Radio.Button
                          value={5}
                          style={{
                            backgroundColor:
                              numPassengers === 5 ? "green" : "white",
                          }}
                        >
                          5
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" onClick={handleSearch}>
                        Search Advanced Flights
                      </Button>
                    </Form.Item>
                  </>
                )}
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
        </div>
      </div>

      {flightData.length > 0 && !isLoading && (
        <FlightSearchResults
          flightData={flightResults}
          selectedFromCity={selectedFromCity}
          selectedToCity={selectedToCity}
          departureDate={departureDate}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default FlightSearchSimple;
