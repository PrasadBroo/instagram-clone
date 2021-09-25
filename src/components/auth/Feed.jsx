import { view } from "@risingstack/react-easy-state";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import FeedCss from "../../css/auth/Feed.module.css";
import FeedPost from "../subcomponents/FeedPost";
import { get_feed_posts } from "../../utils/firebase_api";
import mystore from "../../stores/store";
import FeedSkeleton from "../skeletons/FeedSkeleton";

function Feed() {
  useEffect(()=>{
    // document.body.style.backgroundColor = 'gray'
    const fetchDetails = async()=>{
      const {err,snapshots,data} = await get_feed_posts();
      if(err){
        mystore.alert.show = false;
      mystore.alert.message = err.message;
      mystore.alert.show = true;
      return;
      }
      mystore.currentUser.feed_posts = data;
      mystore.currentUser.feed_posts_snapshots = snapshots;
    }
    if(!mystore.currentUser.feed_posts)fetchDetails();
    
  },[])
  return (
    <div>
      <Navbar />
      {!mystore.currentUser.feed_posts&&<FeedSkeleton/>}
      {mystore.currentUser.feed_posts && <div className={FeedCss.mainWrap}>
        <div className={FeedCss.postsWrap}>
          <div className={FeedCss.left}>
            <FeedPost post={mystore.currentUser.feed_posts[0]} />
            <FeedPost post={mystore.currentUser.feed_posts[1]} />
          </div>
          <div className={FeedCss.right}>
            <FeedPost post={mystore.currentUser.feed_posts[2]} />
          </div>
        </div>
        <div className={FeedCss.threePosts}>
          <FeedPost post={mystore.currentUser.feed_posts[3]} />
          <FeedPost post={mystore.currentUser.feed_posts[4]} />
          <FeedPost post={mystore.currentUser.feed_posts[5]} />
        </div>
        <div className={FeedCss.postsWrapReverse}>
          <div className={FeedCss.left}>
            <FeedPost post={mystore.currentUser.feed_posts[6]} />
            <FeedPost post={mystore.currentUser.feed_posts[7]} />
          </div>
          <div className={FeedCss.right}>
            <FeedPost post={mystore.currentUser.feed_posts[8]} />
          </div>
        </div>
      </div>}
    </div>
  );
}
export default view(Feed);
