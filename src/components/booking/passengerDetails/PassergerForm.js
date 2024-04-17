import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Card, Row, Col,Button,message } from 'antd';
import { useNavigate,Link, useLocation } from 'react-router-dom';
import './PassengerForm.css';
import axios from '../../../config/Axios';
import moment from 'moment';
import { useSelector } from "react-redux";

const { Option } = Select;

function PassengerForm() {

    const navigate = useNavigate();
    const userEmail = useSelector(
        (state) => state.authenticationStateReducer.user?.email
      );

    
    const noOfPassengers = localStorage.getItem("passengerCount")
    console.log('pasednpassenger no : ',noOfPassengers);
    const passengerNo = Array.from({ length: noOfPassengers }, (_, index) => index + 1);

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


    // const handlePassengerNo = ( value)=> {
    //     noOfPassengers = value;
    //     passengerNo = Array.from({ length: noOfPassengers }, (_, index) => index + 1);
    // }
    

    const [flight, setFlight] = useState([]);

    const handleClick = async () => {
        console.log("Current date",passengerDetails);

        const isAnyPassengerIncomplete = passengerDetails.some(passenger => {
            return (
                !passenger.firstName ||
                !passenger.lastName ||
                !passenger.passportNo ||
                !passenger.mealPreference ||
                !passenger.dateOfBirth ||
                !passenger.gender
            );
        });

        const isAnyPassengerunder18 = passengerDetails.some(passenger => {
            let today = moment();
            let birthDate = moment(passenger.dateOfBirth);
            let age = today.diff(birthDate,'years');
            console.log('age is : ',age);
            return age < 18;
        })
        
        if(isAnyPassengerIncomplete){
            message.error('Please fill all the fields');
            return;
        }if(isAnyPassengerunder18){
            message.error('Passenger age should greater than 18');
            return;
        }
        else{
        
            const bookingDetails = {
                seatTypeBooked: seatType,
                noOfSeatBooked: noOfPassengers,
                flightId: 3,
                passengers: passengerDetails,
                userEmail:userEmail
            };
            
                
                axios.post('http://localhost:8080/booking', bookingDetails) 
                .then(response => {
                    message.info('Submitted');
                    
                    console.log('Passenger created:', response.data);
                    const bookingId = response.data; 
                    console.log("Bookin id is :",bookingId);

                    localStorage.setItem("bookingId", bookingId);

                    const passingData = {
                        totalPassengers : noOfPassengers,
                        flightNo : 3,
                        seatType : seatType,
                        bookingId : bookingId
                    };
                    message.info('Passing  now');
                    navigate('/booking/seat-select', { state: passingData });
                })
                .catch(error => {
                    message.error('Error in passing data');
                    console.error('Error creating user:', error);
                });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      //validation
    //   useEffect(() => {
    //     // Check if all form fields are filled
    //     const isFormComplete = passengerDetails.every(passenger => 
    //         passenger.firstName && passenger.lastName && passenger.passportNo && passenger.mealPreference && passenger.dateOfBirth && passenger.gender
    //     );
    //     setFormCompleted(isFormComplete);
    // }, [passengerDetails]);




    return (
        <div className="container">
            <h2>Enter the passenger's details below</h2>
            {passengerNo.map((number, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <Card bordered={true} style={{ width: '1500px', background: '#6E6E7F'}} >
                        <h3>Adult : {number}</h3>

                        <Form layout="vertical" onFinishFailed={onFinishFailed}>
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
                <Button type="primary" htmlType="submit" onClick={handleClick} danger style={{ width: '200px' }}>
                        Submit 
                </Button>
            </div>
        </div>
    );
}

export default PassengerForm;
