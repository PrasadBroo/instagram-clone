import { view } from "@risingstack/react-easy-state";
import React from "react";
import LoggedIn from "../auth/LoggedIn";
import LoggedOut from "../auth/LoggedOut";
import store from '../stores/store'

function HomePage() {
  return (
    <>
    {console.log(Boolean(store.auth.user))}
      {store.auth.user ? <LoggedIn/> : <LoggedOut/>}
    </>
  );
}

export default view(HomePage)