import React, { useState } from "react";
import Post from "./Post";
import PostCss from "../../css/auth/Posts.module.css";
import { view } from "@risingstack/react-easy-state";
import mystore from "./../../stores/store";
import SkeletonPost from "../skeletons/SkeletonPost";
import LocalSpinner from "../spinners/LocalSpinner";
import { load_more_suggested_posts } from "../../utils/firebase_api";
import verifiedBadge from '../../media/verified-badge.png'
function Posts() {
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const fetchMorePosts = async () => {
    setLoadingMorePosts(true);
    const { data: suggestedPostsMore, err: err3 ,followingSnapshots} =
      await load_more_suggested_posts(
        mystore.currentUser.followingSnapshots.docs[
          mystore.currentUser.followingSnapshots.docs
            .length - 1
        ]
      );
    setLoadingMorePosts(false);
    if(err3)return;
    mystore.currentUser.followingSnapshots = followingSnapshots;
    suggestedPostsMore.forEach((e) =>
      mystore.currentUser.userSuggestedPosts.push(e)
    );
  };
  return (
    <div className={PostCss.posts}>
      {mystore.currentUser.userSuggestedPosts &&
        mystore.currentUser.userSuggestedPosts.map((e, i) => (
          <Post data={e} key={i} />
        ))}
      {!mystore.currentUser.userSuggestedPosts &&
        [0, 1, 2].map((e, i) => <SkeletonPost key={i} />)}
      <div className={PostCss.btnwrap}>
        {mystore.currentUser.userSuggestedPosts&&(mystore.currentUser.followingSnapshots.docs.length !==0 && (
          <button onClick={fetchMorePosts}>
            {loadingMorePosts && <LocalSpinner noBc/>}
            {!loadingMorePosts && "Load More"}
          </button>
        ))}
        { mystore.currentUser.userSuggestedPosts && (mystore.currentUser.followingSnapshots.docs.length ===0 &&<><p>You're All Caught Up </p><img src={verifiedBadge} alt="badge" /></>)}
      </div>
    </div>
  );
}
export default view(Posts);
