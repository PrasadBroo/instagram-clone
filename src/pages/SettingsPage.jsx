import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import ChangePassword from "../components/auth/ChangePassword";
import EditProfile from "../components/auth/EditProfile";
import Navbar from "../components/auth/Navbar";
import SettingsPageCss from "../css/auth/SettingsPage.module.css";
import mystore from "../stores/store";


function Settings() {
  let { pathname } = useLocation();
  return (
    <>
      <Navbar />
      {mystore.alert.show && <Alert message={mystore.alert.message}/>}
      <div className={SettingsPageCss.settings}>
        <div className={SettingsPageCss.container}>
          <ul className={SettingsPageCss.list}>
            <li className={pathname ==='/settings/edit' ? SettingsPageCss.addBorder : null}>
              <Link to="/settings/edit">Edit Profile</Link>
            </li>
            <li className={pathname ==='/settings/changePassword' ? SettingsPageCss.addBorder : null}>
              <Link to="/settings/changePassword">Change Password</Link>
            </li>
          </ul>
          <div className={SettingsPageCss.sideContainer}>
            <Switch>
              <Route exact path="/settings/edit">
                <EditProfile />
              </Route>
              <Route path="/settings/changePassword">
                <ChangePassword />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}
export default view(Settings)