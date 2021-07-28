import React, { useState } from "react";
import CommentCss from "../../css/auth/Comment.module.css";

export default function Comment() {
  const [lc, sLc] = useState(false);
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
        <i
          className={
            lc
              ? CommentCss.likeBtnWrap + " fas fa-heart " + CommentCss.heart_red
              : CommentCss.likeBtnWrap + " far fa-heart "
          }
          onClick={() => sLc(!lc)}
        ></i>
      </span>
    </div>
  );
}
