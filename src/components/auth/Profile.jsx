import React from "react";
import myPic from "../../media/my_pic.jpg";
import ProfileCss from "../../css/auth/Profile.module.css";

export default function Profile() {
  return (
    <div className={ProfileCss.profileWrapper}>
      <div className={ProfileCss.profile}>
        <div className={ProfileCss.head}>
          <div className={ProfileCss.profileImg}>
            <img src={myPic} alt="img" />
          </div>
          <div className={ProfileCss.profileinfo}>
            <p className={ProfileCss.username}>
              <a href="/Prasad__bro">Prasad__bro</a>{" "}
            </p>
            <p className={ProfileCss.fullName}>Prasad Shinde</p>
          </div>
        </div>
        <div className={ProfileCss.suggestions}>
          <p className={ProfileCss.suggepara}>Suggestions For You</p>
          {/*below is sub component makeble  */}
          <div className={ProfileCss.accountSuggestions}>
            <div className={ProfileCss.head}>
              <div
                className={
                  ProfileCss.profileImg + " " + ProfileCss.suggeprofileImg
                }
              >
                <img src={myPic} alt="img" />
              </div>
              <div className={ProfileCss.profileinfo}>
                <a href="/prasad__bro">
                  <p className={ProfileCss.username}>Prasad__bro</p>
                </a>
                <p className={ProfileCss.fullName}>Prasad Shinde</p>
              </div>
              <div className={ProfileCss.followBtnWrap}>
                <button className={ProfileCss.followBtn}>Follow</button>
              </div>
            </div>
            <div className={ProfileCss.head}>
              <div
                className={
                  ProfileCss.profileImg + " " + ProfileCss.suggeprofileImg
                }
              >
                <img src={myPic} alt="img" />
              </div>
              <div className={ProfileCss.profileinfo}>
                <a href="/prasad__bro">
                  <p className={ProfileCss.username}>Prasad__bro</p>
                </a>
                <p className={ProfileCss.fullName}>Prasad Shinde</p>
              </div>
              <div className={ProfileCss.followBtnWrap}>
                <button className={ProfileCss.followBtn}>Follow</button>
              </div>
            </div>
            <div className={ProfileCss.head}>
              <div
                className={
                  ProfileCss.profileImg + " " + ProfileCss.suggeprofileImg
                }
              >
                <img src={myPic} alt="img" />
              </div>
              <div className={ProfileCss.profileinfo}>
                <a href="/prasad__bro">
                  <p className={ProfileCss.username}>Prasad__bro</p>
                </a>
                <p className={ProfileCss.fullName}>Prasad Shinde</p>
              </div>
              <div className={ProfileCss.followBtnWrap}>
                <button className={ProfileCss.followBtn}>Follow</button>
              </div>
            </div>
          </div>
        </div>
        <div className={ProfileCss.bottomLinks}>
          <a href="https://about.instagram.com/">About</a>
          <a href="https://about.instagram.com/">Help</a>
          <a href="https://about.instagram.com/">Press</a>
          <a href="https://about.instagram.com/">API</a>
          <a href="https://about.instagram.com/">Jobs</a>
          <a href="https://about.instagram.com/">Privacy</a>
          <a href="https://about.instagram.com/">Terms</a>
          <a href="https://about.instagram.com/">Locations</a>
          <a href="https://about.instagram.com/">Top Accounts</a>
          <a href="https://about.instagram.com/">Hashtag</a>
          <a href="https://about.instagram.com/">Language</a>
        </div>
        <p className={ProfileCss.creditInfo}>© Made  By <i className="fas fa-heart" aria-hidden="true"></i>  Prasad Shinde <b>/</b> prasadbro</p>
      </div>
    </div>
  );
}
