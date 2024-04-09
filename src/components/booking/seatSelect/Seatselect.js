import React, {useState} from "react"; 
import { Row, Col, Alert,Space,message,Button } from 'antd'; 
import { useLocation,useParams,Link} from "react-router-dom";
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import FlightClassOutlinedIcon from '@mui/icons-material/FlightClassOutlined';
import './Seatselect.css'

function Seatselect() {

    const noOfPassengers = 5;

    const totalSeatsInThePlane=68;
    const totalSeats = Array.from({ length: totalSeatsInThePlane }, (_, index) => index + 1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const bookedSeats = [1,2,3,4,5,10,12,19,25];

    
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

    const isSeatDisabled = (seatnumber) =>{
        
            if(bookedSeats.includes(seatnumber)){
                return seatnumber;
            }
    
    }

    return (
        <div className='root-container'>              
            <div className="mainclass">
                <div className="selectedSeat"><h1>Select your seats below</h1> </div>

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
                <Link to="/booking/payment-details">
                <Button type="primary" danger>
                    Proceed to Checkout
                </Button>
                </Link>
            </div>
            </div>
        </div>
    );
}


export default Seatselect;