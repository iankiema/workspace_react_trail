// ReservationList.js
import React from 'react';
import { useSelector } from 'react-redux';

const ReservationList = () => {
  const reservations = useSelector(state => state.reservations.reservations);


  return (
    <div>
      <h2>Reservations</h2>
      {reservations.map((reservation) => (
        <div key={reservation.id}>
          <p>Location: {reservation.location}</p>
          <p>Date: {reservation.date}</p>
          <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Reservations;
