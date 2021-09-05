import { view } from "@risingstack/react-easy-state";
import React, { useEffect } from "react";
import LoggedIn from "../auth/LoggedIn";
import LoggedOut from "../auth/LoggedOut";
import store from '../stores/store'
import mystore from './../stores/store';

function HomePage() {
  useEffect(()=>{
    mystore.alert.show = false;
  },[])
  return (
    <>
      {store.auth.user ? <LoggedIn/> : <LoggedOut/>}
    </>
  );
}

export default view(HomePage)