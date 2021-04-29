import HomePage from "./pages/HomePage";
import "./css/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsernamePage from "./pages/UsernamePage";
import { useEffect } from "react";
import {auth} from './services/firebase'
import store from './stores/store'
import { view } from "@risingstack/react-easy-state";

function App() {
  useEffect(()=>{
    auth().onAuthStateChanged(user=> user ?  store.auth.user =user : store.auth.user = auth().currentUser);
},[])
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <HomePage />}></Route>
        <Route
          exact
          path="/:username"
          component={() => <UsernamePage />}
        ></Route>
        {/* <Route exact path="/login" component={()=> < Loginpage login={(email,pass)=>loginuser(email,pass)} user={user} />}></Route>
          <Route exact path="/signup" component={()=> < Signupage signup={(e,p,cp)=>signupuser(e,p,cp)} user={user}  />}></Route> */}
      </Switch>
    </Router>
  );
}

export default view(App);
