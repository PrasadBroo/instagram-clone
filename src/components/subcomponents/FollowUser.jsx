import { view } from "@risingstack/react-easy-state";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import FollowUserCss from "../../css/subcomponents/FollowUser.module.css";
import modalStore from "../../stores/modalStore";
import mystore from "../../stores/store";
import { followUser } from "../../utils/firebase_api";
import LocalSpinner from "../spinners/LocalSpinner";

function FollowUser({ data }) {
  const [isFollowInProgress,setIsFollowInProgress] = useState(false)
  const handelFollowUser = async () => {
    setIsFollowInProgress(true)
    modalStore.followModal.isFollowInProgress = true;
    const { err } = await followUser(data);
    setIsFollowInProgress(false)
    if (err) {
      alert(err.message);
      setIsFollowInProgress(false)
      return (modalStore.followModal.isFollowInProgress = false);
    }
    if (modalStore.followModal.type === "followers") {
      modalStore.followModal.followerslist =
        modalStore.followModal.followerslist.map((ele) => {
          if (ele.uid === data.uid) {
            ele.isFollowedByUser = true;
          }
          return ele;
        });
    }
    if (modalStore.followModal.type === "followings") {
      modalStore.followModal.followingsList =
        modalStore.followModal.followingsList.map((ele) => {
          if (ele.uid === data.uid) {
            ele.isFollowedByUser = true;
          }
          return ele;
        });
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
          <img src={data.profilePic} alt="user-pic" />
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
            disabled={isFollowInProgress}
            onClick={() => handelFollowUser()}
          >
            {isFollowInProgress && <LocalSpinner />}
            Follow
          </button>
        )}
        {data.isFollowedByUser && data.uid !== mystore.currentUser.uid && (
          <button
            className={FollowUserCss.followingBtn}
            disabled={isFollowInProgress}
            onClick={() => handelUnfollowUser()}
          >
            {modalStore.followModal.isUnfollowInProgress && <LocalSpinner />}
            Following
          </button>
        )}
      </div>
    </div>
  );
}
export default view(FollowUser);
