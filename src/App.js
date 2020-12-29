import NavCostum from "./components/Layout/NavCostum";
import { Routes } from "./Routes/Routes";
import { ConnectedRouter } from "connected-react-router";

export default function App({ history, context }) {
  return (
    <ConnectedRouter history={history} context={context}>
      <header>
        <NavCostum />
      </header>
      {Routes}
    </ConnectedRouter>
  );
}
