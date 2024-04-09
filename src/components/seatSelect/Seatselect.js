import React, {useState} from "react"; 
import { Row, Col } from 'antd'; 
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
function Seatselect({x})
{
    const numbers = Array.from({length:x}, (_, index)=>index+1);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

    const clicked=(index)=>{
        setSelectedButtonIndex(index);
    };

    return (
        <div><h1> select your seats below</h1>
            <div>
                <Row span={12}>
                    {numbers.map((number, index) => (
                    <Col span={5}>
                        <div key={number}>{number}</div>
                            <button onClick ={() =>clicked(index)}>                
                                <EventSeatOutlinedIcon style={{ color: selectedButtonIndex === index ? 'blue' : 'black' }} />
                            </button>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
      );
}

export default Seatselect;
