import HomePage from "./pages/HomePage";
import "./css/main.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsernamePage from "./pages/UsernamePage";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <HomePage />}></Route>
        <Route
          exact
          path="/:username"
          component={() => <UsernamePage />}
        ></Route>
        <Route exact path="/test" component={() => <Test />}></Route>
        {/* <Route exact path="/login" component={()=> < Loginpage login={(email,pass)=>loginuser(email,pass)} user={user} />}></Route>
          <Route exact path="/signup" component={()=> < Signupage signup={(e,p,cp)=>signupuser(e,p,cp)} user={user}  />}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
