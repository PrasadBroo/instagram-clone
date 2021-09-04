import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserPostCss from "../../css/subcomponents/UserPost.module.css";
import LocalSpinner from "../spinners/LocalSpinner";

function UserPost({ imageUrl, postid }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={UserPostCss.wrap}>
      <Link to={`/post/${postid}`}>
        <span className={UserPostCss.commentIcon}>
          <ion-icon name="chatbubble-outline"></ion-icon>
        </span>
        

          {!isLoaded && <LocalSpinner />}
          <img
            src={imageUrl}
            onLoad={() => setIsLoaded(true)}
            alt="user-post"
          />
      </Link>

      {/* <Link to={`/post/${postid}`}>
        {!isLoaded && <LocalSpinner />}
        <img src={imageUrl} onLoad={() => setIsLoaded(true)} alt="user-post" />
      </Link> */}
    </div>
  );
}
export default view(UserPost);
