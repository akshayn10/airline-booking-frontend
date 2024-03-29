import styles from "./pastBookings.module.css";
import PastBookingsTable from "./pastBookingsTable/pastBookingsTable";
import { useEffect } from "react";
import { getPastBookings } from "../../../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

const PastBookings = () => {
  const dispatch = useDispatch();
  const pastBookings = useSelector(
    (state) => state.pastBookingsReducer.pastBookings
  );

  useEffect(() => {
    dispatch(getPastBookings());
  }, [dispatch,pastBookings]);

  console.log(pastBookings.length); // Log the booking_time property of the first element of
  return (
    <div className={styles.container}>
        {pastBookings.length}
      <h1>Past Bookings</h1>
      <PastBookingsTable pastBookings={pastBookings} />
    </div>
  );
};

export default PastBookings;
