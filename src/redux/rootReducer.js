import authReducer from "./FireBase/AuthFireBase";
import { combineReducers } from "redux";
import firebaseReducer from "react-redux-firebase";

// this is an example
// import usersReducer from './usersReducer'
// import postsReducer from './postsReducer'
import { firebase } from "firebase/app";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
