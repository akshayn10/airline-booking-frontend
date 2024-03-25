import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ParentRouter from "./router/parentRouter";

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
