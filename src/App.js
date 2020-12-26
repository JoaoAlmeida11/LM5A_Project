import { BrowserRouter as Router } from "react-router-dom";
import NavCostum from "./components/Layout/NavCostum";
import { Routes } from "./Routes/Routes";

export default function App() {
  return (
    <header>
      <NavCostum />
    </header>
  );
}
