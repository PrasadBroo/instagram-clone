import React, { useState } from "react";
import PostPCss from "../../css/auth/PostP.module.css";
import tempImg from "../../media/181184050_246536270301764_5089686745904119707_n.jpg";
import Comment from './Comment';

export default function PostP() {
  const [lc, sLc] = useState(false);
  return (
    <div className={PostPCss.postWrapper}>
      <div className="leftSec">
        <div className={PostPCss.postMedia}>
          <img src={tempImg} alt="postImage" />
        </div>
      </div>
      <div className={PostPCss.rightSec}>
        <div className="sub">
          <div className={PostPCss.postHeading}>
            <div className={PostPCss.postAuthor}>
              <a href="/prasad__bro">
                <img
                  src="https://graph.facebook.com/240349964547826/picture"
                  alt="post"
                />
              </a>
              <a href="/prasad__bro">prasad__bro</a>
            </div>
            <div className={PostPCss.postOptions}>
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
                <a href="/post/afsafasfas">
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
            <p>25,143 likes</p>
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
