// dependencies
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { Switch, Route } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import League from './components/League/League';
import Club from './components/Club/Club';
import Player from './components/Player/Player';
import Ideal11 from './components/Ideal11/Ideal11';
import Login from './components/Authentication/Login';
import SignIn from './components/Authentication/SignIn';
import Footer from './components/Layout/Footer';
import NavCostum from './components/Layout/NavCostum';

export default function App({ store, history }) {
	console.log('store', store);
	console.log('history', history);

	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<NavCostum />
				<Switch>
					<Route exact path="/" component={HomePage}></Route>
					<Route
						path="/lm5a_project/league/:leagueId/"
						children={League}
					></Route>
					<Route path="/lm5a_project/club/:clubId/" children={Club}></Route>
					<Route
						path="/lm5a_project/player/:playerId/"
						children={Player}
					></Route>
					<Route path="/lm5a_project/ideal11/" component={Ideal11}></Route>
					<Route path="/lm5a_project/login/" component={Login}></Route>
					<Route path="/lm5a_project/signIn/" component={SignIn}></Route>
				</Switch>
				<Footer />
			</ConnectedRouter>
		</Provider>
	);
}
