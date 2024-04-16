import { useSelector } from 'react-redux';
import PastBookings from './pastBookings/pastBookings';
import UpcomingTrips from './upcomingTrips/upcomingTrips';
import styles from './userDashboard.module.css'

const UserDashboard = () => {
    const userEmail = useSelector(
        (state) => state.authenticationStateReducer.user.email
      );
    return (
        <div className={styles.container}>
            <h1>User Dashboard</h1>
            <div className={styles.trip__section}>
                <UpcomingTrips userEmail={userEmail}/>
                <PastBookings userEmail={userEmail}/>
            </div>
        </div>
    )
}
export default UserDashboard;