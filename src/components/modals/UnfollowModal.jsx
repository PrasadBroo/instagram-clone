import { view } from "@risingstack/react-easy-state";
import React from "react";
import UnfollowModalCss from "../../css/modals/UnfollowModal.module.css";
import { unfollowUser } from "../../utils/firebase_api";
import modalStore from "./../../stores/modalStore";

function UnfollowModal() {
  const handelUnfollowUser = async () => {
    modalStore.unfollowModal.display = false;
    if (modalStore.followModal.type === "followers") {
      modalStore.followModal.followerslist.find(ele => ele.uid === modalStore.unfollowModal.toUnfollow.uid).isUnFollowInProgress = true;
    }
    if (modalStore.followModal.type === "followings") {
      modalStore.followModal.followingsList.find(ele => ele.uid === modalStore.unfollowModal.toUnfollow.uid).isUnFollowInProgress = true;
    }
    modalStore.followModal.isUnfollowInProgress = true;
    const { err } = await unfollowUser(modalStore.unfollowModal.toUnfollow.uid);
    modalStore.followModal.isUnfollowInProgress = false;
    if (err) {
      return alert(err.message);
    }
    if (modalStore.followModal.type === "followers") {
      modalStore.followModal.followerslist.find(ele => ele.uid === modalStore.unfollowModal.toUnfollow.uid).isUnFollowInProgress = false;
      modalStore.followModal.followerslist.find(ele => ele.uid === modalStore.unfollowModal.toUnfollow.uid).isFollowedByUser = false;
    }
    if (modalStore.followModal.type === "followings") {
      modalStore.followModal.followingsList.find(ele => ele.uid === modalStore.unfollowModal.toUnfollow.uid).isFollowedByUser = false;
      modalStore.followModal.followingsList.find(ele => ele.uid === modalStore.unfollowModal.toUnfollow.uid).isUnFollowInProgress = false;
    }
  };
  return modalStore.unfollowModal.display ? (
    <div className={UnfollowModalCss.unfollowModal}>
      <div className={UnfollowModalCss.modal}>
        <div className={UnfollowModalCss.profilePic}>
          <div className={UnfollowModalCss.picWrap}>
            <img
              src={modalStore.unfollowModal.toUnfollow.profilePic}
              alt="userPic"
            />
          </div>
          <p>Unfollow @{modalStore.unfollowModal.toUnfollow.username}</p>
        </div>
        <button
          className={UnfollowModalCss.reportbtn}
          onClick={() => handelUnfollowUser()}
        >
          Unfollow
        </button>
        <button onClick={() => (modalStore.unfollowModal.display = false)}>
          Cancel
        </button>
      </div>
    </div>
  ) : null;
}

export default view(UnfollowModal);
