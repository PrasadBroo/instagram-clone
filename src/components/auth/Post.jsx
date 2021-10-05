import React, { useState } from "react";
import PostCss from "../../css/auth/Post.module.css";
import Comment from "./Comment";
import modalStore from "./../../stores/modalStore";
import SkeletonPost from "../skeletons/SkeletonPost";
import { view } from "@risingstack/react-easy-state";
import { Link, useHistory } from "react-router-dom";
import {
  likePost,
  unlikePost,
  addComment,
  add_post_to_saved_posts,
  remove_post_from_saved,
} from "../../utils/firebase_api";
import LocalSpinner from "../spinners/LocalSpinner";
import mystore from "../../stores/store";
import verifiedBadge from "../../media/verified-badge.png";
import moment from "moment";

function Post({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isCommentAdding, setIsCommentAdding] = useState(false);
  const history = useHistory();
  const handelPostLike = async () => {
    if (data.post.isLiked) {
      data.post.isLiked = false;
      data.post.likesCount -= 1;
      const { err: unlikePosrErr } = await unlikePost(data.post.postId);
      if (unlikePosrErr) {
        mystore.alert.show = false;
        mystore.alert.message = "Couldn't unlike the post";
        mystore.alert.show = true;
        return;
      }
    } else {
      data.post.isLiked = true;
      data.post.likesCount += 1;

      const { err: likePostErr } = await likePost(data.post.postId);
      if (likePostErr) {
        mystore.alert.show = false;
        mystore.alert.message = "Couldn't like the post";
        mystore.alert.show = true;
        return;
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
    mystore.currentUser.userSuggestedPosts
      .find((e) => e.post.postId === data.post.postId)
      .topComments.push({
        message: comment,
        uid: commentData.uid,
        user: mystore.currentUser,
        id: commentData.id,
        createdAt: commentData.createdAt,
      });
    mystore.currentUser.userSuggestedPosts.find(
      (e) => e.post.postId === data.post.postId
    ).post.commentsCount += 1;
  };
  const handelPostModal = () => {
    modalStore.postModal.display = true;
    modalStore.postModal.postid = data.post.postId;
  };
  const handelPostBookmark = async () => {
    if (data.post.isBookmarked) {
      mystore.currentUser.userSuggestedPosts.find(
        (e) => e.post.postId === data.post.postId
      ).post.isBookmarked = false;
      const { err } = await remove_post_from_saved(undefined, data.post.postId);
      if (err) {
        mystore.alert.show = false;
        mystore.alert.message = err.message;
        mystore.alert.show = true;
        return;
      }
    } else {
      mystore.currentUser.userSuggestedPosts.find(
        (e) => e.post.postId === data.post.postId
      ).post.isBookmarked = true;
      const { err } = await add_post_to_saved_posts(
        undefined,
        data.post.postId
      );
      if (err) {
        mystore.alert.show = false;
        mystore.alert.message = err.message;
        mystore.alert.show = true;
        return;
      }
    }
  };
  return (
    <>
      <div
        className={PostCss.postWrapper}
        style={{ display: isLoading ? "none" : "block" }}
      >
        <div className={PostCss.postHeading}>
          <div className={PostCss.postAuthor}>
            <Link to={"/" + data.user.username}>
              <img src={data.user.profilePic} alt="post" />
            </Link>
            <Link to={"/" + data.user.username}>{data.user.username}</Link>
            {(data.user.isVerified ?? false) && (
              <img
                src={verifiedBadge}
                alt="verifiedBadge"
                title="verified"
                className={PostCss.verifiedBadge}
              />
            )}
          </div>
          <div className={PostCss.postOptions} onClick={handelPostModal}>
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
          <img
            src={data.post.postMediaUrl}
            alt="postImage"
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <div className={PostCss.likeCS}>
          <div className={PostCss.leftSide}>
            <span>
              <i
                className={
                  data.post.isLiked
                    ? PostCss.likeBtnWrap + " fas fa-heart " + PostCss.heart_red
                    : PostCss.likeBtnWrap + " far fa-heart "
                }
                onClick={handelPostLike}
              ></i>
            </span>
            <span className={PostCss.commentBtnWrap}>
              <Link to={"/post/" + data.post.postId}>
                <ion-icon name="chatbubble-outline"></ion-icon>
              </Link>
            </span>
            <span className={PostCss.shareBtnWrap}>
              <ion-icon name="paper-plane-outline"></ion-icon>
            </span>
          </div>
          <div className={PostCss.rightSide}>
            <span className={PostCss.saveBtn} onClick={handelPostBookmark}>
              <ion-icon
                name={data.post.isBookmarked ? "bookmark" : "bookmark-outline"}
              ></ion-icon>
            </span>
          </div>
        </div>
        <div className={PostCss.likesCount}>
          <p>{data.post.likesCount} likes</p>
        </div>
        <div className={PostCss.viewAllComm}>
          <button onClick={() => history.push("/post/" + data.post.postId)}>
            View All {data.post.commentsCount} Comments
          </button>
        </div>
        <div className={PostCss.comments}>
          {data.topComments &&
            data.topComments.map((c, i) => (
              <Comment data={c} key={i} post={data} type="home" />
            ))}
        </div>
        <div className={PostCss.postDate}>
          <p>{moment(data.post.createdAt.seconds * 1000).fromNow()}</p>
        </div>
        <div className={PostCss.postComment}>
          {isCommentAdding && <LocalSpinner />}
          <div className={PostCss.inputComment}>
            <form
              action="/"
              method="post"
              className={PostCss.commentForm}
              onSubmit={handelFormSubmit}
            >
              <textarea
                name="comment"
                cols="30"
                rows="1"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              ></textarea>
              <button type="submit" disabled={comment.length === 0}>
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className="wrapPostSkeleton"
        style={{ display: isLoading ? "block" : "none" }}
      >
        <SkeletonPost />
      </div>
    </>
  );
}

export default view(Post);
