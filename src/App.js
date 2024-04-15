import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ParentRouter from "./router/parentRouter";
import FlightSearchSimple from "./components/search/FlightSearchSimple";
import { useNotificationContext } from "./context/notificationContext";

const App = () => {
  const {contextHolder} = useNotificationContext();
  return (
    <div className="App">
      <BrowserRouter>
        <ParentRouter />
      </BrowserRouter>
      {contextHolder}
    </div>
  );
};

export default App;