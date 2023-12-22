// Packages.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackagesData, selectAllPackages, selectPackagesStatus } from '../redux/packagesSlice';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './sidebar';

function Packages() {
  const dispatch = useDispatch();
  const packages = useSelector(selectAllPackages);
  const packagesStatus = useSelector(selectPackagesStatus);

  useEffect(() => {
    dispatch(fetchPackagesData());
  }, [dispatch]);

  if (packagesStatus === 'loading') {
    return (
      <div className="container text-center mt-5">
        <h2>Packages</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (packagesStatus === 'failed') {
    return (
      <div className="container text-center mt-5">
        <h2>Packages</h2>
        <p>Error loading packages. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className='row'>
          <div className="col-lg-3">
            <Navbar />
          </div>
          <div className='col-lg-9'>
            <h2 className="mb-4">Packages</h2>
            <div className="row">
              {packages.map((packaged) => (
                <div key={packaged.attributes.slug} className="col-md-4 mb-4">
                  <Link
                    to={`/packages/${packaged.attributes.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    className="card-link"
                  >
                    <div className="card clickable">
                      <img
                        src={packaged.attributes.image_url}
                        className="card-img-top"
                        alt={packaged.attributes.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{packaged.attributes.name}</h5>
                        <p className="card-text">{packaged.attributes.description}</p>
                        <p className="card-text">${packaged.attributes.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        
      </div>
       
    </div>
  );
}

export default Packages;
