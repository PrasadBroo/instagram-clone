import React from "react";
import myPic from "../../media/my_pic.jpg";
import ChangePasswordCss from "../../css/auth/ChangePassword.module.css";

export default function ChangePassword() {
  return (
    <div className={ChangePasswordCss.wrap}>
      <div className={ChangePasswordCss.picName}>
        <div className={ChangePasswordCss.pic}>
          <img src={myPic} alt="user-pic" />
        </div>
        <p>Prasad Shinde</p>
      </div>
      <div className={ChangePasswordCss.OldPass}>
        <p>Old Password</p>
        <input type="password" name="oldPass" />
      </div>
      <div className={ChangePasswordCss.NewPass}>
        <p>New Password</p>
        <input type="password" name="newPass" />
      </div>
      <div className={ChangePasswordCss.ConfirmPass}>
        <p>Confirm Password</p>
        <input type="password" name="ConfirmPass" />
      </div>
      <div className={ChangePasswordCss.btns}>
        <button>Change Password</button>
        <button>Forget Password</button>
      </div>
    </div>
  );
}
