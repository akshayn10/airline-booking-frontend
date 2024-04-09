import PassengerForm from "./passengerDetails/PassergerForm"
import {Route,Routes} from "react-router-dom"
import Seatselect from "./seatSelect/Seatselect"
import PaymentForm from "./paymentDetails/PaymentForm";
import Recipt from "./finalReceipt/Recipt";
const BookingRouter = () => {
    return(
        <Routes>
            <Route path="passenger-form" element={<PassengerForm />} />
            <Route path="seat-select" element={<Seatselect/>}/>
            <Route path="payment-details" element={<PaymentForm/>}/>
            <Route path="final-recipt" element={<Recipt/>}/>
        </Routes>
    );
}

export default BookingRouter;