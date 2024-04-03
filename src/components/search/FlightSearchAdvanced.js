import React, { useState } from "react";
import "./FlightSearch.css";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  TimePicker,
  Button,
  Space,
} from "antd";

const FlightSearchAdvanced = () => {
  const [cities, setCities] = useState({ fromCity: "", toCity: "" });
  const [flightNumber, setFlightNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [travelClass, setTravelClass] = useState("economy"); // Default class
  const [tripType, setTripType] = useState("roundTrip"); // Default trip type

  const handleSearch = () => {
    // Handle advanced search logic here
    console.log(
      "Advanced Search:",
      cities,
      flightNumber,
      selectedDate,
      selectedTime,
      travelClass,
      tripType
    );
  };

  return (
    <div className="flight-search-advanced">
      <Form layout="vertical" justify="center" align="middle">
        <Form.Item label="From City" className="label">
          <Input.Group>
            <Input
              placeholder="Origin"
              value={cities.fromCity}
              onChange={(e) =>
                setCities({ ...cities, fromCity: e.target.value })
              }
              className="reduced-width-input"
            />
            <Input
              placeholder="Destination"
              value={cities.toCity}
              onChange={(e) => setCities({ ...cities, toCity: e.target.value })}
              className="reduced-width-input"
            />
          </Input.Group>
        </Form.Item>
        <Form.Item label="Flight Number (Optional)" className="label">
          <Input
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="reduced-width-input"
          />
        </Form.Item>
        <Form.Item label="Date and Time" className="label">
          <Space size={8}>
            {" "}
            {/* Add spacing between buttons */}
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
            <TimePicker
              value={selectedTime}
              onChange={(time) => setSelectedTime(time)}
            />
          </Space>
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
                backgroundColor: travelClass === "economy" ? "green" : "white",
              }}
            >
              Economy
            </Radio.Button>
            <Radio.Button
              value="business"
              style={{
                backgroundColor: travelClass === "business" ? "green" : "white",
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
                backgroundColor: tripType === "roundTrip" ? "green" : "white",
              }}
            >
              Round Trip
            </Radio.Button>
            <Radio.Button
              value="oneWay"
              style={{
                backgroundColor: tripType === "oneWay" ? "green" : "white",
              }}
            >
              One Way
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            Search Advanced Flights
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FlightSearchAdvanced;
