import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePage from "./components/Homepage/HomePage"
import League from "./components/League/League"
import Club from './components/Club/Club';
import Player from './components/Player/Player';
import NavCostum from "./components/Layout/NavCostum";
import Ideal11 from "./components/Ideal11/Ideal11";
import Login from './components/Authentication/Login';
import SignIn from './components/Authentication/SignIn';


export default function App() {
  return (
    <Router>
        <header>
          <NavCostum />
        
        <Switch>
          {/* o deployment está a mostrar lm5a_project mas o NavBar apenas mostra o path
              é preciso ver se é necessário adicionar o nome do projeto ao Route de todos
          */}
          <Route exact path="/lm5a_project/" component={HomePage}></Route>
          <Route path="/lm5a_project/league" component={League}></Route>
          <Route path="/lm5a_project/club" component={Club}></Route>
          <Route path="/lm5a_project/player" component={Player}></Route>
          <Route path="/lm5a_project/ideal11" component={Ideal11}></Route>
          <Route path="/lm5a_project/login" component={Login}></Route>
          <Route path="/lm5a_project/signIn" component={SignIn}></Route>
        </Switch>
</header>
    </Router>
  );
}