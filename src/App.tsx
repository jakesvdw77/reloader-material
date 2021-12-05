import "./App.css";
import "@fontsource/roboto";
import UserLogin from "./views/login/UserLogin";
import Welcome from "./views/Welcome";
import AppHeader from "./views/layout/AppHeader";
import { Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import HomePage from "./views/HomePage";
import { useAppSelector, useAppDispatch } from "./store/hooks";

function App() {
  const authenticated = useAppSelector((state) => state.isAuthenticated);


  return (
    <div className="App">
      <AppHeader></AppHeader>

      <Switch>
        <Route path="/" exact>
          {!authenticated && <Redirect to="/welcome" />}
          {authenticated && <Redirect to="/home" />}
        </Route>

        <Route path="/welcome">
          <Welcome />
        </Route>

        {authenticated && (
          <Route path="/home">
            <HomePage />
          </Route>
        )}

        <Route path="/login">
          <UserLogin></UserLogin>
        </Route>

        <Route path="*">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
