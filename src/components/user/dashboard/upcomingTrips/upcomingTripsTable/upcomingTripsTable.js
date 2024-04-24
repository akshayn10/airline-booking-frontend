import { Button, Space, Table, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import styles from "./upcomingTripsTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CancelBooking } from "../../../../../redux/actions/UserActions";
import { useNotificationContext } from "../../../../../context/notificationContext";

const UpcomingTripsTable = ({
  upcomingTrips,
  handleDataRefreshWhenCancelled,
}) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const cancelBookingResponseState = useSelector(
    (state) => state.cancelBookingResponseReducer
  );
  useEffect(() => {
    if (cancelBookingResponseState?.status === true) {
      openNotification("success", "Update success");
      handleDataRefreshWhenCancelled();
    } else if (cancelBookingResponseState?.status === false) {
      openNotification("error", cancelBookingResponseState.message);
    }
  }, [cancelBookingResponseState]);

  const handleCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      console.log("Cancel booking with ID:", bookingToCancel);
      dispatch(CancelBooking(bookingToCancel));
    }
    setBookingToCancel(null);
  };

  const cancelCancelBooking = () => {
    setBookingToCancel(null);
  };

  const upcomingTripsColumns = [
    {
      title: "Booking Reference",
      width: 100,
      dataIndex: "bookingId",
      key: "bookingId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Flight Details",
      width: 125,
      dataIndex: "flightDetails",
      key: "flightDetails",
    },
    {
      title: "Booking Date",
      width: 125,
      dataIndex: "bookingDateTime",
      key: "bookingDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Departure Time",
      width: 125,
      dataIndex: "departureTime",
      key: "departureTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Arrival Time",
      width: 125,
      dataIndex: "arrivalTime",
      key: "arrivalTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Passenger Names",
      dataIndex: "passengers",
      key: "passengerNames",
    },
    {
      title: "Seat Numbers",
      width: 100,
      dataIndex: "seatNumbers",
      key: "seatNumbers",
      render: (seatNumbers) => {
        if (!seatNumbers) return "";
        return seatNumbers.join(", ");
      },
    },
    {
      title: "Total Cost",
      width: 100,
      dataIndex: "totalCost",
      key: "totalCost",
      render: (text) => text + " $",
    },
    {
      title: "Actions",
      fixed: "right",
      width: 100,
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Cancel this booking"
            onConfirm={confirmCancelBooking}
            onCancel={cancelCancelBooking}
            okText="Yes"
            cancelText="No"
            open={bookingToCancel === record.bookingId}
          >
            <Button
              type="primary"
              danger
              onClick={() => handleCancelBooking(record.bookingId)}
            >
              Cancel
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.bookingId}
      className={styles.container}
      columns={upcomingTripsColumns}
      dataSource={upcomingTrips}
      scroll={{
        x: 1000,
      }}
      pagination={{
        pageSize: 5,
        total: upcomingTrips.length,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  );
};

export default UpcomingTripsTable;
