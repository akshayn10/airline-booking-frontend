import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Card, Row, Col,Button,message } from 'antd';
import { useNavigate,Link } from 'react-router-dom';
import './PassengerForm.css';
import axios from '../../../config/Axios';
import moment from 'moment';

const { Option } = Select;

function PassengerForm() {
    const noOfPassengers=2;
    const passengerNo = Array.from({ length: noOfPassengers }, (_, index) => index + 1);
    const navigate = useNavigate();

    const [passengerDetails, setPassengerDetails] = useState([]);
    //validation
    const [formCompleted, setFormCompleted] = useState(false);
    
    const seatType = "economy";


    const handleFormChange = (index, fieldName, value) => {
        const updatedPassengerDetails = [...passengerDetails];
        updatedPassengerDetails[index] = {
            ...updatedPassengerDetails[index],
            [fieldName]: value
        };
        setPassengerDetails(updatedPassengerDetails);
    };
    

    const [flight, setFlight] = useState([]);

    const submitClick = ()=>{
        console.log("Current date",passengerDetails);
        
        const bookingDetails = {
            totalCost: 150.00,
            travelDate: "2024-05-20",
            seatTypeBooked: seatType,
            noOfSeatBooked: 5,
            flightId: 4,
            passengers: passengerDetails
        };
        
            message.info('Submitted');
            axios.post('http://localhost:8080/booking/v1/book', bookingDetails) // Use Axios to send POST request
          
            .then(response => {
                console.log('Passenger created:', response.data);
                const bookingId = response.data.bookingId; // got booking id from back end
                const flightId = response.data.flightId; // got flight id from backend
                console.log("Bookin id is :",bookingId);
                console.log("Flight id is :",flightId); 

                const passingData = {
                    totalPassengers : noOfPassengers,
                    flightNo : flightId,
                    seatType : seatType,
                    bookingId : bookingId
                };
                message.info('Passing  now');
                navigate('/booking/seat-select', { state: passingData });
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      //validation
      useEffect(() => {
        // Check if all form fields are filled
        const isFormComplete = passengerDetails.every(passenger => 
            passenger.firstName && passenger.lastName && passenger.passportNo && passenger.mealPreference && passenger.dateOfBirth && passenger.gender
        );
        setFormCompleted(isFormComplete);
    }, [passengerDetails]);


    return (
        <div className="container">
            <h2>Enter the passenger's details below</h2>
            {passengerNo.map((number, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <Card bordered={true} style={{ width: '1500px', background: '#6E6E7F'}} >
                        <h3>Adult : {number}</h3>

                        <Form layout="vertical"  onFinishFailed={onFinishFailed} autoComplete="off">
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item  className ="bold-label" label="First Name" name="firstName" rules={[{ required: true, message: 'Please input your First Name!' }]}>
                                        <Input onChange={(e) => handleFormChange(index, 'firstName', e.target.value)} placeholder="First Name"/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input your Last Name!' }]}>
                                        <Input onChange={(e) => handleFormChange(index, 'lastName' , e.target.value)}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Passport No" name="passportNo" rules={[{ required: true, message: 'Please input your Passport No!' }]}>
                                        <Input onChange = {(e) => handleFormChange(index,'passportNo',e.target.value)}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                <Form.Item label="Meal Preference">
                                        <Select placeholder="Select this" onChange={(value) => handleFormChange(index,'mealPreference', value)}>
                                            <Option value="veg">Vegetarian</Option>
                                            <Option value="nonVeg">Non-Vegetarian</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Date of Birth" >
                                        <DatePicker minDate={moment().subtract(18,"years")} onChange={(date, dateString) => handleFormChange(index,'dateOfBirth', dateString)}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Gender">
                                        <Select placeholder="Select the gender" onChange={(value)=> handleFormChange(index, 'gender', value)}>
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
                <Button type="primary" htmlType="submit" disabled={!formCompleted} danger onClick={submitClick} style={{ width: '200px' }}>
                        Submit 
                </Button>
            </div>
        </div>
    );
}

export default PassengerForm;
