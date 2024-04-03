import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ParentRouter from "./router/parentRouter";
import FlightSearchSimple from "./components/search/FlightSearchSimple";
import FlightSearchAdvanced from "./components/search/FlightSearchAdvanced";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ParentRouter />
      </BrowserRouter>
      <h1> Airline Booking Frontend </h1>
      <FlightSearchSimple />
    </div>
  );
};

export default App;
