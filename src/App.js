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
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/league" component={League}></Route>
          <Route path="/club" component={Club}></Route>
          <Route path="/player" component={Player}></Route>
          <Route path="/ideal11" component={Ideal11}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signIn" component={SignIn}></Route>
        </Switch>
</header>
    </Router>
  );
}