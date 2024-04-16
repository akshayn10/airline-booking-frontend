import { Space, Table, Tag } from "antd";
import styles from "./pastBookingsTable.module.css";

const pastBookingsColumns = [
  {
    title: "Booking Reference",
    dataIndex: "bookingId",
    key: "bookingId",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Flight Details",
    dataIndex: "flightDetails",
    key: "flightDetails",
  },
  {
    title: "Booking Date",
    dataIndex: "bookingDateTime",
    key: "bookingDate",
    render: (text) => new Date(text).toLocaleString(), 
  },
  {
    title: "Passenger Names",
    dataIndex: "passengers",
    key: "passengerNames",
  },
  {
    title: "Seat Numbers",
    dataIndex: "seatNumbers",
    key: "seatNumbers",
    render: (text) => text.join(", "),
  },
  {
    title: "Booking Status",
    dataIndex: "bookingStatus",
    key: "bookingStatus",
  },
  {
    title: "Seat Numbers",
    dataIndex: "seatNumbers",
    key: "seatNumbers",
  },
  {
    title: "Total Cost",
    dataIndex: "totalCost",
    key: "totalCost",
  },
  {
    title: "Status",
    dataIndex: "isCancelled",
    key: "status",
    render: (isCancelled) => (isCancelled ? "Cancelled" : "Done"),
  },
];

const PastBookingsTable = ({ pastBookings }) => (
  <Table
    className={styles.container}
    columns={pastBookingsColumns}
    dataSource={pastBookings}
  />
);
export default PastBookingsTable;
