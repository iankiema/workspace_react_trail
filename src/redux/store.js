import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';
import loginSlice from './loginSlice';
import logoutReducer from './logoutSlice';
import packagesReducer from './packagesSlice';
import packageDetailReducer from './packageDetailSlice';
import reservationReducer from './reservationSlice';
import userReducer from './userSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    signup_auths: signupSlice,
    login_auths: loginSlice,
    logout_auths: logoutReducer,
    packages: packagesReducer,
    packageDetail: packageDetailReducer,
    reservations: reservationReducer,
  },
});

export default store;