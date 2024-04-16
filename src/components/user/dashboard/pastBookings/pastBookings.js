import styles from "./pastBookings.module.css";
import PastBookingsTable from "./pastBookingsTable/pastBookingsTable";
import { useEffect, useState } from "react";
import { GetPastBookings } from "../../../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useNotificationContext } from "../../../../context/notificationContext";

const PastBookings = ({ userEmail }) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const [pastBookings, setPastBookings] = useState(null);
  const getPastBookingsResponse = useSelector(
    (state) => state.pastBookingsResponseReducer
  );

  useEffect(() => {
    dispatch(GetPastBookings(userEmail));
  }, []);

  useEffect(() => {
    if (getPastBookingsResponse?.status === true) {
      setPastBookings(getPastBookingsResponse.data);
    } else if (getPastBookingsResponse?.status === false) {
      openNotification("error", getPastBookingsResponse.message);
    }
  }, [getPastBookingsResponse]);

  return (
    <div className={styles.container}>
      <h1>Past Bookings</h1>
      {pastBookings && (
        <>
          {pastBookings.length > 0 && (
            <PastBookingsTable pastBookings={pastBookings} />
          )}
          {!pastBookings.length && <p>No Past Bookings found.</p>}
        </>
      )}
    </div>
  );
};

export default PastBookings;
