import React, {useEffect, useState} from "react";
import {Card,Row,Col, Divider, Pagination} from "antd";
import "./AdminFlightReport.css"
import axios from "../../config/Axios";
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AdminFlightReport(){
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(1);
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const startIndex1 = (currentPage1 - 1) * pageSize;
    const endIndex1 = startIndex1 + pageSize;

    const [flightDetails, setFlightDetails] = useState([]);
    const [bookedSeatsWithFlightId, setBookedSeatsWithFlightId] = useState([]);
    const [fleetDetail, setFleetDetail] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/admin/flight');
                const response1 = await axios.get('http://localhost:8080/booking/getBookedSeat');
                const response2 = await axios.get('http://localhost:8080/v1/admin/fleet');
                console.log('Flight Details:', response.data);
                console.log('Passenger Details:', response1.data);
                setFlightDetails(response.data);
                setBookedSeatsWithFlightId(response1.data);
                setFleetDetail(response2.data);

            } catch (error) {
                console.error('Error fetching Flights', error);
            }
        };
        fetchData();
    }, []);


    const visibleBooking = bookedSeatsWithFlightId.slice(startIndex1, endIndex1);
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

    const bookingDataItems = visibleBooking.map(flight =>
        <Row>

        <Col span={4}>{flight.flightId}</Col>
        <Col span={5}>{flight.economySeats}</Col>
        <Col span={5}>{flight.businessSeats}</Col>
        <Col span={6}>{flight.premiumSeats}</Col>
        <Divider></Divider>
    </Row>
        );


    const onPageChange = (page) => {
            setCurrentPage(page);
        };

        const onPageChange1 = (page) => {
            setCurrentPage1(page);
        };


            const ecoChart = {
                animationEnabled: true,
                exportEnabled: true,
                theme: "dark2", // "light1", "dark1", "dark2"
                title:{
                    text: "Total Economy Seats"
                },
                data: [{
                    type: "pie",
                    indexLabel: "{label}",		
                    startAngle: -90,
                    dataPoints: fleetDetail.map(item => ({
                        y: item.totalEconomySeats,
                        label: item.model
                    }))
                }]
            }

            const businessChart = {
                animationEnabled: true,
                exportEnabled: true,
                theme: "dark2", // "light1", "dark1", "dark2"
                title:{
                    text: "Total Business Seats"
                },
                data: [{
                    type: "pie",
                    indexLabel: "{label}",		
                    startAngle: -90,
                    dataPoints: fleetDetail.map(item => ({
                        y: item.totalBusinessSeats,
                        label: item.model
                    }))
                }]
            }

            const premiumChart = {
                animationEnabled: true,
                exportEnabled: true,
                theme: "dark2", // "light1", "dark1", "dark2"
                title:{
                    text: "Total Premium Seats"
                },
                data: [{
                    type: "pie",
                    indexLabel: "{label}",		
                    startAngle: -90,
                    dataPoints: fleetDetail.map(item => ({
                        y: item.totalPremiumSeats,
                        label: item.model
                    }))
                }]
            }

    
    return(
        <div className="adminReportcontainer">
            <Col>
                <Row>
                <Card hoverable style={{width:"1800px"}}>
                <h1 className="h1">Flight Details</h1>
                    <Row>
                        <Col span={3}>
                            <h3>Flight Id</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Total Economy seat</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Total Premium seat</h3>
                        </Col>
                        <Col span={3}>
                            <h3>Total Business seat</h3>
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
                <h1 className="h1">Available Seat Details</h1>
                    <Row>
                        <Col span={3}>
                            <h3>Flight Id</h3>
                        </Col>
                        <Col span={5}>
                            <h3>Remaining Economy Seats</h3>
                        </Col>
                        <Col span={5}>
                            <h3>Remaining Business Seats</h3>
                        </Col>
                        <Col span={5}>
                            <h3>Remaining Premium Seats</h3>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Divider></Divider>
                    {bookingDataItems}
                    <Pagination
                        style={{ marginTop: "20px" }}
                        current={currentPage1}
                        pageSize={pageSize}
                        total={bookedSeatsWithFlightId.length}
                        onChange={onPageChange1}
                    />
                </Card>
                </Row>
            </Col>
            <div>
                <CanvasJSChart options = {ecoChart} />
                <Divider></Divider>
                        <Divider></Divider>
                <CanvasJSChart options = {businessChart} />
                <Divider></Divider>
                        <Divider></Divider>
                <CanvasJSChart options = {premiumChart} />
		</div>
        </div>
    )
}

export default AdminFlightReport;