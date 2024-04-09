import React, { useState } from "react";
import "./FlightSearch.css";
import FlightSearchResults from "./FlightSearchResults"; // Import FlightSearchResults
import {
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  TimePicker,
  Button,
  Space,
  message,
} from "antd";

const FlightSearchAdvanced = () => {
  const cities = [
    "Afghanistan - Kabul (KBL)",
    "Armenia - Yerevan (EVN)",
    "Azerbaijan - Baku (GYD)",
    "Bahrain - Baku (GYD)",
    "Bangladesh - Dhaka (DAC)",
    "Bangladesh - Chattogram (CGP)",
    "Belgium - Brussels - Zaventem (BRU)",
    "Belgium - Brussels South - Charleroi (CRL)",
    "Bosnia and Herzegovina - Sarajevo (SJJ)",
    "Egypt - Cairo (CAI)",
    "Egypt - Sohag (HMB)",
    "Egypt - Cairo Sphinx International Airport (SPX)",
    "Egypt - Alexandria - Borg El Arab (HBE)",
    "France - Toulouse (TLS)",
    "France - Bordeaux (BOD)",
    "France - Strasbourg (SXB)",
    "France - Lyon - St Exupery (LYS)",
    "France - Paris Charles de Gaulle (CDG)",
    "France - Montpellier (MPL)",
    "France - Nice (NCE)",
    "France - Marseille (MRS)",
    "Georgia - Tbilisi (TBS)",
    "Germany - Frankfurt–Hahn (HHN)",
    "Germany - Cologne (CGN)",
    "Germany - Dusseldorf - Weeze Airport (NRN)",
    "Greece - Athens (ATH)",
    "India - Delhi (DEL)",
    "India - Nagpur (NAG)",
    "India - Coimbatore (CJB)",
    "India - Mumbai (BOM)",
    "India - Hyderabad (HYD)",
    "India - Ahmedabad (AMD)",
    "India - Thiruvananthapuram (TRV)",
    "India - Bengaluru (BLR)",
    "India - Kolkata (CCU)",
    "India - Chennai (MAA)",
    "India - Kochi (COK)",
    "India - Goa (GOI)",
    "India - Jaipur (JAI)",
    "India - Kozhikode (CCJ)",
    "Iran - Mashhad (MHD)",
    "Iran - Shiraz (SYZ)",
    "Iran - Lar (LRR)",
    "Iran - Tehran (IKA)",
    "Iraq - Erbil (EBL)",
    "Iraq - Basra (BSR)",
    "Iraq - Baghdad (BGW)",
    "Iraq - Najaf (NJF)",
    "Italy - Naples (NAP)",
    "Italy - Milan - Bergamo (BGY)",
    "Italy - Venice (VCE)",
    "Italy - Pisa (PSA)",
    "Italy - Turin-Cuneo (CUF)",
    "Italy - Catania - Fontanarossa (CTA)",
    "Italy - Bologna (BLQ)",
    "Jordan - Amman (AMM)",
    "Kazakhstan - Almaty (ALA)",
    "Kenya - Nairobi (NBO)",
    "Kuwait - Kuwait (KWI)",
    "Kyrgyzstan - Osh Airport (OSS)",
    "Kyrgyzstan - Bishkek (FRU)",
    "Lebanon - Beirut (BEY)",
    "Malaysia - Kuala Lumpur (KUL)",
    "Morocco - Dakhla (VIL)",
    "Morocco - Tangier (TNG)",
    "Morocco - Agadir (AGA)",
    "Morocco - Oujda (OUD)",
    "Morocco - Fez (FEZ)",
    "Morocco - Tetuan (TTU)",
    "Morocco - Casablanca (CMN)",
    "Morocco - Marrakech - Menara (RAK)",
    "Morocco - Rabat (RBA)",
    "Morocco - Nador (NDR)",
    "Nepal - Kathmandu (KTM)",
    "Netherlands - Amsterdam - Schiphol (AMS)",
    "Oman - Muscat (MCT)",
    "Oman - Salalah (SLL)",
    "Oman - Sohar (OHS)",
    "Pakistan - Multan (MUX)",
    "Pakistan - Quetta (UET)",
    "Pakistan - Peshawar (PEW)",
    "Pakistan - Sialkot (SKT)",
    "Pakistan - Lahore (LHE)",
    "Pakistan - Faisalabad (LYP)",
    "Pakistan - Islamabad (ISB)",
    "Pakistan - Karachi (KHI)",
    "Poland - Krakow (KRK)",
    "Qatar - Doha (DOH)",
    "Russia - Moscow - Domodedovo (DME)",
    "Russia - Yekaterinburg (SVX)",
    "Russia - Kazan (KZN)",
    "Russia - St. Petersburg (LED)",
    "Russia - Ufa (UFA)",
    "Russia - Samara - Kurumoch (KUF)",
    "Saudi Arabia - ​Al - Jouf (AJF)",
    "Saudi Arabia - ​Hail (HAS)",
    "Saudi Arabia - ​Jeddah (JED)",
    "Saudi Arabia - ​Medinah (MED)",
    "Saudi Arabia - ​Riyadh (RUH)",
    "Saudi Arabia - ​Gassim (ELQ)",
    "Saudi Arabia - ​Tabuk (TUU)",
    "Saudi Arabia - ​Dammam (DMM)",
    "Saudi Arabia - ​Taif (TIF)",
    "Saudi Arabia - ​Yanbu (YNB)",
    "Saudi Arabia - ​Jizan (GIZ)",
    "Saudi Arabia - ​Abha (AHB)",
    "Somaliland - Hargeisa (HGA)",
    "Spain - Malaga (AGP)",
    "Spain - Madrid - Barajas (MAD)",
    "Spain - Murcia (RMU)",
    "Spain - Bilbao (BIO)",
    "Spain - Barcelona (BCN)",
    "Spain - Palma de Mallorca (PMI)",
    "Sri Lanka - Colombo (CMB)",
    "Sudan - Khartoum (KRT)",
    "Switzerland - Basel - Mulhouse (BSL)",
    "Switzerland - Geneva (GVA)",
    "Thailand - Bangkok (BKK)",
    "Thailand - Phuket (HKT)",
    "Turkey - Istanbul Airport (IST)",
    "Turkey - Trabzon (TZX)",
    "Turkey - Istanbul - S.Gokcen (SAW)",
    "Turkey - Antalya (AYT)",
    "Uganda - Entebbe (EBB)",
    "United Arab Emirates - Ras Al Khaimah (RKT)",
    "Uzbekistan - Tashkent (TAS)",
    "United Arab Emirates - Abu Dhabi (AUH)",
    "United Arab Emirates - Sharjah (SHJ)",
    "United Kingdom - London - Gatwick (LGW)",
    "Uzbekistan - Namangan (NMA)",
  ]; // Dummy city options
  const [selectedFromCity, setSelectedFromCity] = useState(cities[0]); // Initialize with first city
  const [selectedToCity, setSelectedToCity] = useState(cities[1]); // Initialize with second city
  const [flightNumber, setFlightNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [travelClass, setTravelClass] = useState("economy"); // Default class
  const [tripType, setTripType] = useState("roundTrip"); // Default trip type
  const [numPassengers, setNumPassengers] = useState(1); // Default number of passengers
  const [flightResults, setFlightResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const fetchFlights = async (cities, selectedDate) => {
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
  ];

  const handleSearch = async () => {
    // Handle advanced search logic here
    setFlightResults([]);

    if (
      !selectedFromCity ||
      !selectedToCity ||
      !selectedDate ||
      !selectedTime ||
      !travelClass ||
      !tripType ||
      !numPassengers
    ) {
      message.error(
        "Please fill in all required fields (Cities, Date, Time) to advance search for flights."
      );
      return;
    }

    setIsLoading(true); // Set loading indicator

    try {
      const results = await fetchFlights(
        selectedFromCity,
        selectedToCity,
        selectedDate
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
    <div className="flight-search-overlay">
      <div className="flight-search-content">
        <div className="flight-search-advanced">
          <Form layout="vertical" justify="center" align="middle">
            <Form.Item className="label">
              <Form.Item
                label="From City"
                className="reduced-width-input"
                required
                validationStatus={!selectedFromCity && "error"}
              >
                <Select
                  value={selectedFromCity}
                  onChange={(value) => setSelectedFromCity(value)}
                >
                  {cities.map((city) => (
                    <Select.Option key={city} value={city}>
                      {city}
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
                  value={selectedToCity}
                  onChange={(value) => setSelectedToCity(value)}
                >
                  {cities.map((city) => (
                    <Select.Option key={city} value={city}>
                      {city}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
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
                    backgroundColor: tripType === "oneWay" ? "green" : "white",
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
                    backgroundColor: numPassengers === 1 ? "green" : "white",
                  }}
                >
                  1
                </Radio.Button>
                <Radio.Button
                  value={2}
                  style={{
                    backgroundColor: numPassengers === 2 ? "green" : "white",
                  }}
                >
                  2
                </Radio.Button>
                <Radio.Button
                  value={3}
                  style={{
                    backgroundColor: numPassengers === 3 ? "green" : "white",
                  }}
                >
                  3
                </Radio.Button>
                <Radio.Button
                  value={4}
                  style={{
                    backgroundColor: numPassengers === 4 ? "green" : "white",
                  }}
                >
                  4
                </Radio.Button>
                <Radio.Button
                  value={5}
                  style={{
                    backgroundColor: numPassengers === 5 ? "green" : "white",
                  }}
                >
                  5
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Space size={8}>
                <Button type="primary" onClick={handleSearch}>
                  Search Advanced Flights
                </Button>
                <Button type="primary" onClick={() => {}}>
                  Go Back
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
      {isLoading && <p>Searching for flights...</p>}

      {flightResults.length > 0 && !isLoading && (
        <FlightSearchResults flightResults={flightResults} />
      )}
    </div>
  );
};

export default FlightSearchAdvanced;
