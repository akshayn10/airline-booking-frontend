import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FleetInfomationModal from "./FleetInformationModal";
import AddFlightModal from "./AddFlightModal";
import EditableCell from "./common/EditableCell";
import {
  AddFlight,
  DeleteFlight,
  GetFleets,
  GetFlightLocations,
  GetFlights,
  UpdateFlight,
} from "../../redux/actions/AdminActions";
import { formatDate } from "../../util/DateConversion";
import dayjs from "dayjs";

const FleetManagement = () => {};

export default FleetManagement;
