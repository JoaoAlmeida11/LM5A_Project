import authReducer from "./FireBase/AuthFireBase";
import { combineReducers } from "redux";
import firebaseReducer from "react-redux-firebase";
import { connectRouter } from "connected-react-router";

// this is an example
// import usersReducer from './usersReducer'
// import postsReducer from './postsReducer'

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    firebase: firebaseReducer,
  });

export default rootReducer;
