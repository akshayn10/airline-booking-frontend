import React, { useState } from "react";
import { Card,Form,Input,Row,Col,Divider,Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {Route,Routes,Link} from "react-router-dom"
import { runes } from 'runes2'
import './PaymentForm.css'; 


function PaymentForm(){
    const location = useLocation();
    const passingData = location.state;

    const noOfPassengers = passingData.totalPassengers;
    console.log("No of passengers : ",noOfPassengers);
    const unitPrice = passingData.costPerSeat;
    const today =new Date();
    const ticketCost = unitPrice*noOfPassengers;
    const taxPerPerson = 0.18*unitPrice;
    const totalTax = taxPerPerson*noOfPassengers;
    const costPerPerson = taxPerPerson+unitPrice;
    const totalCost = costPerPerson*noOfPassengers;

    const navigate = useNavigate();

    const buttonClicked = () => {
        const passingDataTransfer = {
            totalPassengers : noOfPassengers,  // check and delete
            flightNo : passingData.flightNo,
            costPerSeat : passingData.costPerSeat,  // check and delete
            bookingId : passingData.bookingId
        };
        navigate('/booking/final-recipt', { state: passingDataTransfer});
    }



    return(
        <div className="background-container">
            <h1 style = {{backgroundColor:'#CA3000'}}>Pay by card</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Row gutter={[40,40]}>
                    <Col span={50}>
                    <h2 style={{color:'#A19C91'}}>Enter your card details below</h2>
                    <Card bordered={true} style={{width:'700px',backgroundColor:'#848787'}}>
                        <Form>

                                    <Form.Item label="Name On Card" name="nameOnCard" rules={[{required: true, message:'Please enter!'}]}>
                                       <Input maxLength={20}/>
                                    </Form.Item>

                                    <Form.Item label="Card number" name="cardNo" rules={[{required: true, message:'Please enter!'}]}>
                                    <Input type = "number" count={{ show: true, max: 16, strategy: (txt) => runes(txt).length, exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''), }}
                                                    placeholder="1234-5678-9874-5612" onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16); }}/>
                                    </Form.Item>
                      
                                    <Form.Item label="CVC no" name="cvcNo" rules={[{required: true, message:'Please enter!'}]}>
                                        <Input type="number" placeholder="123" maxLength={2} onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3); }} />
                                    </Form.Item>
                            
                                    <Form.Item label="Exp Date" name="expDate" rules={[{required: true, message:'Please enter!'}]}>
                                        <Input type="number" placeholder="mmdd" maxLength={4} onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); }} />
                                    </Form.Item>
                                
                            <Divider />
                            <Button type="primary" onClick={buttonClicked} danger>Click to pay</Button>
                        </Form>
                    </Card>
                    </Col>
                    <Col span={10}>
                        <h2 style={{color:'#A19C91'}} >Mini Bill</h2>
                        <Card style={{width:'1000px',backgroundColor:'#848787'}}>
                            <h3>Transaction date : {today.toLocaleDateString()}</h3>
                            <h3>Time : {today.getHours()} : {today.getMinutes()}</h3>
                            <Divider/><Divider/>
                            <Row>
                                <Col span={5}>
                                    <h3>Description</h3>
                                </Col>
                                <Col span={5}>
                                    <h3>Count</h3>
                                </Col>
                                <Col span={5}>
                                    <h3>Per passenger</h3>
                                </Col>
                                <Col span={5}>
                                    <h3>Total</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>
                                    <p>Ticket Cost</p>
                                </Col>
                                <Col span={5}>
                                    <p>{noOfPassengers}</p>
                                </Col>
                                <Col span={5}>
                                    <p>{unitPrice}</p>
                                </Col>
                                <Col span={5}>
                                    <p>{ticketCost}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>
                                    <p>Taxes (18%)</p>
                                </Col>
                                <Col span={5}>
                                    <p>{noOfPassengers}</p>
                                </Col>
                                <Col span={5}>
                                    <p>{taxPerPerson}</p>
                                </Col>
                                <Col span={5}>
                                    <p>{totalTax}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Divider/>
                                <Col span={5}>
                                    <p>Total amount</p>
                                </Col>
                                <Col span={5}>
                                    <p>-</p>
                                </Col>
                                <Col span={5}>
                                    <p>{costPerPerson}</p>
                                </Col>
                                <Col span={5}>
                                    <p>{totalCost}</p>
                                </Col>
                                <Divider/>
                            </Row>
                        </Card>
                    </Col>
                    </Row>
            </div>
        </div>
    );
}
export default PaymentForm;