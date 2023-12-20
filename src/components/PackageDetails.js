// PackageDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './sidebar';

function PackageDetails() {
  const { slug } = useParams();
  const [packageDetails, setPackageDetails] = useState({});

  useEffect(() => {
    async function fetchPackageDetails() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/packages/${slug}`);
        const data = await response.json();

        // Check if data property exists
        if (data.data) {
          setPackageDetails(data.data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    }

    fetchPackageDetails();
  }, [slug]);

  const handleBookNow = (selectedPackage) => {
    // Placeholder logic for handling the booking process
    console.log('Booking now:', selectedPackage);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9">
          <h2>Package Details</h2>
          <div>
            <h3>{packageDetails.attributes?.name}</h3>
            <p>Description: {packageDetails.attributes?.description}</p>
            <p>Price: ${packageDetails.attributes?.price}</p>
            <p>Image URL: {packageDetails.attributes?.image_url}</p>
            {/* Add more details as needed */}

            {/* View more packages link */}
            <p>
              <Link to="/packages">View more packages</Link>
            </p>
          </div>

          {/* Book Now button */}
          <div>
            <button onClick={() => handleBookNow(packageDetails)}>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
