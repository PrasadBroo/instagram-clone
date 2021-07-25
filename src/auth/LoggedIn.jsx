import { view } from "@risingstack/react-easy-state";
import React from "react";
import MainBody from "../components/auth/MainBody";
import Navbar from "../components/auth/Navbar";
import LoggedInCss from "../css/auth/LoggedIn.module.css";

function LoggedIn() {
  return (
    <>
      <div className={LoggedInCss.loggedin}>
        <Navbar />
        <MainBody />
      </div>
    </>
  );
}

export default view(LoggedIn);
