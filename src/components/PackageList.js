// PackageList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../redux/actions/packageActions';

const PackageList = () => {
  const dispatch = useDispatch();
  const packages = useSelector(state => state.packages.packages);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  return (
    <div>
      <h2>Packages</h2>
      {packages.map((packaged) => (
        <div key={packaged.id}>
          <h3>{packaged.attributes.name}</h3>
          <p>{packaged.attributes.description}</p>
          <p>Price: ${packaged.attributes.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PackageList;
