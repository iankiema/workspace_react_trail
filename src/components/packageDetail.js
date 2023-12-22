// PackageDetail.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackageDetail, selectPackageDetail, selectPackageDetailStatus } from '../redux/packageDetailSlice';
import Navbar from './sidebar';

function PackageDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const packageDetail = useSelector(selectPackageDetail);
  const status = useSelector(selectPackageDetailStatus);

  useEffect(() => {
    dispatch(fetchPackageDetail(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading package detail</div>;
  }

  return (
    <div className="container mt-5">
        <div className='row'>
            <div className="col-lg-3">
            <Navbar />
            </div>
            <div className='col-lg-9'>
                {packageDetail && (
                <>
                <h2>{packageDetail.attributes.name}</h2>
                <div className="row">
                    <div className="col-md-8 mb-4 mx-auto ">
                    <div className="card">
                        <img src={packageDetail.attributes.image_url} className="card-img-top" alt={packageDetail.attributes.name} />
                        <div className="card-body">
                        <p className="card-text">{packageDetail.attributes.description}</p>
                        <p className="card-text">${packageDetail.attributes.price}</p>
                        <Link to={`/packages/${packageDetail.attributes.slug}/reserve`} className="btn btn-primary mb-2 mr-2">
                            Reserve Now
                        </Link>
                        <Link to="/packages" className="btn btn-secondary ml-2">
                            Back to Packages
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </>
            )}
            </div>
               
        </div>
        
    </div>
  );
}

export default PackageDetail;
