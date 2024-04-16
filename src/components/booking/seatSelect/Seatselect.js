import React, {useState,useEffect} from "react"; 
import { Row, Col, Card,Space,message,Button } from 'antd'; 
import { useLocation,useParams,Link,useNavigate} from "react-router-dom";
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import FlightClassOutlinedIcon from '@mui/icons-material/FlightClassOutlined';
import './Seatselect.css'
import axios from '../../../config/Axios';

function Seatselect() {

    
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const bookedSeats = [1,2];

    const location = useLocation();
    const passingData = location.state;
    const noOfPassengers = passingData.totalPassengers;

    const [flightDetail, setFlightDetail] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/booking/v1/getByFlight/${passingData.flightNo}`);
                console.log('Flight Details:', response.data);
                setFlightDetail(response.data);
            } catch (error) {
                console.error('Error fetching Flights', error);
            }
        };
        fetchData();
    }, []);


    let totalSeatsInThePlane;
    let costPerSeat;
    if(passingData.seatType === "economy"){
        totalSeatsInThePlane = flightDetail.remainingEconomySeats;
        costPerSeat = flightDetail.economySeatFare;

    }else if(passingData.seatType === "business"){
        totalSeatsInThePlane = flightDetail.remainingPremiumSeats;
        costPerSeat = flightDetail.premiumSeatFare;

    }else {
        totalSeatsInThePlane = flightDetail.remainingBusinessSeats;
        costPerSeat = flightDetail.businessSeatFare;
    }
    const totalSeats = Array.from({ length: totalSeatsInThePlane}, (_, index) => index + 1);
    

    const clicked = (index) => {
        console.log("noOfPassengers is : "+noOfPassengers);
        const updatedSeats = [...selectedSeats];
        if(selectedSeats.length>noOfPassengers-1){
            if(updatedSeats.includes(index)){
                updatedSeats.splice(updatedSeats.indexOf(index),1);
            }else{
                message.info("You have already selected "+noOfPassengers+" seats");
            }
        }
        else if (updatedSeats.includes(index)) {
            updatedSeats.splice(updatedSeats.indexOf(index), 1);
        } else {
            updatedSeats.push(index);
        }
        setSelectedSeats(updatedSeats);
    };

    const isSeatDisabled = (seatnumber) => {
            if(bookedSeats.includes(seatnumber)){
                return seatnumber;
            }
    }

    const buttonClicked = () => {
        const passingDataTransfer = {
            totalPassengers : noOfPassengers,
            flightNo : 4,
            costPerSeat : costPerSeat,
            bookingId : passingData.bookingId
        };
        navigate('/booking/payment-details', { state: passingDataTransfer});
    }

    return (
        <div className='root-container'>              
            <div className="mainclass">
                <div className="selectedSeat"><h1>Select your {passingData.seatType} seats below </h1> </div>
                    <Row gutter={[180, 16]}>
                        {totalSeats.map((number, index) => (
                            <Col span={5} key={number}>
                                <div>{number}</div>
                                <button onClick={() => clicked(index)} disabled ={isSeatDisabled(number)}>
                                    <FlightClassOutlinedIcon style={{ color: selectedSeats.includes(index) ? 'blue' : 'black' }} />
                                </button>
                            </Col>
                        ))}
                    </Row>
            
                <div className="selectedSeat">
                    <h3>Selected Seats:</h3>
                    <div>
                        {selectedSeats.map((seatIndex) => (
                            <span key={seatIndex}>{seatIndex + 1}, </span>
                        ))}
                    </div>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center'}}>

                <Button type="primary" danger onClick={buttonClicked}>
                    Proceed to Checkout
                </Button>

            </div>
            </div>
        </div>
    );
}


export default Seatselect;