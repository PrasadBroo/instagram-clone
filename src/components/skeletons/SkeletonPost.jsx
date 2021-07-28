import React from "react";
import PostCss from "../../css/auth/Post.module.css";
import SkeletonElement from "../skeletons/SkeletonElement";

export default function SkeletonPost() {

  return (
    <div className={PostCss.postWrapper}>
      <div className={PostCss.postHeading}>
        <div className={PostCss.postAuthor}>
          <a href="/prasad__bro">
            <SkeletonElement type="avatar" />
          </a>
          <div>
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
          </div>
        </div>
        <SkeletonElement type="text" />
      </div>
      <div className={PostCss.postMedia}>
        <SkeletonElement type="thumbnail" />
      </div>
      <div className="postBottomWrap">
        <SkeletonElement type="text" />
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
      </div>
    </div>
  );
}
