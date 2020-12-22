import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from "./components/Homepage/HomePage"
import League from "./components/League/League"
import Club from './components/Club/Club';
import Player from './components/Player/Player';

export default function App() {
  return (
    <Router>
        <div className="App">
      
        </div>
        <Switch>
          <Route >
            <HomePage exact path="/"/>
            <League path="/league" />
            <Club  path="/club"/>
            <Player path="/player"/>
          </Route>
        </Switch>

    </Router>
  );
}