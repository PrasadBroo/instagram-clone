import { view } from "@risingstack/react-easy-state";
import * as moment from 'moment'
import React from "react";
import { Link } from "react-router-dom";
import CommentCss from "../../css/auth/Comment.module.css";
import mystore from "../../stores/store";
import { like_comment, unlike_comment } from "../../utils/firebase_api";

function Comment({ data, type, post }) {
  const comments =
    type === "home"
      ? post.topComments
      : mystore.currentUser.postDetails.comments;
  const handelCommentLike = async () => {
    if (data.isLiked) {
      comments.find((ele) => ele.id === data.id).isLiked = false;
      comments.find((ele) => ele.id === data.id).likesCount -= 1;
      const { err } = await unlike_comment(data.id);
      if (err) {
        comments.find((ele) => ele.id === data.id).isLiked = true;
        comments.find((ele) => ele.id === data.id).likesCount += 1;
        return alert(err.message);
      }
    } else {
      comments.find((ele) => ele.id === data.id).isLiked = true;
      comments.find((ele) => ele.id === data.id).likesCount += 1;
      const { err } = await like_comment(data.id);
      if (err) {
        comments.find((ele) => ele.id === data.id).likesCount -= 1;
        comments.find((ele) => ele.id === data.id).isLiked = false;
        return alert(err.message);
      }
    }
  };
  return (
    <div className={CommentCss.comment}>
      <div className={CommentCss.picUsername}>
        {type==='details' && <div className={CommentCss.profilePic}>
          <img src={data.user.profilePic} alt={data.user.fullName} />
        </div>}
        <div>
          <Link to={"/" + data.user.username}>{data.user.username}</Link>
          <span>{data.message}</span>
          {type==='details' && <div className={CommentCss.commentInfo}>
            <p>{moment(data.createdAt.seconds * 1000).fromNow()}</p>
            <p>{data.likesCount} likes</p>
          </div>}
        </div>
      </div>

      <div>
        <i
          className={
            data.isLiked
              ? CommentCss.likeBtnWrap + " fas fa-heart " + CommentCss.heart_red
              : CommentCss.likeBtnWrap + " far fa-heart "
          }
          onClick={handelCommentLike}
        ></i>
      </div>
    </div>
  );
}

export default view(Comment);
