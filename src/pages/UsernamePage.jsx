import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/auth/Navbar";
import ProfileMain from "../components/auth/ProfileMain";
import mystore from "./../stores/store";

function UsernamePage() {

  return mystore.auth.user ? (
    <>
      <div className="navProfile" style={{ backgroundColor: "#FAFAFA" }}>
        <Navbar />
        <ProfileMain />
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default view(UsernamePage);
