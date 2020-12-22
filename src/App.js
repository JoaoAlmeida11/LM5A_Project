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
import NavCostum from "./components/Layout/NavCostum";

export default function App() {
  return (
    <Router>
        <div>
          <NavCostum />
        </div>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/league" component={League}></Route>
          <Route path="/club" component={Club}></Route>
          <Route path="/player" component={Player}></Route>
          <Route path="/ideal11" component={Player}></Route>
        </Switch>

    </Router>
  );
}