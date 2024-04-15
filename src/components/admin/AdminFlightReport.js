import React, {useEffect, useState} from "react";
import {Card,Row,Col, Divider, Pagination} from "antd";
import "./AdminFlightReport.css"
import axios from "axios";

function AdminFlightReport(){
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(1);
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const startIndex1 = (currentPage1 - 1) * pageSize;
    const endIndex1 = startIndex1 + pageSize;

    const [flightDetails, setFlightDetails] = useState([]);
    const [passengerDetails, setPassengerDetails] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/admin/flight');
                const response1 = await axios.get('http://localhost:8080/passenger/getAllPassengers');
                console.log('Flight Details:', response.data);
                console.log('Passenger Details:', response1.data);
                setFlightDetails(response.data);
                setPassengerDetails(response1.data);
            } catch (error) {
                console.error('Error fetching Flights', error);
            }
        };
        fetchData();
    }, []);


    const visibleBooking = passengerDetails.slice(startIndex1, endIndex1);
    const visibleFlights = flightDetails.slice(startIndex, endIndex);

    const flightDataItems =visibleFlights.map(detail =>
            <Row>
                <Col span={3}>{detail.id}</Col>
                <Col span={3}>{detail.remainingEconomySeats}</Col>
                <Col span={3}>{detail.remainingPremiumSeats}</Col>
                <Col span={3}>{detail.remainingBusinessSeats}</Col>
                <Col span={3}>{detail.departureLocation}</Col>
                <Col span={3}>{detail.departureTime}</Col>
                <Col span={3}>{detail.arrivalLocation}</Col>
                <Col>{detail.arrivalTime}</Col>
                <Divider></Divider>
            </Row>
        );

    const bookingDataItems = visibleBooking.map(passenger =>
        <Row>

        <Col span={3}>{passenger.id}</Col>
        <Col span={3}>{passenger.firstName}</Col>
        <Col span={3}>{passenger.lastName}</Col>
        <Col span={3}>{passenger.passportNo}</Col>
        <Col span={3}>{passenger.mealPreference}</Col>
        <Col span={3}>{passenger.booking.bookingId}</Col>
        <Col span={3}>{passenger.booking.seatTypeBooked}</Col>
        <Col>{passenger.booking.travelDate}</Col>
        <Divider></Divider>
    </Row>
        );


    const onPageChange = (page) => {
            setCurrentPage(page);
        };

        const onPageChange1 = (page) => {
            setCurrentPage1(page);
        };
    
    return(
        <div className="adminReportcontainer">
            <Col>
                <Row>
                <Card hoverable style={{width:"1800px"}}>
                <h1 className="h1">Flight Report</h1>
                    <Row>
                        <Col span={3}>
                            <h3>Flight Id</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Total seat</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Total seat</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Total seat</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Departure Location</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Departure time</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Arrival Location</h3>
                        </Col>
                        <Col>
                            <h3>Arrived time</h3>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Divider></Divider>
                    {flightDataItems}
                    <Pagination
                        style={{ marginTop: "20px" }}
                        current={currentPage}
                        pageSize={pageSize}
                        total={flightDetails.length}
                        onChange={onPageChange}
                    />
                </Card>
                </Row>
                <Row>
                <Card hoverable style={{width:"1800px"}}>
                <h1 className="h1">Passenger Report</h1>
                    <Row>
                        <Col span={3}>
                            <h3>Passenger Id</h3>
                        </Col>
                        <Col span={3}>
                            <h3>First Name</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Last Name</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Passport No</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Meal Preference</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Booking Id</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Seat type</h3>
                        </Col>
                        <Col>
                            <h3>Travel date</h3>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Divider></Divider>
                    {bookingDataItems}
                    <Pagination
                        style={{ marginTop: "20px" }}
                        current={currentPage1}
                        pageSize={pageSize}
                        total={passengerDetails.length}
                        onChange={onPageChange1}
                    />
                </Card>
                </Row>
            </Col>
        </div>
    )
}

export default AdminFlightReport;