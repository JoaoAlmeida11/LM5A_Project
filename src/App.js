// dependencies
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/Homepage/HomePage';
import League from './components/League/League';
import Club from './components/Club/Club';
import Player from './components/Player/Player';
import Login from './components/Authentication/Login';
import SignIn from './components/Authentication/SignUp';
import Footer from './components/Layout/Footer';
import NavCostum from './components/Layout/NavCostum';

export const App = () => {
	return (
		<Router>
			<Switch>
				{/*inside a switch so it properly connects to store and passes the test*/}
				<Route path="/soccer/" component={NavCostum}></Route>
			</Switch>
			<Switch>
				<Route exact path="/soccer/" component={HomePage}></Route>
				<Route path="/soccer/league/:leagueId/" component={League}></Route>
				<Route path="/soccer/club/:seasonId/:clubId/" component={Club}></Route>
				<Route
					path="/soccer/player/:seasonId/:playerId/"
					component={Player}
				></Route>
				<Route path="/soccer/login/" component={Login}></Route>
				<Route path="/soccer/signIn/" component={SignIn}></Route>
			</Switch>
			<Footer />
		</Router>
	);
};
export default App;
