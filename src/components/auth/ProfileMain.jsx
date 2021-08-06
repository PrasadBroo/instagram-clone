import React, { useEffect, useState } from "react";
import myPic from "../../media/my_pic.jpg";
import ProfileMainCss from "../../css/auth/ProfileMain.module.css";
import ProfileMainModal from "../modals/ProfileMainModal";
import { Link } from "react-router-dom";
import modalStore from "../../stores/modalStore";
import FollowModal from "../modals/FollowModal";
import { view } from "@risingstack/react-easy-state";
import { addPost, getUserDetails } from "../../utils/fireutils";
import UserPost from "../subcomponents/UserPost";
import mystore from './../../stores/store';

function ProfileMain() {
  useEffect(() => {
    document.body.style.backgroundColor = "#FAFAFA";
    fetchDatails();
  }, []);
  async function fetchDatails() {
    let user_details = await getUserDetails();
    console.log(mystore.auth.user);
  }
  const [hasPosts, setHasPosts] = useState(true);
  return (
    <div className="ProfilePage">
      <div className={ProfileMainCss.profileWrap}>
        <div className={ProfileMainCss.wrap}>
          <ProfileMainModal />
          <FollowModal />
          <div className={ProfileMainCss.profilePic}>
            <img src={myPic} alt="profile_pic" />
          </div>
          <div className={ProfileMainCss.profileInfo}>
            <div className={ProfileMainCss.secone}>
              <p>prasad_bro</p>
              <Link to="/settings/edit" className={ProfileMainCss.editProLink}>
                Edit Profile
              </Link>
              <button
                onClick={() => (modalStore.userNamePageModal.display = true)}
              >
                <ion-icon name="settings-outline"></ion-icon>
              </button>
            </div>
            <div className={ProfileMainCss.secOnemobile}>
              <Link to="/settings/edit" className={ProfileMainCss.editProLinkM}>
                Edit Profile
              </Link>
            </div>

            <div className={ProfileMainCss.sectwo}>
              <p>
                <b>2</b> posts
              </p>
              <button
                onClick={() => {
                  modalStore.followModal.display = true;
                  modalStore.followModal.type = "followers";
                }}
              >
                <b>1054</b> followers
              </button>
              <button
                onClick={() => {
                  modalStore.followModal.display = true;
                  modalStore.followModal.type = "followings";
                }}
              >
                <b>168</b> following
              </button>
            </div>
            <div className={ProfileMainCss.secthree}>
              <h1>Prasad Shinde</h1>
              <p>🍰Wish Me On 2 Dec🍰</p>
              <p>😍Favourite Star-Amir Khan 😍</p>
            </div>
          </div>
        </div>
        <div className={ProfileMainCss.mobileFollowInfo}>
          <ul className={ProfileMainCss.followInfo}>
            <li>
              <p>
                <b>2</b> posts
              </p>
            </li>
            <li>
              <p>
                {" "}
                <b>1054</b> followers
              </p>
            </li>
            <li>
              <p>
                {" "}
                <b>456</b> following
              </p>
            </li>
          </ul>
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
        <div
          className={ProfileMainCss.sharePhotos}
          style={{ display: hasPosts ? "none" : "block" }}
        >
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
            <input
              type="file"
              accept="image/*"
              alt="Input Image"
              id="my_file"
              hidden
              multiple={false}
              onChange={handelImageChange}
            ></input>
            <button onClick={() => document.getElementById("my_file").click()}>
              Share your first photo
            </button>
          </div>
        </div>
        <div className={ProfileMainCss.userPosts}>
          <div className={ProfileMainCss.postsMainWrap}>
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
          </div>
        </div>
      </div>
    </div>
  );
}
let handelImageChange = async (e) => {
  const [file] = e.target.files;
  let { err } = await addPost(file);
  if (err) {
    alert(err.message);
  }
};

export default view(ProfileMain);
