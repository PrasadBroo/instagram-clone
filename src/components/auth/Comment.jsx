import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentCss from "../../css/auth/Comment.module.css";

export default function Comment({data}) {
  const [lc, sLc] = useState(false);
  return (
    <div className={CommentCss.comment}>
      <span>
        <Link to={"/"+data.user.username}>{data.user.username}</Link>
        <span>
          {data.message}
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
