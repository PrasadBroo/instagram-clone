import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeedPostCss from "../../css/subcomponents/FeedPost.module.css";
import LocalSpinner from "../spinners/LocalSpinner";

function FeedPost({post}) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Link className={FeedPostCss.feedPost} to={"/post/"+post.postId}>
      <span className={FeedPostCss.commentIcon}>
        <ion-icon name="chatbubble-outline"></ion-icon>
      </span>
      {!isLoaded && <LocalSpinner />}
      <img src={post.postMediaUrl} alt="feed-post" onLoad={() => setIsLoaded(true)} />
    </Link>
  );
}
export default view(FeedPost);
