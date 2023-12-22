import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeReservation  } from '../redux/reservationSlice';
import Navbar from './sidebar';

function ReservationForm() {
  const dispatch = useDispatch();

  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log('Submitting reservation:', { location, date });

        // Dispatch the makeReservation action
        const response = await dispatch(makeReservation({location, date }));
    
        console.log('Reservation response:', response);
    
      // window.location.href = "/reservations";
    } catch (error) {
      console.error('Error making reservation:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="container-fluid mt-5">
        <div className='row'>
            <div className="col-lg-3">
                <Navbar />
            </div>
            <div className='col-lg-9'>
                <h2>Reserve Now</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                    Location
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                        Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Reserve Now
                    </button>
                </form>
            </div>
        </div>
      
      
    </div>
  );
}

export default ReservationForm;
