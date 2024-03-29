import { Space, Table, Tag } from "antd";
import styles from "./pastBookingsTable.module.css";

const pastBookingsColumns = [
  {
    title: "Booking Reference",
    dataIndex: "bookingReference",
    key: "bookingReference",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Flight Details",
    dataIndex: "flightDetails",
    key: "flightDetails",
  },
  {
    title: "Booking Date",
    dataIndex: "bookingDate",
    key: "bookingDate",
  },
  {
    title: "Passenger Names",
    dataIndex: "passengerNames",
    key: "passengerNames",
    render: (text) => text.join(", "),
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
    title: "Total Cost",
    dataIndex: "totalCost",
    key: "totalCost",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <a>View Details</a>
        <a>Leave Feedback</a>
      </Space>
    ),
  },
];

const PastBookingsTable = ({ pastBookings }) => (
    <Table className={styles.container} columns={pastBookingsColumns} dataSource={pastBookings} />
);
export default PastBookingsTable;
 