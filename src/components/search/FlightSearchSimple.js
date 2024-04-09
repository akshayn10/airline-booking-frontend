import React, { useState } from "react";
import { Form, Select, DatePicker, Button, Space, message } from "antd";
import FlightSearchAdvanced from "./FlightSearchAdvanced";
import FlightSearchResults from "./FlightSearchResults"; // Import FlightSearchResults
import "./FlightSearch.css";

const FlightSearchSimple = () => {
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
  const [departureDate, setDepartureDate] = useState("");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false); // State for advanced search visibility
  const [flightResults, setFlightResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

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
            </div>
          )}
        </div>
        {isLoading && <p>Searching for flights...</p>}
        {flightResults.length > 0 && !isLoading && (
          <FlightSearchResults flightResults={flightResults} />
        )}
      </div>
    </div>
  );
};

export default FlightSearchSimple;
