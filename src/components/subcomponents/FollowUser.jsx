import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link } from "react-router-dom";
import FollowUserCss from "../../css/subcomponents/FollowUser.module.css";
import modalStore from "../../stores/modalStore";
import mystore from "../../stores/store";
import { followUser } from "../../utils/firebase_api";

function FollowUser({ data }) {

  const handelFollowUser = async()=>{
   await followUser(data)
  }
  const handelUnfollowUser = ()=>{
    modalStore.unfollowModal.toUnfollow = data;
    modalStore.unfollowModal.display = true;
  }
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
          <button className={FollowUserCss.followgBtn} onClick={()=>handelFollowUser()}>Follow</button>
        )}
        {data.isFollowedByUser && data.uid !== mystore.currentUser.uid && (
          <button className={FollowUserCss.followingBtn} onClick={()=>handelUnfollowUser()}>Following</button>
        )}
      </div>
    </div>
  );
}
export default view(FollowUser);
