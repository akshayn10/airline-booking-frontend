import { BrowserRouter } from "react-router-dom";
import AdminRoute from "./components/admin/AdminRoute.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
