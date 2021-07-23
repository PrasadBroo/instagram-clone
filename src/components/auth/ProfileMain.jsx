import React from "react";
import myPic from "../../media/my_pic.jpg";
import ProfileMainCss from "../../css/auth/ProfileMain.module.css";
import ProfileMainModal from "../modals/ProfileMainModal";
import { Link } from "react-router-dom";

export default function ProfileMain() {
  return (
    <div>
      <div className={ProfileMainCss.wrap}>
        <ProfileMainModal/>
        <div className={ProfileMainCss.profilePic}>
          <img src={myPic} alt="profile_pic" />
        </div>
        <div className={ProfileMainCss.profileInfo}>
          <div className={ProfileMainCss.secone}>
            <p>prasad__bro</p>
            <Link to="/settings/edit">Edit Profile</Link>
            <button>
              <ion-icon name="settings-outline"></ion-icon>
            </button>
          </div>
          <div className={ProfileMainCss.sectwo}>
            <p>
              <b>2</b> posts
            </p>
            <p>
              {" "}
              <b>1054</b> followers
            </p>
            <p>
              {" "}
              <b>456</b> following
            </p>
          </div>
          <div className={ProfileMainCss.secthree}>
            <h1>Prasad Shinde</h1>
            <p>🍰Wish Me On 2 Dec🍰</p>
            <p>😍Favourite Star-Amir Khan 😍</p>
          </div>
        </div>
      </div>
      <div className={ProfileMainCss.hrline}>
        <hr />
      </div>
      <div className={ProfileMainCss.posts}>
        <div className={ProfileMainCss.postsIcon}>
          <ion-icon name="apps-outline"></ion-icon>
        </div>

        <p>POSTS</p>
      </div>
      <div className={ProfileMainCss.sharePhotos}>
        <div className={ProfileMainCss.cameraIcon}>
        <ion-icon name="camera-outline"></ion-icon>
        </div>
        <div className={ProfileMainCss.text}>
          <p>Share Photos</p>
        </div>
        <div className={ProfileMainCss.textTwo}>
          <p>When you share photos, they will appear on your profile.</p>
        </div>
        <div className={ProfileMainCss.uploadLink}>
          <button>Share your first photo</button>
        </div>
      </div>
    </div>
  );
}
