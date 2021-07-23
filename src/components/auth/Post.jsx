import React, { useState } from "react";
import PostCss from "../../css/auth/Post.module.css";
import tempImg from "../../media/181184050_246536270301764_5089686745904119707_n.jpg";

export default function Post() {
  const [lc, sLc] = useState(false);
  return (
    <div className={PostCss.postWrapper}>
      <div className={PostCss.postHeading}>
        <div className={PostCss.postAuthor}>
        <a href="/prasad__bro"><img
            src="https://graph.facebook.com/240349964547826/picture"
            alt="post"
          /></a>
          <a href="/prasad__bro">prasad__bro</a>
        </div>
        <div className={PostCss.postOptions}>
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
      <div className={PostCss.postMedia}>
        <img src={tempImg} alt="postImage" />
      </div>
      <div className={PostCss.likeCS}>
        <div className={PostCss.leftSide}>
          <span className={lc ? PostCss.likeBtnWrap + " " + PostCss.heart_red :  PostCss.likeBtnWrap} onClick={() => sLc(!lc)}>
            <ion-icon name={lc ? "heart" : "heart-outline"}></ion-icon>
          </span>
          <span className={PostCss.commentBtnWrap}>
            <ion-icon name="chatbubble-outline"></ion-icon>
          </span>
          <span className={PostCss.shareBtnWrap}>
            <ion-icon name="paper-plane-outline"></ion-icon>
          </span>
        </div>
        <div className={PostCss.rightSide}>
          <span className={PostCss.saveBtn}>
          <ion-icon name="bookmark-outline"></ion-icon>
          </span>
        </div>
      </div>
      <div className={PostCss.likesCount}>
        <p>25,143 likes</p>
      </div>
      <div className={PostCss.viewAllComm}>
        <button>View All 12 Comments</button>
      </div>
      <div className={PostCss.comments}>
        <div className={PostCss.comment}>
          <span>
            <a href="/prasad_bro">prasad_bro</a>Lorem ipsum dolor sit amet
            consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eos, assumenda?
          </span>
          <span>
          <ion-icon name={lc ? "heart" : "heart-outline"}></ion-icon>
          </span>
        </div>
        <div className={PostCss.comment}>
          <span>
            <a href="/prasad_bro">prasad_bro</a>Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eos, assumenda?
          </span>
          <span>
          <ion-icon name={lc ? "heart" : "heart-outline"}></ion-icon>
          </span>
        </div>
      </div>
      <div className={PostCss.postComment}>
        <div className={PostCss.inputComment}>
          <form action="/" method="post" className={PostCss.commentForm}>
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
  );
}
