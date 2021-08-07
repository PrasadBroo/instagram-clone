import { view } from "@risingstack/react-easy-state";
import React from "react";
import EditProfileCss from "../../css/auth/EditProfile.module.css";
import mystore from "../../stores/store";

function EditProfile() {
  const currentUser = mystore.currentUser;
  return (
    <div className={EditProfileCss.wrap}>
      <div className={EditProfileCss.picName}>
        <div className={EditProfileCss.pic}>
          <img src={currentUser.profilePic} alt="user-pic" />
        </div>
        <div>
          <p>{currentUser.fullName}</p>
          <button>Change Profile Photo</button>
        </div>
      </div>
      <div className={EditProfileCss.OldPass}>
        <p>Name</p>
        <input
          type="text"
          name="oldPass"
          value={currentUser.fullName}
          disabled
        />
      </div>
      <div className={EditProfileCss.NewPass}>
        <p>Username</p>
        <input
          type="text"
          name="newPass"
          value={currentUser.username}
          disabled
        />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Website</p>
        <input type="text" name="ConfirmPass" disabled />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Bio</p>
        <textarea type="text" name="ConfirmPass" disabled />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Email</p>
        <input
          type="email"
          name="ConfirmPass"
          value={currentUser.email}
          disabled
        />
      </div>
      <div className={EditProfileCss.btns}>
        <button>Change Password</button>
        <button>Forget Password</button>
      </div>
    </div>
  );
}
export default view(EditProfile);
