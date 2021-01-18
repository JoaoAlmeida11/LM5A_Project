// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

// css files
// TODO: why?
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Application main routes

// Store of app
import store, { rrfProps } from './redux/configureStore';

// components
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<App />
			</ReactReduxFirebaseProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
