import { view } from "@risingstack/react-easy-state";
import React from "react";
import FollowModalCss from "../../css/modals/FollowModal.module.css";
import FollowUser from "../subcomponents/FollowUser";
import modalStore from "./../../stores/modalStore";

function FollowModal() {
  return modalStore.followModal.display ? (
    <div className={FollowModalCss.followModal}>
      <div className={FollowModalCss.modal}>
        <div className={FollowModalCss.title}>
          {modalStore.followModal.type === "followers" ? (
            <p>Followers</p>
          ) : (
            <p>Followings</p>
          )}

          <button onClick={() => (modalStore.followModal.display = false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={FollowModalCss.followList}>
          {modalStore.followModal.type === "followers" &&
            modalStore.followModal.followerslist.map((follower, i) => (
              <FollowUser data={follower} key={i} />
            ))}
          {modalStore.followModal.type === "followings" &&
            modalStore.followModal.followingsList.map((follower, i) => {
              console.log(follower);
              return <FollowUser data={follower} key={i} />;
            })}
        </div>
      </div>
    </div>
  ) : null;
}

export default view(FollowModal);
