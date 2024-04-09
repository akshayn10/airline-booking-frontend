import React, {useState} from "react";
import {Card,Row,Col, Divider, Pagination} from "antd";
import "./AdminFlightReport.css"

function AdminFlightReport(){
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(1);
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const startIndex1 = (currentPage1 - 1) * pageSize;
    const endIndex1 = startIndex1 + pageSize;


    const flightDetails = [
        {id: 1, model: 'Airbus', totalSeat: 200, depLocation: 'Colombo', depTime: '17:30', arrivalLocation: 'Sarjah', arrivalTime: '23:45'},
        {id: 2, model: 'Boeing', totalSeat: 180, depLocation: 'London', depTime: '08:00', arrivalLocation: 'New York', arrivalTime: '13:45'},
        {id: 3, model: 'Airbus', totalSeat: 250, depLocation: 'Paris', depTime: '12:15', arrivalLocation: 'Dubai', arrivalTime: '19:30'},
        {id: 4, model: 'Boeing', totalSeat: 220, depLocation: 'Tokyo', depTime: '21:00', arrivalLocation: 'Sydney', arrivalTime: '08:30'},
        {id: 5, model: 'Airbus', totalSeat: 190, depLocation: 'New Delhi', depTime: '06:45', arrivalLocation: 'Singapore', arrivalTime: '12:00'},
        {id: 6, model: 'Boeing', totalSeat: 210, depLocation: 'Los Angeles', depTime: '14:20', arrivalLocation: 'London', arrivalTime: '21:00'},
        {id: 7, model: 'Airbus', totalSeat: 220, depLocation: 'Singapore', depTime: '09:30', arrivalLocation: 'Beijing', arrivalTime: '15:45'},
        {id: 8, model: 'Boeing', totalSeat: 180, depLocation: 'Moscow', depTime: '18:00', arrivalLocation: 'Dubai', arrivalTime: '23:15'},
        {id: 9, model: 'Airbus', totalSeat: 210, depLocation: 'Sydney', depTime: '23:55', arrivalLocation: 'Paris', arrivalTime: '08:30'},
        {id: 10, model: 'Boeing', totalSeat: 230, depLocation: 'New York', depTime: '10:30', arrivalLocation: 'Tokyo', arrivalTime: '19:45'},
        {id: 11, model: 'Airbus', totalSeat: 240, depLocation: 'Dubai', depTime: '14:10', arrivalLocation: 'Los Angeles', arrivalTime: '20:55'},
        {id: 12, model: 'Boeing', totalSeat: 200, depLocation: 'Beijing', depTime: '07:20', arrivalLocation: 'Colombo', arrivalTime: '13:45'},
        {id: 13, model: 'Airbus', totalSeat: 220, depLocation: 'London', depTime: '19:45', arrivalLocation: 'New Delhi', arrivalTime: '02:00'},
        {id: 14, model: 'Boeing', totalSeat: 190, depLocation: 'Tokyo', depTime: '13:00', arrivalLocation: 'Moscow', arrivalTime: '20:30'},
        {id: 15, model: 'Airbus', totalSeat: 180, depLocation: 'Los Angeles', depTime: '22:10', arrivalLocation: 'Sydney', arrivalTime: '05:30'}
    ];

    const passengerDetails = [
        {passportNo: 1, name: 'Peter', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 2, name: 'John', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 3, name: 'Alice', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 4, name: 'Emily', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 5, name: 'Michael', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 6, name: 'Sophia', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 7, name: 'Jacob', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 8, name: 'Emma', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 9, name: 'William', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 10, name: 'Olivia', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 11, name: 'James', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 12, name: 'Ava', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 13, name: 'Matthew', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 14, name: 'Isabella', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'},
        {passportNo: 15, name: 'Alexander', Date: '12.05.2023', departure: 'Dubai', arrival: 'London', meal: 'Veg'}
    ];

    const visiblePassengers = passengerDetails.slice(startIndex1, endIndex1);
    const visibleFlights = flightDetails.slice(startIndex, endIndex);

    const flightDataItems =visibleFlights.map(detail =>
            <Row>
                <Col span={3}>{detail.id}</Col>
                <Col span={3}>{detail.model}</Col>
                <Col span={3}>{detail.totalSeat}</Col>
                <Col span={3}>{detail.depLocation}</Col>
                <Col span={3}>{detail.depTime}</Col>
                <Col span={3}>{detail.arrivalLocation}</Col>
                <Col>{detail.arrivalTime}</Col>
                <Divider></Divider>
            </Row>
        );

    const passengerDataItems = visiblePassengers.map(detail =>
        <Row>
        <Col span={3}>{detail.passportNo}</Col>
        <Col span={3}>{detail.name}</Col>
        <Col span={3}>{detail.Date}</Col>
        <Col span={3}>{detail.departure}</Col>
        <Col span={3}>{detail.arrival}</Col>
        <Col span={3}>{detail.meal}</Col>
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
                            <h3>Model</h3>
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
                            <h3>Passport No</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Name</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Departure</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Arrival</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Date</h3>
                        </Col>
                        <Col>
                            <h3>Meal</h3>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Divider></Divider>
                    {passengerDataItems}
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