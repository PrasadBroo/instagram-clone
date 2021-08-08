import React, { useEffect, useState } from "react";
import ProfileMainCss from "../../css/auth/ProfileMain.module.css";
import ProfileMainModal from "../modals/ProfileMainModal";
import { Link, useParams } from "react-router-dom";
import modalStore from "../../stores/modalStore";
import FollowModal from "../modals/FollowModal";
import { view } from "@risingstack/react-easy-state";

import {
  addPost,
  getUserPosts,
  getUserDetailsByUsername,
  updateProfilePic,
} from "../../utils/firebase_api";
import UserPost from "../subcomponents/UserPost";
import mystore from "../../stores/store";

function ProfileMain() {
  const isMounted = React.useRef(true)
  const { username } = useParams();
  useEffect(() => {
    document.body.style.backgroundColor = "#FAFAFA";
    async function fetchDatails() {
      const { data: user_details } = await getUserDetailsByUsername(username);
      const { data: postsData } = await getUserPosts(username);
      if (user_details && postsData && isMounted.current) {
        setUserDetails(user_details);
        setHasPosts(postsData.length !== 0);
        setUserPosts(postsData);
        return;
      }
    }
    fetchDatails();
    return () => {document.body.style.backgroundColor = "unset";isMounted.current=false};
  }, [username]);

  const [hasPosts, setHasPosts] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: username,
    profilePic: null,
    uid: null,
  });
  const [userPosts, setUserPosts] = useState([]);
  return (
    <div className="ProfilePage">
      <div className={ProfileMainCss.profileWrap}>
        <div className={ProfileMainCss.wrap}>
          <ProfileMainModal />
          <FollowModal />
          <div className={ProfileMainCss.profilePic}>
            <input
              type="file"
              accept="image/*"
              alt="Input Image"
              id="my_file_two"
              hidden
              multiple={false}
              onChange={handelImageChangeProfile}
            ></input>
            <img
              onClick={() => {
                userDetails.uid === mystore.auth.user.uid &&
                  document.getElementById("my_file_two").click();
              }}
              src={
                userDetails.uid === mystore.auth.user.uid
                  ? mystore.currentUser.profilePic
                  : userDetails.profilePic
              }
              alt="profile_pic"
            />
          </div>
          <div className={ProfileMainCss.profileInfo}>
            <div className={ProfileMainCss.secone}>
              <p>{userDetails.username}</p>
              {userDetails.uid === mystore.auth.user.uid && (
                <Link
                  to="/settings/edit"
                  className={ProfileMainCss.editProLink}
                >
                  Edit Profile
                </Link>
              )}
              {userDetails.uid === mystore.auth.user.uid && (
                <button
                  onClick={() => (modalStore.userNamePageModal.display = true)}
                >
                  <ion-icon name="settings-outline"></ion-icon>
                </button>
              )}
            </div>
            <div className={ProfileMainCss.secOnemobile}>
              {userDetails.uid === mystore.auth.user.uid && (
                <Link
                  to="/settings/edit"
                  className={ProfileMainCss.editProLinkM}
                >
                  Edit Profile
                </Link>
              )}
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
              <h1>{userDetails.fullName}</h1>
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
        {!hasPosts && (
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
              <button
                onClick={() => document.getElementById("my_file").click()}
              >
                Share your first photo
              </button>
            </div>
          </div>
        )}
        {hasPosts && (
          <div className={ProfileMainCss.userPosts}>
            <div className={ProfileMainCss.postsMainWrap}>
              {userPosts.map((post, i) => (
                <UserPost
                  imageUrl={post.postMediaUrl ?? post.postsMedia}
                  postid={post.postId}
                  key={i}
                />
              ))}
            </div>
          </div>
        )}
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

let handelImageChangeProfile = async (e) => {
  const [file] = e.target.files;
  let { err } = await updateProfilePic(file);
  if (err) {
    alert(err.message);
  }
};

export default view(ProfileMain);
