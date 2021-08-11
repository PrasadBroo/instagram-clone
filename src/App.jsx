import HomePage from "./pages/HomePage";
import "./css/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsernamePage from "./pages/UsernamePage";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "./services/firebase";
import { view } from "@risingstack/react-easy-state";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import DefaultLoader from "./components/DefaultLoader";
import PostPage from "./pages/PostPage";
import mystore from "./stores/store";
// import { getUserDetailsByUid } from "./utils/firebase_api";

function App() {
  const isMounted = React.useRef(true);
  useEffect(() => {
    auth().onAuthStateChanged((userSate) => {
      mystore.auth.user = userSate;
      if (!userSate) {
        setLoading(false);
      }
      if (userSate) {
        const usersRef = firestore().collection("users");
      usersRef
        .doc(mystore.auth.user.uid)
        .onSnapshot((next) => {if(isMounted.current){mystore.currentUser = next.data();setLoading(false)}});
        // getUserDetailsByUid().then((res) => {
        //   if (isMounted) {
        //     mystore.currentUser = res.data;
        //     setLoading(false);
        //   }
        // });
      }
    });

    return () => (isMounted.current = false);
  }, []);

  const [loading, setLoading] = useState(true);
  return !loading ? (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <HomePage />}></Route>
        <Route path="/settings" component={() => <SettingsPage />}></Route>
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
        <Route path="/post/:postid" component={() => <PostPage />}></Route>
        <Route
          exact
          path="/:username"
          component={() => <UsernamePage />}
        ></Route>
      </Switch>
    </Router>
  ) : (
    <DefaultLoader />
  );
}

export default view(App);
