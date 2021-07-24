import HomePage from "./pages/HomePage";
import "./css/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsernamePage from "./pages/UsernamePage";
import { useEffect, useState} from "react";
import { auth } from "./services/firebase";
import store from "./stores/store";
import { view } from "@risingstack/react-easy-state";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import DefaultLoader from "./components/DefaultLoader";
import PostPage from "./pages/PostPage";

function App() {
  useEffect(() => {
    auth().onAuthStateChanged((user) => {store.auth.user = user;setLoading(false)});
  }, []);

  const [loading,setLoading] = useState(true);
  return (
    !loading ?
    <Router>
      <Switch>
        <Route exact path="/" component={() => <HomePage />}></Route>
        <Route
          path="/settings"
          component={() => <SettingsPage />}
        ></Route>
        <Route
          exact
          path="/:username"
          component={() => <UsernamePage />}
        ></Route>
        <Route
          exact
          path="/accounts/emailsignup"
          component={() => <SignupPage />}
        ></Route>
        <Route
          exact
          path="/accounts/login"
          component={() => <LoginPage />}
        ></Route>
        <Route
          exact
          path="/post/:postid"
          component={() => <PostPage />}
        ></Route>
      </Switch>
    </Router>
    :
    <DefaultLoader/>
  );
}

export default view(App);
