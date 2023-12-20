import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './sidebar';

function BookReservation() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function getPackages() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/packages');
        const responseData = await response.json();

        if (responseData.data && Array.isArray(responseData.data)) {
          setPackages(responseData.data);
        } else {
          console.error('Invalid data format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }

    getPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, date, package: selectedPackage }),
      });

      const responseData = await response.json();

      console.log('Reservation created:', responseData);

    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9">
          <h2>Book Reservation</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Location:
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <br />
            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <br />
            <label>
              Select Package:
              <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                <option value="">Select a package</option>
                {packages.map((pack) => (
                  <option key={pack.id} value={pack.attributes.slug}>
                    {pack.attributes.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Book Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookReservation;
