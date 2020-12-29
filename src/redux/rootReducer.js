import authReducer from "./FireBase/AuthFireBase";
import { combineReducers } from "redux";
import firebaseReducer from "react-redux-firebase";
//import { connectRouter } from "connected-react-router";
//import { locationReducer } from "redux-history";

// this is an example
// import usersReducer from './usersReducer'
// import postsReducer from './postsReducer'

const rootReducer = combineReducers({
  // location: locationReducer,
  // router: connectRouter(history),
  auth: authReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
