import React, {useRef} from "react";
import { Card,Col,Row,Divider,Button,QRCode} from "antd";
import "./Recipt.css"
import  html2pdf  from 'html2pdf.js';

function Recipt(){
    const noOfPassengers = 5;
    const unitPrice = 15000;
    const ticketCost = noOfPassengers*unitPrice;

    const totalPassengers= Array.from({ length: noOfPassengers }, (_, index) => index + 1);
    const today =new Date();

    const reciptRef = useRef(null);

    const downloadPDF = () => {
        const opt = {
            margin: 1,
            filename: 'receipt.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(reciptRef.current).set(opt).save();
    };
    
    return(
        <div className="payment-details-container" ref={reciptRef}>
            <Col span={10}>
                        <Card hoverable style={{width:'1200px',border:'5px'}}>
                        <h1>Recipt</h1>
                        <p>Your booking has confirmed. Thank you for choosing Air Canada.<br></br><b>Please bring your receipt to the airport.</b></p>
                        <p></p>
                        <h2>Main Contact Information <span class="tab"></span> Booking Reference :52546589</h2>
                        <Divider className="custom-divider" />
                            <Row>
                                <Col span={15}>
                                <h3>Name <span class="nameTab"></span>: John <br></br> Email <span class="nameTab"></span>: John@123.com <br></br> Purchased tickets <span class="nameTab1"></span>: 10</h3>
                            </Col>
                            <Col>
                                <Card hoverable style={{color:"#eeeee4"}}>
                                    <h3 style={{color:"#fe0141"}}>Customer Care</h3> 
                                    <h4 style={{color:"#181818"}}>Air Arabia Reservations <br></br>
                                    1-888-248-2256<br></br></h4>
                                    <h4 style={{color:"#181818"}}>Air Arabia Flight information <br></br>
                                    1-888-248-2256<br></br></h4>
                                    <a href="https://www.airarabia.com/en">Click here for more info</a>
                                </Card>
                            </Col>
                            </Row>
                                <h3>Time : {today.getHours()} : {today.getMinutes()}</h3>
                           <h2 className="heading">Flight details</h2> <Divider/>
                           <Card hoverable>
                            <Row>
                                <Col span={4}>
                                    <h3>Aircraft Name</h3>
                                </Col>
                                <Col span={4}>
                                    <h3>Departure</h3>
                                </Col>
                                <Col span={4}>
                                    <h3>Departure time</h3>
                                </Col>
                                <Col span={4}>
                                    <h3>Arrival</h3>
                                </Col>
                                <Col span={4}>
                                    <h3>Arrival Time</h3>
                                </Col>
                                <Col>
                                    <h3>Flight no</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <p>Aircraft Name</p>
                                </Col>
                                <Col span={4}>
                                    <p>From</p>
                                </Col>
                                <Col span={4}>
                                    <p>Departure time</p>
                                </Col>
                                <Col span={4}>
                                    <p>To</p>
                                </Col>
                                <Col span={4}>
                                    <p>Arrival Time</p>
                                </Col>
                                <Col>
                                    <p>Flight no</p>
                                </Col>
                            </Row>
                            </Card>
                            <h2 className="heading">Passenger Information</h2> <Divider/>
                           <Card hoverable>
                            {totalPassengers.map((number,index) =>(
                                <div key={index}>
                            <h3 className="passenger">Passenger {number}</h3>
                            <Row>
                                <Col span={7}>
                                    <h3>Name <span class="nameTab"></span>: Name</h3>
                                </Col>
                                <Col span={7}>
                                    <h3>Ticket no <span class="nameTab"></span>: 14125</h3>
                                </Col>
                                <Col span={7}>
                                    <h3>Seat no <span class="nameTab"></span>: 45</h3>
                                </Col>    
                            </Row>
                            <Row>
                            <Col span={7}>
                                    <h3>Meal <span class="nameTab"></span>: Vegetarian</h3>
                                </Col>
                                <Col span={7}>
                                    <h3>Passport no <span class="nameTab"></span>: 14125</h3>
                                </Col>
                                <Col span={7}>
                                    <h3>Gender <span class="nameTab"></span>: Male</h3>
                                </Col>
                            </Row>
                            </div>
                            ))}
                            </Card>
                            <QRCode type="canvas" value="https://www.airarabia.com/en" />
                        </Card>
                    </Col>
                    <Button type="primary" onClick={downloadPDF} danger style={{ width: '200px' }}>
                        Print Recipt 
                </Button>
        </div>
    );
}

export default Recipt;