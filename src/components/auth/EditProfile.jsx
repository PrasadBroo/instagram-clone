import React from "react";
import EditProfileCss from "../../css/auth/EditProfile.module.css";
import myPic from "../../media/my_pic.jpg";

export default function EditProfile() {
  return (
    <div className={EditProfileCss.wrap}>
      <div className={EditProfileCss.picName}>
        <div className={EditProfileCss.pic}>
          <img src={myPic} alt="user-pic" />
        </div>
        <div>
          <p>Prasad Shinde</p>
          <button>Change Profile Photo</button>
        </div>
      </div>
      <div className={EditProfileCss.OldPass}>
        <p>Name</p>
        <input type="text" name="oldPass" />
      </div>
      <div className={EditProfileCss.NewPass}>
        <p>Username</p>
        <input type="text" name="newPass" />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Website</p>
        <input type="text" name="ConfirmPass" />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Bio</p>
        <textarea type="text" name="ConfirmPass" />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Email</p>
        <input type="email" name="ConfirmPass" />
      </div>
      <div className={EditProfileCss.btns}>
        <button>Change Password</button>
        <button>Forget Password</button>
      </div>
    </div>
  );
}
