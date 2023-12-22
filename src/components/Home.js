// // Home.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { logoutUser } from '../redux/logoutSlice';

// const Home = ({ loggedInStatus, dispatch }) => {
//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser());
//       // After successful logout, you might want to redirect or perform other actions
//       window.location.href = "/login";
//     } catch (error) {
//       // Handle error, if any
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Home</h1>
//       <h1>Status: {loggedInStatus}</h1>
//       <div>
//           <p>Welcome, you are already logged in!</p>
//           <button onClick={handleLogout}>Logout</button>
//           <Link to="/logout">Logout</Link>
//       </div>
//     </div>
//   );
// };

// // Map the necessary state to props
// const mapStateToProps = (state) => ({
//   loggedInStatus: state.login_auths.loggedin || 'empty',
// });

// // Connect the component to the Redux store
// export default connect(mapStateToProps)(Home);


// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/userSlice';

function Home() {
  const currentUser = useSelector(selectCurrentUser);
  console.log("Username:", currentUser);
  const username = currentUser?.username || 'Guest';
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Navbar />
        </div>
        <div className="col-lg-9">
          <div className="jumbotron">
            <h1 className="display-4">Welcome {username}  to Executive Workspaces</h1>
            <p className="lead">
              Discover a new level of productivity in our premium executive workspaces.
            </p>
            <hr className="my-4" />
            <p>
              Our workspaces are designed with your success in mind. From comfortable
              offices to state-of-the-art meeting rooms, we've got everything you need to
              thrive in the business world.
            </p>
            <p className="lead">
              <Link to="/packages" className="btn btn-primary btn-lg" role="button">
                Explore Packages
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
