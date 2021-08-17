import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import EditProfileCss from "../../css/auth/EditProfile.module.css";
import mystore from "../../stores/store";
import { updateProfileDetails } from "../../utils/firebase_api";
import LocalSpinner from "../spinners/LocalSpinner";

function EditProfile() {
  const currentUser = mystore.currentUser;
  const handelProfileChanges = async()=>{
    setIsUpdating(true);
    const {err} = await updateProfileDetails(name,email,username,bio,website);
    if(err){
      alert(err.message)
      return setIsUpdating(false);
    }
    setIsUpdating(false);
  }
  const [name,setName] = useState(currentUser.fullName)
  const [email,setEmail] = useState(currentUser.email)
  const [bio,setBio] = useState(currentUser.bio)
  const [website,setWebsite] = useState(currentUser.website)
  const [username,setUsername] = useState(currentUser.username)
  const [isUpdating,setIsUpdating] = useState(false)
  return (
    <div className={EditProfileCss.wrap}>
      {isUpdating && <LocalSpinner/>}
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
          value={name}
          onChange={(e)=>setName(e.target.value)}
          disabled={name.trim().length ===0}
        />
      </div>
      <div className={EditProfileCss.NewPass}>
        <p>Username</p>
        <input
          type="text"
          name="newPass"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          disabled={username.trim().length ===0}
        />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Website</p>
        <input type="text" name="ConfirmPass" value={website} onChange={(e)=>setWebsite(e.target.value)} />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Bio</p>
        <textarea type="text" name="ConfirmPass" value={bio} onChange={(e)=>setBio(e.target.value)}  />
      </div>
      <div className={EditProfileCss.ConfirmPass}>
        <p>Email</p>
        <input
          type="email"
          name="ConfirmPass"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          disabled={email.trim().length ===0}
        />
      </div>
      <div className={EditProfileCss.btns}>
        <button className={EditProfileCss.submitBtn} onClick={handelProfileChanges}>Submit</button>
      </div>
    </div>
  );
}
export default view(EditProfile);
