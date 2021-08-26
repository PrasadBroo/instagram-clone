import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FollowUserCss from "../../css/subcomponents/FollowUser.module.css";
import modalStore from "../../stores/modalStore";
import mystore from "../../stores/store";
import { followUser } from "../../utils/firebase_api";
import LocalSpinner from "../spinners/LocalSpinner";

function FollowUser({ data }) {
  const [isprofilePicLoading, setIsprofilePicLoading] = useState(true);
  const handelFollowUser = async () => {
    if (modalStore.followModal.type === "followers") {
      modalStore.followModal.followerslist.find(
        (ele) => ele.uid === data.uid
      ).isFollowInProgress = true;
    }
    if (modalStore.followModal.type === "followings") {
      modalStore.followModal.followingsList.find(
        (ele) => ele.uid === data.uid
      ).isFollowInProgress = true;
    }
    modalStore.followModal.isFollowInProgress = true;
    const { err } = await followUser(data);
    if (err) {
      alert(err.message);
      return (modalStore.followModal.isFollowInProgress = false);
    }
    if (modalStore.followModal.type === "followers") {
      modalStore.followModal.followerslist.find(
        (ele) => ele.uid === data.uid
      ).isFollowInProgress = false;
      modalStore.followModal.followerslist.find(
        (ele) => ele.uid === data.uid
      ).isFollowedByUser = true;
    }
    if (modalStore.followModal.type === "followings") {
      modalStore.followModal.followingsList.find(
        (ele) => ele.uid === data.uid
      ).isFollowedByUser = true;
      modalStore.followModal.followingsList.find(
        (ele) => ele.uid === data.uid
      ).isFollowInProgress = false;
    }
    modalStore.followModal.isFollowInProgress = false;
  };
  const handelUnfollowUser = () => {
    modalStore.unfollowModal.toUnfollow = data;
    modalStore.unfollowModal.display = true;
  };
  return (
    <div className={FollowUserCss.wrap}>
      <div className={FollowUserCss.pic}>
        <Link to={"/" + data.username}>
          {isprofilePicLoading && <LocalSpinner />}
          <img
            src={data.profilePic}
            onLoad={() => setIsprofilePicLoading(false)}
            alt="user-pic"
          />
        </Link>
      </div>
      <div className={FollowUserCss.name}>
        <Link to={"/" + data.username}>{data.username}</Link>
        <p>{data.fullName}</p>
      </div>
      <div className={FollowUserCss.btn}>
        {!data.isFollowedByUser && data.uid !== mystore.currentUser.uid && (
          <button
            className={FollowUserCss.followgBtn}
            disabled={data.isFollowInProgress}
            onClick={() => handelFollowUser()}
          >
            {data.isFollowInProgress && <LocalSpinner />}
            Follow
          </button>
        )}
        {data.isFollowedByUser  && data.uid !== mystore.currentUser.uid && (
          <button
            className={FollowUserCss.followingBtn}
            disabled={data.isUnFollowInProgress}
            onClick={() => handelUnfollowUser()}
          >
            {data.isUnFollowInProgress && <LocalSpinner />}
            Following
          </button>
        )}
      </div>
    </div>
  );
}
export default view(FollowUser);
