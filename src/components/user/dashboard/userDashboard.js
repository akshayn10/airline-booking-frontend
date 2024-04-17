import { useSelector } from "react-redux";
import PastBookings from "./pastBookings/pastBookings";
import UpcomingTrips from "./upcomingTrips/upcomingTrips";
import styles from "./userDashboard.module.css";
import { useState } from "react";

const UserDashboard = () => {
  const [isPastTableUpdateTriggered, setIsPastTableUpdateTriggered] =
    useState(false);
  const updatePastTripsWhenCancelled = () => {
    setIsPastTableUpdateTriggered(true);
  };
  const userEmail = useSelector(
    (state) => state.authenticationStateReducer.user.email
  );
  return (
    <div className={styles.container}>
      <h1>User Dashboard</h1>
      <div className={styles.trip__section}>
        <UpcomingTrips
          updatePastTripsWhenCancelled={updatePastTripsWhenCancelled}
          userEmail={userEmail}
        />
        <PastBookings
          setIsPastTableUpdateTriggered={setIsPastTableUpdateTriggered}
          isPastTableUpdateTriggered={isPastTableUpdateTriggered}
          userEmail={userEmail}
        />
      </div>
    </div>
  );
};
export default UserDashboard;
