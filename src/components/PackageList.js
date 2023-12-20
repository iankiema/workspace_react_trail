import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './PackageList.css';

function PackageList() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPackages() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/packages');
        const responseData = await response.json();

        // Check if data property exists and is an array
        if (responseData.data && Array.isArray(responseData.data)) {
          setPackages(responseData.data);
        } else {
          console.error('Invalid data format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    }

    getPackages();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Navbar />
        </div>

        <div className="col-lg-9">
          <h2>Our Packages</h2>
          <p>The best packages in the market</p>

          {packages.map((pack) => (
            <div key={pack.id}>
              <div>
                <Link to={`/packages/${pack.attributes.slug}`}>
                  <h3 className="package-title">{pack.attributes.name}</h3>
                </Link>
              </div>
              <p>{pack.attributes.description}</p>

              {/* Social Icons */}
              <div className="social-icons-container">
                <button className="icon-button"><FontAwesomeIcon icon={faFacebookF} /></button>
                <button className="icon-button"><FontAwesomeIcon icon={faTwitter} /></button>
                <button className="icon-button"><FontAwesomeIcon icon={faInstagram} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PackageList;
