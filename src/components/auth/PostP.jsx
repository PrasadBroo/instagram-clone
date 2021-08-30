import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import PostPCss from "../../css/auth/PostP.module.css";
import Comment from "./Comment";
import modalStore from "./../../stores/modalStore";
import mystore from "../../stores/store";
import LocalSpinner from "../spinners/LocalSpinner";
import { Link } from "react-router-dom";
import {
  addComment,
  likePost,
  load_more_comments,
  unlikePost,
} from "../../utils/firebase_api";

function PostP() {
  const [ispostImageLoaded, setIsPostImageLoaded] = useState(false);
  const [ismoreCommentsLoading, setIsmoreCommentsLoading] = useState(false);
  const data = mystore.currentUser.postDetails;
  const [comment, setComment] = useState("");
  const [isCommentAdding, setIsCommentAdding] = useState(false);
  const handelPostLike = async () => {
    if (data.post.isLiked) {
      data.post.isLiked = false;
      data.post.likesCount -= 1;
      const { err } = await unlikePost(data.post.postId);
      if (err) {
        data.post.isLiked = true;
        data.post.likesCount += 1;
        return alert(err.message);
      }
    } else {
      data.post.isLiked = true;
      data.post.likesCount += 1;
      const { err } = await likePost(data.post.postId);
      if (err) {
        data.post.likesCount -= 1;
        data.post.isLiked = false;
        return alert(err.message);
      }
    }
  };
  const handelFormSubmit = async (e) => {
    e.preventDefault();
    setComment("");
    setIsCommentAdding(true);
    const { err, data: commentData } = await addComment(
      comment,
      data.post.postId
    );
    if (err) {
      setIsCommentAdding(false);
      return alert(err.message);
    }
    setIsCommentAdding(false);
    data.comments.push({
      message: comment,
      uid: commentData.uid,
      user: mystore.currentUser,
      id: commentData.id,
      createdAt:commentData.createdAt
    });
  };
  const handelLoadComments = async () => {
    setIsmoreCommentsLoading(true)
    const { data: moreComments, err } = await load_more_comments(
      data.post.postId,
      data.commentsSnaps.docs[data.commentsSnaps.docs.length - 1]
    );
    if (!err) {
      moreComments.modifiedRes.forEach((e) => data.comments.push(e));
      data.commentsSnaps = moreComments.commentSnapshots;
    }
    setIsmoreCommentsLoading(false)
  };
  return (
    <div className={PostPCss.postWrapper}>
      <div className="leftSec">
        <div className={PostPCss.postMedia}>
          {!ispostImageLoaded && <LocalSpinner />}
          <img
            src={data.post.postMediaUrl}
            onLoad={() => setIsPostImageLoaded(true)}
            alt="postImage"
          />
        </div>
      </div>
      <div className={PostPCss.rightSec}>
        <div className="sub">
          <div className={PostPCss.postHeading}>
            <div className={PostPCss.postAuthor}>
              <Link to={"/" + data.user.username}>
                <img src={data.user.profilePic} alt="post" />
              </Link>
              <Link to={"/" + data.user.username}>{data.user.username}</Link>
            </div>
            <div
              className={PostPCss.postOptions}
              onClick={() => (modalStore.postModal.display = true)}
            >
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
            <div className={PostPCss.commentsWrap}>
            {data.comments &&
              data.comments.map((c,i) => (
                <Comment data={c} key={i} type="details" />
              ))}
            {data.commentsSnaps.docs.length !==0 && <button
              className={PostPCss.loadComments}
              onClick={handelLoadComments}
            >
              {ismoreCommentsLoading && <LocalSpinner noBc/>}
              {!ismoreCommentsLoading && 'View more comments'}
            </button>}
            </div>
            
          </div>
        </div>
        <div className="subsec">
          <div className={PostPCss.likeCS}>
            <div className={PostPCss.leftSide}>
              <span>
                <i
                  className={
                    data.post.isLiked
                      ? PostPCss.likeBtnWrap +
                        " fas fa-heart " +
                        PostPCss.heart_red
                      : PostPCss.likeBtnWrap + " far fa-heart "
                  }
                  onClick={handelPostLike}
                ></i>
                {/* <ion-icon name={lc ? "heart" : "heart-outline"}></ion-icon> */}
              </span>
              <span className={PostPCss.commentBtnWrap}>
                <a href={"/post/" + data.post.postId}>
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
              {isCommentAdding && <LocalSpinner />}
              <form
                className={PostPCss.commentForm}
                onSubmit={handelFormSubmit}
              >
                <textarea
                  name="comment"
                  cols="30"
                  rows="1"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  value={comment}
                ></textarea>
                <button type="submit" disabled={comment.length === 0}>
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

export default view(PostP);
