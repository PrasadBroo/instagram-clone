import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCss from "../../css/auth/Profile.module.css";
import { followUser, unfollowUser } from "../../utils/firebase_api";
import LocalSpinner from "../spinners/LocalSpinner";
import mystore from "./../../stores/store";
import verifiedBadge from '../../media/verified-badge.png'

function SuggestedUser({ user, type }) {
  const [isFollowInProgress, setIsFollowInProgress] = useState(false);
  const [isUnFollowInProgress, setUnIsFollowInProgress] = useState(false);
  const handelUnfollow = async () => {
    setUnIsFollowInProgress(true);
    const { err } = await unfollowUser(user.uid);
    if (err) {
      setUnIsFollowInProgress(false);
      return alert(err.message);
    }
    setUnIsFollowInProgress(false);
    const result = type
      ? mystore.currentUser.suggestedUSer
      : mystore.currentUser.userSuggetions;
    result.find((e) => e.uid === user.uid).isFollowedByUser = false;
  };
  const handelFollow = async () => {
    setIsFollowInProgress(true);
    const { err } = await followUser(user);
    if (err) {
      setIsFollowInProgress(false);
      return alert(err.message);
    }
    setIsFollowInProgress(false);
    const result = type
      ? mystore.currentUser.suggestedUSer
      : mystore.currentUser.userSuggetions;
    result.find((e) => e.uid === user.uid).isFollowedByUser = true;
  };
  return (
    <div className={ProfileCss.head}>
      <div className={ProfileCss.profileImg + " " + ProfileCss.suggeprofileImg}>
        <img src={user.profilePic} alt="img" />
      </div>
      <div className={ProfileCss.profileinfo}>
        <Link to={"/" + user.username}>
          <div className={ProfileCss.usernameVeriWrap}>
            <p className={ProfileCss.username}>{user.username}</p>
            {(user.isVerified ?? false) && <img src={verifiedBadge}alt="verifiedBadge" className={ProfileCss.verifiedBadge}/>}
          </div>
          
        </Link>
        <p className={ProfileCss.fullName}>{user.fullName}</p>
      </div>
      <div className={ProfileCss.followBtnWrap}>
        {user.isFollowedByUser && user.uid !== mystore.currentUser.uid && (
          <button className={ProfileCss.followingBtn} onClick={handelUnfollow}>
            {isUnFollowInProgress && <LocalSpinner />}Following
          </button>
        )}
        {!user.isFollowedByUser && user.uid !== mystore.currentUser.uid && (
          <button className={ProfileCss.followBtn} onClick={handelFollow}>
            {isFollowInProgress && <LocalSpinner />}
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
export default view(SuggestedUser);
