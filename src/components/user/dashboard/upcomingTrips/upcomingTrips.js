import styles from "./upcomingTrips.module.css";
import UpcomingTripsTable from "./upcomingTripsTable/upcomingTripsTable";
import { useEffect } from "react";
import { getUpcomingTrips } from "../../../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
const UpcomingTrips = () => {
  const dispatch = useDispatch();
  const upcomingTrips = useSelector(
    (state) => state.upcomingTripsReducer.upcomingTrips
  );

  useEffect(() => {
    dispatch(getUpcomingTrips());
  }, [dispatch, upcomingTrips]);
  return (
    <div className={styles.container}>
      <h1>Upcoming Trips</h1>
      <UpcomingTripsTable upcomingTrips={upcomingTrips} />
    </div>
  );
};

export default UpcomingTrips;
