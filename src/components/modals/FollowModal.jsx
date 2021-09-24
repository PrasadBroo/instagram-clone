import { view } from "@risingstack/react-easy-state";
import React, { useEffect, useState } from "react";
import FollowModalCss from "../../css/modals/FollowModal.module.css";
import { getFollowerslist, getFollowingsList } from "../../utils/firebase_api";
import SkeletonSuggUser from "../skeletons/SkeletonSuggUser";
import LocalSpinner from "../spinners/LocalSpinner";
import FollowUser from "../subcomponents/FollowUser";
import modalStore from "./../../stores/modalStore";

function FollowModal() {
  const [ismoreFollowLoading, setisMoreFollowLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    const fetchFollowDetails = async () => {
      const {
        data: followersList,
        snapshots: followSnap,
        err: followersListErr,
      } = await getFollowerslist(modalStore.followModal.user.uid);
      const {
        data: followingsList,
        snapshots: followingSnap,
        err: followingsListErr,
      } = await getFollowingsList(modalStore.followModal.user.uid);
      if (!followersListErr && !followingsListErr) {
        modalStore.followModal.followerslist = followersList;
        modalStore.followModal.followerslistSnapshots = followSnap;
        modalStore.followModal.followingsList = followingsList;
        modalStore.followModal.followingsListSnapshots = followingSnap;
        setIsDataLoaded(true);
      }
    };
    fetchFollowDetails();
  }, []);
  const handelLoadFollow = async () => {
    setisMoreFollowLoading(true);
    if (modalStore.followModal.type === "followers") {
      const {
        data: newData,
        err: newErr,
        snapshots: newSnap,
      } = await getFollowerslist(
        modalStore.followModal.user.uid,
        modalStore.followModal.followerslistSnapshots.docs[
          modalStore.followModal.followerslistSnapshots.docs.length - 1
        ]
      );
      if (!newErr) {
        modalStore.followModal.followerslistSnapshots = newSnap;
        newData.forEach((e) => modalStore.followModal.followerslist.push(e));
      }
      setisMoreFollowLoading(false);
    } else {
      const {
        data: newData,
        err: newErr,
        snapshots: newSnap,
      } = await getFollowingsList(
        modalStore.followModal.user.uid,
        modalStore.followModal.followingsListSnapshots.docs[
          modalStore.followModal.followingsListSnapshots.docs.length - 1
        ]
      );
      if (!newErr) {
        modalStore.followModal.followingsListSnapshots = newSnap;
        newData.forEach((e) => modalStore.followModal.followingsList.push(e));
      }
      setisMoreFollowLoading(false);
    }
  };
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
            modalStore.followModal.followingsList.map((follower, i) => (
              <FollowUser data={follower} key={i} />
            ))}
            {!isDataLoaded && <><SkeletonSuggUser/>
          <SkeletonSuggUser/>
          <SkeletonSuggUser/>
          <SkeletonSuggUser/></>}
          {isDataLoaded &&
            (modalStore.followModal.type === "followers"
              ? modalStore.followModal.followerslistSnapshots.docs.length !==
                  0 && (
                  <button
                    className={FollowModalCss.loadComments}
                    onClick={handelLoadFollow}
                  >
                    {ismoreFollowLoading && <LocalSpinner noBc />}
                    {!ismoreFollowLoading && "View more"}
                  </button>
                )
              : modalStore.followModal.followingsListSnapshots.docs.length !==
                  0 && (
                  <button
                    className={FollowModalCss.loadComments}
                    onClick={handelLoadFollow}
                  >
                    {ismoreFollowLoading && <LocalSpinner noBc />}
                    {!ismoreFollowLoading && "View more"}
                  </button>
                ))}
        </div>
      </div>
    </div>
  ) : null;
}

export default view(FollowModal);
