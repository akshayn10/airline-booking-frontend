import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Card, Row, Col,Button,message } from 'antd';
import { useNavigate,Link } from 'react-router-dom';
import './PassengerForm.css';

const { Option } = Select;

function PassengerForm() {
    const noOfPassengers=4;
    const passengerNo = Array.from({ length: noOfPassengers }, (_, index) => index + 1);
    const navigate = useNavigate();

    const submitClick = () => {
        message.info('Submitted');
        console.log("inside here1");
    };
    
    const passingData = {
        totalPassengers : noOfPassengers
    };

    return (
        <div className="container">
            <h2>Enter the passenger's details below</h2>
            {passengerNo.map((number, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <Card bordered={true} style={{ width: '1500px', background: '#cbd1cb'}} >
                        <h3>Adult : {number}</h3>

                        <Form layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please input your First Name!' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input your Last Name!' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Passport No" name="passportNo" rules={[{ required: true, message: 'Please input your Passport No!' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                <Form.Item label="Meal Preference">
                                        <Select placeholder="Select this">
                                            <Option value="veg">Vegetarian</Option>
                                            <Option value="nonVeg">Non-Vegetarian</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Date of Birth" >
                                        <DatePicker />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Gender">
                                        <Select placeholder="Select the gender">
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={{pathname:"/booking/seat-select", state:passingData}}> 
                <Button type="primary" danger onClick={submitClick} style={{ width: '200px' }}>
                        Submit 
                </Button>
            </Link>
            </div>
        </div>
    );
}

export default PassengerForm;
