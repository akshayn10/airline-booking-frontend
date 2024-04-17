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
  {
    title: "Total Cost",
    dataIndex: "totalCost",
    key: "totalCost",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const PastBookingsTable = ({ pastBookings }) => (
  <Table
    className={styles.container}
    columns={pastBookingsColumns}
    dataSource={pastBookings}
    pagination={false}
    rowKey={(record) => record.bookingId}
  />
);
export default PastBookingsTable;
