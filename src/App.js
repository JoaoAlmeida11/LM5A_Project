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
				<Route path="/lm5a_project/" component={NavCostum}></Route>
			</Switch>
			<Switch>
				<Route exact path="/lm5a_project/" component={HomePage}></Route>
				<Route
					path="/lm5a_project/league/:leagueId/"
					component={League}
				></Route>
				<Route
					path="/lm5a_project/club/:seasonId/:clubId/"
					component={Club}
				></Route>
				<Route
					path="/lm5a_project/player/:seasonId/:playerId/"
					component={Player}
				></Route>
				<Route path="/lm5a_project/login/" component={Login}></Route>
				<Route path="/lm5a_project/signIn/" component={SignIn}></Route>
			</Switch>
			<Footer />
		</Router>
	);
};
export default App;
