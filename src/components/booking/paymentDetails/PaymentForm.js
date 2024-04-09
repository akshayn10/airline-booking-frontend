import React, { useState } from "react";
import { Card,Form,Input,Row,Col,Divider,Button } from "antd";
import { useLocation } from "react-router-dom";
import {Route,Routes,Link} from "react-router-dom"


function PaymentForm(){
    const location = useLocation();
    const noOfPassengers = location.state?.noOfPassengers;
    const unitPrice = 10000;
    const today =new Date();
    const ticketCost = unitPrice*noOfPassengers;
    const taxPerPerson = 0.18*unitPrice;
    const totalTax = taxPerPerson*noOfPassengers;
    const costPerPerson = taxPerPerson+unitPrice;
    const totalCost = costPerPerson*noOfPassengers;
    
    return(
        <div>
            <h1>Payment method</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Card bordered={true} style ={{width: '2500px'}}>
                <Row gutter={[40,40]}>
                    <Col span={50}>
                    <h2>Enter your card details below</h2>
                    <Card bordered={true} style={{width:'700px'}}>
                        <Form>

                                    <Form.Item label="Name On Card" name="nameOnCard" rules={[{required: true, message:'Please enter!'}]}>
                                       <Input maxLength={20}/>
                                    </Form.Item>

                                    <Form.Item label="Card number" name="cardNo" rules={[{required: true, message:'Please enter!'}]}>
                                        <Input placeholder="1234-5678-9999-9999" maxLength={16}/>
                                    </Form.Item>
                      
                                    <Form.Item label="CVC no" name="cvcNo" rules={[{required: true, message:'Please enter!'}]}>
                                        <Input placeholder="999" maxLength={3}/>
                                    </Form.Item>
                            
                                    <Form.Item label="Exp Date" name="expDate" rules={[{required: true, message:'Please enter!'}]}>
                                        <Input placeholder="12/31" maxLength={5}/>
                                    </Form.Item>
                                
                            <Divider />
                            <Link to="/booking/final-recipt">
                            <Button type="primary" danger>Click to pay</Button>
                            </Link>
                        </Form>
                    </Card>
                    </Col>
                    <Col span={10}>
                        <h2>Payment details</h2>
                        <Card style={{width:'1000px'}}>
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
                </Card>
            </div>
        </div>
    );
}
export default PaymentForm;