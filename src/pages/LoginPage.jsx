import { view } from "@risingstack/react-easy-state";
import React from "react";
import Login from "../components/auth/Login";
import { Redirect } from "react-router-dom";
import store from "../stores/store";
function LoginPage() {
  return (
    <div className="login-page">
      {store.auth.user ? <Redirect to="/" /> : <Login />}
    </div>
  );
}

export default view(LoginPage);
