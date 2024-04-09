import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ParentRouter from "./router/parentRouter";
import FlightSearchSimple from "./components/search/FlightSearchSimple";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ParentRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
