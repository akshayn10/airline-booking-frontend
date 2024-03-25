import { BrowserRouter } from "react-router-dom";
import ParentRouter from "./components/admin/router/parentRouter.js";

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
