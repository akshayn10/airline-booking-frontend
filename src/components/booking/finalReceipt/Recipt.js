import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row, Divider, Button, QRCode } from "antd";
import "./Recipt.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "../../../config/Axios";
import { useLocation } from "react-router-dom";

function Recipt() {
  const today = new Date();

  const [booking, setBooking] = useState([]);
  // const [flight, setFlight] = useState([]);

  const location = useLocation();
  const passingData = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingId = localStorage.getItem("bookingId");
        if(!bookingId) return;
        const response = await axios.get(
          `http://localhost:8080/booking/${parseInt(bookingId)}`
        );
        // const response1 = await axios.get(`http://localhost:8080/booking/getPassengers/${passingData.bookingId}`);
        // setFlight(response.data);
        setBooking(response.data);
        localStorage.removeItem("bookingId");
      } catch (error) {
        console.error("Error fetching passengers", error);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("downloaded-file.pdf");
    });
  };

  return (
    <div className="payment-details-container">
      <div className="recipt-body">
        <Col>
          <Card
            id="pdf-content"
            hoverable
            style={{ width: "1200px", border: "5px" }}
          >
            <h1>Recipt</h1>
            <p>
              Your booking has confirmed. Thank you for choosing Air Canada.
              <br></br>
              <b>Please bring your receipt to the airport.</b>
            </p>
            <p></p>
            <h2>
              Main Contact Information <span class="tab"></span> Booking
              Reference : {passingData.bookingId}
            </h2>
            <Divider className="custom-divider" />
            <Row>
              <Col span={15}>
                <h3>
                  Name <span class="nameTab"></span>: {booking?.user?.firstName}{" "}
                  - {booking?.user?.lastName} <br></br> Email{" "}
                  <span class="nameTab"></span>:{booking?.user?.firstName}{" "}
                  <br></br> Purchased tickets <span class="nameTab1"></span>:{" "}
                  {booking?.passengers?.length > 0 ? booking?.passengers?.length : "Loading..."}
                </h3>
              </Col>
              <Col>
                <Card hoverable style={{ color: "#eeeee4" }}>
                  <h3 style={{ color: "#fe0141" }}>Customer Care</h3>
                  <h4 style={{ color: "#181818" }}>
                    Air Arabia Reservations <br></br>
                    1-888-248-2256<br></br>
                  </h4>
                  <h4 style={{ color: "#181818" }}>
                    Air Arabia Flight information <br></br>
                    1-888-248-2256<br></br>
                  </h4>
                  <a href="https://www.airarabia.com/en">
                    Click here for more info
                  </a>
                </Card>
              </Col>
            </Row>
            <h3>
              Date -- {today.getDay()} : {today.getMonth()} :{" "}
              {today.getFullYear()}
            </h3>
            <h3>
              Time -- {today.getHours()} : {today.getMinutes()}
            </h3>
            <h2 className="heading">Flight details</h2> <Divider />
            <Card hoverable>
              <Row>
                <Col span={4}>
                  <h3>Aircraft Id</h3>
                </Col>
                <Col span={4}>
                  <h3>Aircraft model</h3>
                </Col>
                <Col span={4}>
                  <h3>Departure time</h3>
                </Col>
                <Col span={4}>
                  <h3>Departure</h3>
                </Col>
                <Col span={4}>
                  <h3>Arrival Time</h3>
                </Col>
                <Col>
                  <h3>Arrival</h3>
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <p>{booking?.flight?.id}</p>
                </Col>
                <Col span={4}>
                  <p>{booking?.flight?.fleet?.model}</p>
                </Col>
                <Col span={4}>
                  <p>{booking?.flight?.departureTime}</p>
                </Col>
                <Col span={4}>
                  <p>{booking?.flight?.departureLocation?.airportName}</p>
                </Col>
                <Col span={4}>
                  <p>{booking?.flight?.arrivalTime}</p>
                </Col>
                <Col>
                  <p>{booking?.flight?.arrivalLocation?.airportName}</p>
                </Col>
              </Row>
            </Card>
            <h2 className="heading">Passenger Information</h2> <Divider />
            <Card hoverable>
              {booking?.passengers &&
                booking?.passengers.map((passenger) => (
                  <div>
                    <h3 className="passenger">
                      Passenger {passenger.firstName}
                    </h3>

                    <Row>
                      <Col span={7}>
                        <h3>
                          Name <span class="nameTab"></span>:{" "}
                          {passenger.firstName}
                        </h3>
                      </Col>
                      <Col span={7}>
                        <h3>
                          Last Name <span class="nameTab"></span>:{" "}
                          {passenger.lastName}
                        </h3>
                      </Col>
                      <Col span={7}>
                        <h3>
                          Date of birth <span class="nameTab"></span>:{" "}
                          {passenger.dateOfBirth}
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={7}>
                        <h3>
                          Meal <span class="nameTab"></span>:{" "}
                          {passenger.mealPreference}
                        </h3>
                      </Col>
                      <Col span={7}>
                        <h3>
                          Passport no <span class="nameTab"></span>:{" "}
                          {passenger.passportNo}
                        </h3>
                      </Col>
                      <Col span={7}>
                        <h3>
                          Gender <span class="nameTab"></span>:{" "}
                          {passenger.gender}
                        </h3>
                      </Col>
                    </Row>
                  </div>
                ))}
            </Card>
            <QRCode type="canvas" value="https://www.airarabia.com/en" />
            <h2 className="heading">
              <span class="nameTab"></span>Please Bring the printed recipt to
              Airport
            </h2>
          </Card>
          <Row>
            <Button
              type="primary"
              onClick={downloadPDF}
              danger
              style={{ width: "200px" }}
            >
              Print Recipt
            </Button>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default Recipt;
