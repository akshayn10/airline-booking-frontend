import PastBookings from './pastBookings/pastBookings';
import UpcomingTrips from './upcomingTrips/upcomingTrips';
import styles from './userDashboard.module.css'

const UserDashboard = () => {
    return (
        <div className={styles.container}>
            <h1>User Dashboard</h1>
            <div className={styles.trip__section}>
                <UpcomingTrips/>
                <PastBookings/>
            </div>
        </div>
    )
}
export default UserDashboard;