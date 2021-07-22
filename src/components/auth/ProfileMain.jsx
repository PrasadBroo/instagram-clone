import React from "react";
import myPic from "../../media/my_pic.jpg";
import ProfileMainCss from "../../css/auth/ProfileMain.module.css";

export default function ProfileMain() {
  return (
    <div>
      <div className={ProfileMainCss.wrap}>
        <div className={ProfileMainCss.profilePic}>
          <img src={myPic} alt="profile_pic" />
        </div>
        <div className={ProfileMainCss.profileInfo}>
          <div className={ProfileMainCss.secone}>
            <p>prasad__bro</p>
            <button>Edit Profile</button>
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
    </div>
  );
}
