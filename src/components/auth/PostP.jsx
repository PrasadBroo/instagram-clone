import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import PostPCss from "../../css/auth/PostP.module.css";
import Comment from './Comment';
import modalStore from './../../stores/modalStore';
import mystore from "../../stores/store";
import LocalSpinner from "../spinners/LocalSpinner";

function PostP() {
  const [lc, sLc] = useState(false);
  const [ispostImageLoaded,setIsPostImageLoaded] = useState(false)
  const data = mystore.currentUser.postDetails;
  return (
    <div className={PostPCss.postWrapper}>
      <div className="leftSec">
        <div className={PostPCss.postMedia}>
          {!ispostImageLoaded && <LocalSpinner/>}
           <img src={data.post.postMediaUrl} onLoad={()=>setIsPostImageLoaded(true)} alt="postImage" />
        </div>
      </div>
      <div className={PostPCss.rightSec}>
        <div className="sub">
          <div className={PostPCss.postHeading}>
            <div className={PostPCss.postAuthor}>
              <a href={"/"+data.user.username}>
                <img
                  src={data.user.profilePic}
                  alt="post"
                />
              </a>
              <a href={"/"+data.user.username}>{data.user.username}</a>
            </div>
            <div className={PostPCss.postOptions} onClick={() => {modalStore.postModal.display = true;console.log(modalStore.postModal.display)}}>
              <svg
                aria-label="More options"
                className="_8-yf5 "
                fill="#262626"
                height="16"
                viewBox="0 0 48 48"
                width="16"
              >
                <circle
                  clipRule="evenodd"
                  cx="8"
                  cy="24"
                  fillRule="evenodd"
                  r="4.5"
                ></circle>
                <circle
                  clipRule="evenodd"
                  cx="24"
                  cy="24"
                  fillRule="evenodd"
                  r="4.5"
                ></circle>
                <circle
                  clipRule="evenodd"
                  cx="40"
                  cy="24"
                  fillRule="evenodd"
                  r="4.5"
                ></circle>
              </svg>
            </div>
          </div>
          <div className={PostPCss.comments}>
            <Comment/>
            <Comment/>
          </div>
        </div>
        <div className="subsec">
          <div className={PostPCss.likeCS}>
            <div className={PostPCss.leftSide}>
              <span>
                <i
                  className={
                    lc
                      ? PostPCss.likeBtnWrap +
                        " fas fa-heart " +
                        PostPCss.heart_red
                      : PostPCss.likeBtnWrap + " far fa-heart "
                  }
                  onClick={() => sLc(!lc)}
                ></i>
                {/* <ion-icon name={lc ? "heart" : "heart-outline"}></ion-icon> */}
              </span>
              <span className={PostPCss.commentBtnWrap}>
                <a href={"/post/"+data.post.postId}>
                <ion-icon name="chatbubble-outline"></ion-icon>
                </a>
                
              </span>
              <span className={PostPCss.shareBtnWrap}>
                <ion-icon name="paper-plane-outline"></ion-icon>
              </span>
            </div>
            <div className={PostPCss.rightSide}>
              <span className={PostPCss.saveBtn}>
                <ion-icon name="bookmark-outline"></ion-icon>
              </span>
            </div>
          </div>
          <div className={PostPCss.likesCount}>
            <p>{data.post.likesCount} likes</p>
          </div>
          <div className={PostPCss.postComment}>
            <div className={PostPCss.inputComment}>
              <form action="/" method="post" className={PostPCss.commentForm}>
                <textarea
                  name="comment"
                  cols="30"
                  rows="1"
                  placeholder="Add a comment..."
                ></textarea>
                <button type="submit" disabled>
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default view(PostP)