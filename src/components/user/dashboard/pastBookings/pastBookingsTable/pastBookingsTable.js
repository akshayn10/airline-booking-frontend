import { Table } from "antd";
import styles from "./pastBookingsTable.module.css";

const pastBookingsColumns = [
  {
    title: "Booking Reference",
    dataIndex: "bookingId",
    key: "bookingId",
    render: (text) => <p>{text}</p>,
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
  // {
  //   title: "Seat Numbers",
  //   dataIndex: "seatNumbers",
  //   key: "seatNumbers",
  // },
  {
    title: "Total Cost",
    dataIndex: "totalCost",
    key: "totalCost",
  },
  {
    title: "Status",
    dataIndex: "cancelled",
    key: "status",
    render: (cancelled) => (cancelled ? "Cancelled" : "Done"),
  },
];

const PastBookingsTable = ({ pastBookings }) => (
  <Table
    className={styles.container}
    columns={pastBookingsColumns}
    dataSource={pastBookings}
    rowKey={record => record.bookingId} 
  />
);
export default PastBookingsTable;
