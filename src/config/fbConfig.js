import firebase from "firebase/app";
import "firebase/auth" 

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyD5tJuA8Jl4K80CAC4oYOJO6FjW1modGv8",
    authDomain: "soccerdatafinnale.firebaseapp.com",
    projectId: "soccerdatafinnale",
    storageBucket: "soccerdatafinnale.appspot.com",
    messagingSenderId: "1068662340735",
    appId: "1:1068662340735:web:71cf93a4a6d150c933934a",
    measurementId: "G-NL39DQ1JJ8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase


  
