import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserReservations, selectAllReservations } from '../redux/reservationSlice';
import { selectCurrentUser } from '../redux/userSlice';
import Navbar from './sidebar';

function ReservationList() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const reservations = useSelector((state) => selectAllReservations(state));

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserReservations(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="container mt-5">
      <div className='row'>
        <div className="col-lg-3">
          <Navbar />
        </div>
        <div className='col-lg-9'>
          <h2>Your Reservations</h2>
          <ul className="list-group">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <li key={reservation.id} className="list-group-item">
                  <h3>Reservation for {reservation.package_name}</h3>
                  <p>Location: {reservation.location}</p>
                  <p>Date: {reservation.date}</p>
                  {/* Add more details as needed */}
                </li>
              ))
            ) : (
              <p>No reservations found.</p>
            )}
          </ul>
        </div>
      
      </div>
       
    </div>
  );
}

export default ReservationList;
