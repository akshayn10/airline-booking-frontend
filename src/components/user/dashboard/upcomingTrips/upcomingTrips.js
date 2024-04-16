import styles from "./upcomingTrips.module.css";
import UpcomingTripsTable from "./upcomingTripsTable/upcomingTripsTable";
import { useEffect, useState } from "react";
import { GetUpcomingTrips } from "../../../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useNotificationContext } from "../../../../context/notificationContext";

const UpcomingTrips = ({userEmail}) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const [upcomingTrips, setUpcomingTrips] = useState(null);
  const getUpcomingTripsResponse = useSelector(
    (state) => state.upcomingTripsResponseReducer
  );

  useEffect(() => {
      dispatch(GetUpcomingTrips(userEmail));
  }, []);

  useEffect(() => {
    if (getUpcomingTripsResponse?.status === true) {
      setUpcomingTrips(getUpcomingTripsResponse?.data);
    } else if (getUpcomingTripsResponse?.status === false) {
      openNotification("error", getUpcomingTripsResponse.message);
    }
  }, [getUpcomingTripsResponse]);

  return (
    <div className={styles.container}>
      <h1>Upcoming Trips</h1>
      {upcomingTrips && (
        <>
          {upcomingTrips.length > 0 && (
            <UpcomingTripsTable upcomingTrips={upcomingTrips} />
          )}
          {!upcomingTrips.length && <p>No upcoming trips found.</p>}
        </>
      )}
    </div>
  );
};

export default UpcomingTrips;
