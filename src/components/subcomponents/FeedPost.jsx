import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import FeedPostCss from "../../css/subcomponents/FeedPost.module.css";
import LocalSpinner from "../spinners/LocalSpinner";

function FeedPost({ src }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <a className={FeedPostCss.feedPost} href="/">
      <span className={FeedPostCss.commentIcon}>
        <ion-icon name="chatbubble-outline"></ion-icon>
      </span>
      {!isLoaded && <LocalSpinner />}
      <img src={src} alt="feed-post" onLoad={() => setIsLoaded(true)} />
    </a>
  );
}
export default view(FeedPost);
