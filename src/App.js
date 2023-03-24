import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Switch, Route } from "react-router-dom";
import Products from "./components/Products";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" Component={Home} />
        <Route exact path="/products" Component={Products} />
      </Switch>
    </>
  );
}

export default App;
