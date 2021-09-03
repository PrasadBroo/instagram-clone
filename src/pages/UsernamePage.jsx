import { view } from "@risingstack/react-easy-state";
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Alert from "../components/Alert";
import Navbar from "../components/auth/Navbar";
import NotFound from "../components/auth/NotFound";
import ProfileMain from "../components/auth/ProfileMain";
import mystore from "./../stores/store";


function UsernamePage() {
  useEffect(()=>{
    mystore.alert.show = false;
    return ()=>mystore.alert.show = false;
  },[])
  

  return mystore.auth.user ? (
    <>
      <div className="navProfile" style={{ backgroundColor: "#FAFAFA" }}>
        <Navbar />
        {!mystore.showNotFound?<ProfileMain />:<NotFound/>}
        {mystore.alert.show && <Alert message={mystore.alert.message}/>}
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default view(UsernamePage);
