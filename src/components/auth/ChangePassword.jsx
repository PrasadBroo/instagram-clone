import { view } from "@risingstack/react-easy-state";
import React from "react";
import ChangePasswordCss from "../../css/auth/ChangePassword.module.css";
import mystore from "../../stores/store";

function ChangePassword() {
  const currentUser = mystore.currentUser;
  return (
    <div className={ChangePasswordCss.wrap}>
      <div className={ChangePasswordCss.picName}>
        <div className={ChangePasswordCss.pic}>
          <img src={currentUser.profilePic} alt="user-pic" />
        </div>
        <p>{currentUser.fullName}</p>
      </div>
      <div className={ChangePasswordCss.OldPass}>
        <p>Old Password</p>
        <input type="password" name="oldPass" disabled />
      </div>
      <div className={ChangePasswordCss.NewPass}>
        <p>New Password</p>
        <input type="password" name="newPass" disabled />
      </div>
      <div className={ChangePasswordCss.ConfirmPass}>
        <p>Confirm Password</p>
        <input type="password" name="ConfirmPass" disabled />
      </div>
      <div className={ChangePasswordCss.btns}>
        <button>Change Password</button>
        <button>Forget Password</button>
      </div>
    </div>
  );
}

export default view(ChangePassword);
