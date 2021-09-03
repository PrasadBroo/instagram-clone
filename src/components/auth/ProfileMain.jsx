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
import LocalSpinner from "../spinners/LocalSpinner";
import {
  addPost,
  getUserPosts,
  getUserDetailsByUsername,
  updateProfilePic,
  followUser,
} from "../../utils/firebase_api";

// profileIndo --> profileWrap
function ProfileMain() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState({
    username: username,
    profilePic: null,
    uid: null,
  });
  const [hasPosts, setHasPosts] = useState(false);
  const [isprofilePicUpdating, setisprofilePicUpdating] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    modalStore.spinner.show = true;
    modalStore.followModal.display = false;
    mystore.showNotFound = false;
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
        setHasPosts(postsData.postsCount !== 0);
        setUserPosts(postsData.posts);
        modalStore.followModal.user = user_details;
        modalStore.spinner.show = false;
        // setIsFollowed(isFollowed);
        return;
      }
      if (userErr) {
        mystore.showNotFound = true;
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
    modalStore.followModal.type = null;
  };
  let handelImageChangeProfile = async (e) => {
    const [file] = e.target.files;
    setisprofilePicUpdating(true);
    let { err } = await updateProfilePic(file);
    setisprofilePicUpdating(false);
    if (err) {
      mystore.alert.show = false;
    mystore.alert.message = "Error updating profile Pic";
    mystore.alert.show = true;
    return;
    }
    mystore.alert.show = false;
    mystore.alert.message = "Profile Pic Updated Successfully";
    mystore.alert.show = true;
  };
  const handelImageChange = async (e) => {
    const [file] = e.target.files;
    const { err, data: newPost } = await addPost(file);
    if (err) {
      return alert(err.message);
    }
    mystore.alert.show = false;
    mystore.alert.message = "Post uploaded successfully";
    mystore.alert.show = true;
    setUserPosts([...userPosts, newPost]);
    setHasPosts(true);
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
            {isprofilePicUpdating && <LocalSpinner />}
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
                <b>{userPosts.length}</b> posts
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
              {userDetails.website && (
                <a
                  className={ProfileMainCss.userWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={userDetails.website}
                >
                  {userDetails.website}
                </a>
              )}
              <p>{userDetails.bio ?? ""}</p>
            </div>
          </div>
        </div>
        <div className={ProfileMainCss.secthreeMobile}>
          <h1>{userDetails.fullName}</h1>
          {userDetails.website && (
            <a
              className={ProfileMainCss.userWebsite}
              target="_blank"
              rel="noopener noreferrer"
              href={userDetails.website}
            >
              {userDetails.website}
            </a>
          )}
          <p>{userDetails.bio ?? ""}</p>
        </div>
        <div className={ProfileMainCss.mobileFollowInfo}>
          <ul className={ProfileMainCss.followInfo}>
            <p>
              <b>{userPosts.length}</b> posts
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
        {!hasPosts && userDetails.uid === mystore.currentUser.uid && (
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
        {!hasPosts && userDetails.uid !== mystore.currentUser.uid && (
          <div className={ProfileMainCss.sharePhotos}>
            <div className={ProfileMainCss.cameraIcon}>
              <ion-icon name="camera-outline"></ion-icon>
            </div>
            <div className={ProfileMainCss.textOne}>
              <p>No Posts Yet</p>
            </div>
            <div className={ProfileMainCss.textTwo}>
              <p>When {userDetails.username} posts, they will appear here.</p>
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

export default view(ProfileMain);
