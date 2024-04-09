import { Route, Routes } from "react-router-dom";
import FlightSearchSimple from "./FlightSearchSimple.js";
import FlightSearchAdvanced from "./FlightSearchAdvanced.js";

const SearchRouter = () => {
  return (
    <Routes>
      <Route path="flight-search-simple" element={<FlightSearchSimple />} />
      <Route path="flight-search-advanced" element={<FlightSearchAdvanced />} />
    </Routes>
  );
};

export default SearchRouter;
