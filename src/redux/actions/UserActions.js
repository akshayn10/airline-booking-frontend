import {
  GET_PAST_BOOKINGS,
  GET_UPCOMING_TRIPS,
} from "../constants/UserConstants";
const pastBookings = [
    {
        bookingReference: 'REF123456789',
        flightDetails: 'Flight 1: JFK to LAX',
        bookingDate: '2023-12-15',
        passengerNames: ['John Doe', 'Jane Doe'],
        seatNumbers: ['14A', '14B'],
        bookingStatus: 'Completed',
        totalCost: 600,
        actions: ['View Details', 'Leave Feedback']
    },
    {
        bookingReference: 'REF987654321',
        flightDetails: 'Flight 2: SFO to ORD',
        bookingDate: '2023-11-20',
        passengerNames: ['Alice Smith', 'Bob Smith'],
        seatNumbers: ['22C', '22D'],
        bookingStatus: 'Canceled',
        totalCost: 400,
        actions: ['View Details']
    },
    {
        bookingReference: 'REF567890123',
        flightDetails: 'Flight 3: LHR to CDG',
        bookingDate: '2023-10-05',
        passengerNames: ['Emily Johnson'],
        seatNumbers: ['7F'],
        bookingStatus: 'Completed',
        totalCost: 250,
        actions: ['View Details', 'Leave Feedback']
    }
];

const upcomingTrips = [
    {
        bookingReference: 'REF345678901',
        flightDetails: 'Flight 4: CDG to JFK',
        departureTime: '2024-05-20 10:00 AM',
        arrivalTime: '2024-05-20 02:00 PM',
        passengerNames: ['John Doe', 'Jane Doe'],
        seatNumbers: ['12A', '12B'],
        bookingStatus: 'Confirmed',
        actions: ['Check-in Online', 'Modify Booking']
    },
    {
        bookingReference: 'REF901234567',
        flightDetails: 'Flight 5: LAX to ORD',
        departureTime: '2024-06-10 08:30 AM',
        arrivalTime: '2024-06-10 12:00 PM',
        passengerNames: ['Alice Smith'],
        seatNumbers: ['15C'],
        bookingStatus: 'Confirmed',
        actions: ['Check-in Online']
    },
    {
        bookingReference: 'REF234567890',
        flightDetails: 'Flight 6: ORD to SFO',
        departureTime: '2024-07-01 01:00 PM',
        arrivalTime: '2024-07-01 04:30 PM',
        passengerNames: ['Bob Smith'],
        seatNumbers: ['20D'],
        bookingStatus: 'Pending',
        actions: ['Modify Booking']
    }
];


export const getPastBookings = () => async (dispatch) => {
  dispatch({
    type: GET_PAST_BOOKINGS,
    payload: pastBookings,
  });
};

export const getUpcomingTrips = () => async (dispatch) => {
  dispatch({
    type: GET_UPCOMING_TRIPS,
    payload: upcomingTrips,
  });
};
