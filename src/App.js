// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/home';
import SplashScreen from './components/splashscreen';
import Signup from './auth/register';
import Login from './auth/login';
import Logout from './auth/logout';
import { checkLoginStatus } from './redux/loginSlice';
import Packages from './components/packages';
import PackageDetail from './components/packageDetail';
import ReservationForm from './components/reservationform';
import ReservationList from './components/reserationlist';



function App() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login_auths.loggedin);

  const [userData, setUserData] = useState({});

  const retrieveUserData = () => {
    // Retrieve the content from localStorage
    const userDataJSON = localStorage.getItem('userData');

    // Parse the JSON content
    const storedUserData = JSON.parse(userDataJSON);
    console.log(storedUserData.extractedUserData);
    return storedUserData.extractedUserData || {};
  };

  useEffect(() => {
    const fetchLoginStatus = () => {
      dispatch(checkLoginStatus());
    };

    // Call fetchLoginStatus when the component mounts
    if (loginStatus === 'empty') {
      fetchLoginStatus();
    }

    if (loginStatus === 'true') {
      setUserData(retrieveUserData());
    }
  }, [dispatch, loginStatus]);

  if (loginStatus !== 'empty') {
    return (
      <div className="body">
        <Router>
          <div className="pageSection">
            <Routes>
              <Route
                path="/"
                exact
                element={
                  loginStatus === 'true' ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/splash" />
                  )
                }
              />
              <Route path="/home" element={<Home login={loginStatus} />} />
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login message={loginStatus} />} />
              <Route path="/logout" element={Logout} />
             
              <Route path="/packages" element={<Packages />} />
        
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/packages/:slug" element={<PackageDetail />} />
              <Route path="/packages/:slug/reserve" element={<ReservationForm />} />
              <Route path="/packages/:slug/reserve" render={({ match }) => <ReservationForm packageSlug={match.params.slug} />} />
              <Route path="/reservations" element={<ReservationList/>} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;