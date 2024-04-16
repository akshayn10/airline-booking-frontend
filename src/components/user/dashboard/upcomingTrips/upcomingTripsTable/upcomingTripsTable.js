import { Button, Space, Table, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import styles from "./upcomingTripsTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CancelBooking } from "../../../../../redux/actions/UserActions";
import { useNotificationContext } from "../../../../../context/notificationContext";

const UpcomingTripsTable = ({ upcomingTrips }) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const cancelBookingResponseState = useSelector(
    (state) => state.cancelBookingResponseReducer
  );
  useEffect(() => {
    if (cancelBookingResponseState?.status === true) {
      openNotification("success", cancelBookingResponseState.data);
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
      dispatch(CancelBooking(bookingToCancel))
    }
    setBookingToCancel(null);
  };

  const cancelCancelBooking = () => {
    console.log("Cancellation cancelled");
  };

  const upcomingTripsColumns = [
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
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Arrival Time",
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
      dataIndex: "seatNumbers",
      key: "seatNumbers",
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
          <Popconfirm
            title="Cancel this booking"
            onConfirm={confirmCancelBooking}
            onCancel={cancelCancelBooking}
            okText="Yes"
            cancelText="No"
            open={bookingToCancel === record.bookingId}
          >
            <Button onClick={() => handleCancelBooking(record.bookingId)}>Cancel Booking</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table className={styles.container} columns={upcomingTripsColumns} dataSource={upcomingTrips} />
  );
};

export default UpcomingTripsTable;
