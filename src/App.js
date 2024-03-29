import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import PassengerForm from "./components/passengerDetails/PassergerForm";
import PaymentForm from './components/paymentDetails/PaymentForm';

function App() {
  return (  
  
    <Router>
      <Routes>
        <Route path="/" element={<PassengerForm noOfPassengers={3} />} />
        <Route path="/paymentform" element={<PaymentForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;