import React from "react";
import FeedSkeltonCss from "../../css/skeletons/FeedSkeleton.module.css";
export default function FeedSkeleton() {
  return (
    <div className={FeedSkeltonCss.mainWrap}>
      <div className={FeedSkeltonCss.postsWrap}>
        <div className={FeedSkeltonCss.left}>
          <div className={FeedSkeltonCss.first}></div>
          <div className={FeedSkeltonCss.second}></div>
        </div>
        <div className={FeedSkeltonCss.right}>
          <div className={FeedSkeltonCss.first}></div>
        </div>
      </div>
      <div className={FeedSkeltonCss.threePosts}>
        <div className={FeedSkeltonCss.first}></div>
        <div className={FeedSkeltonCss.second}></div>
        <div className={FeedSkeltonCss.third}></div>
      </div>
      <div className={FeedSkeltonCss.postsWrapReverse}>
        <div className={FeedSkeltonCss.left}>
          <div className={FeedSkeltonCss.first}></div>
          <div className={FeedSkeltonCss.second}></div>
        </div>
        <div className={FeedSkeltonCss.right}>
          <div className={FeedSkeltonCss.first}></div>
        </div>
      </div>
    </div>
  );
}
