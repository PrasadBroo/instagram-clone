import React, { useEffect, useState } from "react";
import ProfileMainCss from "../../css/auth/ProfileMain.module.css";
import ProfileMainModal from "../modals/ProfileMainModal";
import { Link, useParams } from "react-router-dom";
import modalStore from "../../stores/modalStore";
import FollowModal from "../modals/FollowModal";
import { view } from "@risingstack/react-easy-state";
import UserPost from "../subcomponents/UserPost";
import mystore from "../../stores/store";
import UnfollowModal from "../modals/UnfollowModal";
import { firestore } from "../../services/firebase";
import Spinner from "../spinners/Spinner";
import {

  addPost,
  getUserPosts,
  getUserDetailsByUsername,
  updateProfilePic,
  followUser,
} from "../../utils/firebase_api";


function ProfileMain() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState({
    username: username,
    profilePic: null,
    uid: null,
  });
  const [hasPosts, setHasPosts] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    modalStore.spinner.show = true;
    modalStore.followModal.display = false;
    // isMounted.current = true;
    document.body.style.backgroundColor = "#FAFAFA";
    async function fetchDatails() {
      const { data: user_details, err: userErr } =
        await getUserDetailsByUsername(username);
      const { data: postsData, err: postsErr } = await getUserPosts(username);
      const usersRef = firestore().collection("users");
      const usersFollowersRef = firestore().collection("followers");
      if (!userErr && !postsErr && isMounted) {
        // setUserDetails(user_details);
        usersRef.doc(user_details.uid).onSnapshot((next) => {
          if (isMounted) setUserDetails(next.data());
        });
        usersFollowersRef
          .doc(user_details.uid)
          .collection("users")
          .doc(mystore.currentUser.uid)
          .onSnapshot((next) => {
            if (isMounted) setIsFollowed(next.exists);
          });
        setHasPosts(postsData.length !== 0);
        setUserPosts(postsData);
        modalStore.followModal.user = user_details;
        modalStore.spinner.show = false;
        // setIsFollowed(isFollowed);
        return;
      }
    }
    fetchDatails();
    return () => {
      isMounted = false;
    };
  }, [username]);
  let handelFollowUser = async () => {
    modalStore.followModal.isFollowInProgress = true;
    let { err } = await followUser(userDetails);
    modalStore.followModal.isFollowInProgress = false;
    if (err) {
      return alert(err.message);
    }
  };
  const handelUnFollowUser = async () => {
    modalStore.unfollowModal.toUnfollow = userDetails;
    modalStore.unfollowModal.display = true;
  };
  return !modalStore.spinner.show ? (
    <div className="ProfilePage">
      <div className={ProfileMainCss.profileWrap}>
        <div className={ProfileMainCss.wrap}>
          <ProfileMainModal />
          <FollowModal />
          <UnfollowModal />
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
              src={userDetails.profilePic}
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
              {userDetails.uid !== mystore.auth.user.uid && !isFollowed && (
                <div className={ProfileMainCss.followBtnwrap}>
                  <button
                  disabled={modalStore.followModal.isFollowInProgress}
                    className={ProfileMainCss.followBtn}
                    onClick={() => handelFollowUser()}
                  >
                    Follow
                  </button>
                </div>
              )}
              {userDetails.uid !== mystore.auth.user.uid && isFollowed && (
                <div className={ProfileMainCss.followBtnwrap}>
                  <button
                  disabled={modalStore.followModal.isFollowInProgress}
                    className={ProfileMainCss.followingBtn}
                    onClick={() => handelUnFollowUser()}
                  >
                    Following
                  </button>
                </div>
              )}
              {userDetails.uid === mystore.auth.user.uid && (
                <button
                  className={ProfileMainCss.seconeBtn}
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
                disabled={userDetails.followersCount === 0}
                onClick={() => {
                  modalStore.followModal.display = true;
                  modalStore.followModal.type = "followers";
                }}
              >
                <b>{userDetails.followersCount}</b> followers
              </button>
              <button
                disabled={userDetails.followingsCount === 0}
                onClick={() => {
                  modalStore.followModal.display = true;
                  modalStore.followModal.type = "followings";
                }}
              >
                <b>{userDetails.followingsCount}</b> following
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
            <p>
              <b>2</b> posts
            </p>
            <button
              disabled={userDetails.followersCount === 0}
              onClick={() => {
                modalStore.followModal.display = true;
                modalStore.followModal.type = "followers";
              }}
            >
              <b>{userDetails.followersCount}</b> followers
            </button>
            <button
              disabled={userDetails.followingsCount === 0}
              onClick={() => {
                modalStore.followModal.display = true;
                modalStore.followModal.type = "followings";
              }}
            >
              <b>{userDetails.followingsCount}</b> following
            </button>
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
  ) : (
    <Spinner />
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
