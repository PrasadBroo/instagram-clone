import { view } from "@risingstack/react-easy-state";
import React from "react";
import UnfollowModalCss from "../../css/modals/UnfollowModal.module.css";
import { unfollowUser } from "../../utils/firebase_api";
import modalStore from "./../../stores/modalStore";

function UnfollowModal() {
  const handelUnfollowUser = async () => {
    const { err } = await unfollowUser(modalStore.unfollowModal.toUnfollow.uid);
    if (err) {
      return alert(err.message);
    }
    modalStore.unfollowModal.display = false
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
