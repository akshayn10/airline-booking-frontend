import { Space, Table} from "antd";
import styles from "./upcomingTripsTable.module.css";


const upcomingTripsColumns = [
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
    title: "Departure Time",
    dataIndex: "departureTime",
    key: "departureTime",
  },
  {
    title: "Arrival Time",
    dataIndex: "arrivalTime",
    key: "arrivalTime",
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
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <a>Modify Booking</a>
      </Space>
    ),
  },
];

const UpcomingTripsTable = ({ upcomingTrips }) => (
  <Table className={styles.container} columns={upcomingTripsColumns} dataSource={upcomingTrips} />
);
export default UpcomingTripsTable;
