import React from "react";
import CommentCss from "../../css/auth/Comment.module.css";

export default function Comment() {
  return (
    <div className={CommentCss.comment}>
      <span>
        <a href="/prasad_bro">prasad_bro</a>
        <span>
          Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eos, assumenda?
        </span>
      </span>
      <span>
        <i className={CommentCss.likeBtnWrap + " far fa-heart "}></i>
      </span>
    </div>
  );
}
