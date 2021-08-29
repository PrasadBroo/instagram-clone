import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link } from "react-router-dom";
import CommentCss from "../../css/auth/Comment.module.css";
import mystore from "../../stores/store";
import { like_comment,unlike_comment } from "../../utils/firebase_api";

 function Comment({ data,type,post}) {
  const comments = type === "home" ? post.topComments : mystore.currentUser.postDetails.comments;
  const handelCommentLike = async()=>{
    if(data.isLiked){
      comments.find(ele => ele.id === data.id).isLiked=false
      const {err} = await unlike_comment(data.id)
      if(err){
        comments.find(ele => ele.id === data.id).isLiked=true
        return alert(err.message)
      }
    }
    else{
      comments.find(ele => ele.id === data.id).isLiked=true
      const {err} = await like_comment(data.id)
      if(err){
        comments.find(ele => ele.id === data.id).isLiked=false
        return alert(err.message)
      }
    }
  }
  return (
    <div className={CommentCss.comment}>
      <div>
        <Link to={"/" + data.user.username}>{data.user.username}</Link>
        <span>{data.message}</span>
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

export default view(Comment)