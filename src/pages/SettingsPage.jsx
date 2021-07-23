import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import ChangePassword from "../components/auth/ChangePassword";
import EditProfile from "../components/auth/EditProfile";
import Navbar from "../components/auth/Navbar";
import SettingsPageCss from "../css/auth/SettingsPage.module.css";

export default function Settings() {
  return (
    <>
      <Navbar />
      <div className={SettingsPageCss.settings}>
        <div className={SettingsPageCss.container}>
          <ul className={SettingsPageCss.list}>
            <li>
              <Link to="/settings/edit">Edit Profile</Link>
            </li>
            <li>
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
