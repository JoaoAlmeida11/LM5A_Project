// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Application main routes

// Store of app
import configureAppStore from './redux/configureStore';

// components
import App from './App';

/* import firebase from './config/fbConfig'; */

const store = configureAppStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
