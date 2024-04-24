import { Table } from "antd";
import styles from "./pastBookingsTable.module.css";

const pastBookingsColumns = [
  {
    title: "Booking Reference",
    dataIndex: "bookingId",
    width: 100,
    key: "bookingId",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Flight Details",
    width: 150,
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
    render:(text) => text+" $"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const PastBookingsTable = ({ pastBookings }) => (
  <div>
    <Table
      className={styles.container}
      columns={pastBookingsColumns}
      dataSource={pastBookings}
      pagination={{
        pageSize: 5,
        total: pastBookings.length,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      rowKey={(record) => record.bookingId}
    />
  </div>
);
export default PastBookingsTable;
