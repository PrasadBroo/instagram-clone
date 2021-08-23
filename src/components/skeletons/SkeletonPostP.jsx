import { view } from "@risingstack/react-easy-state";
import React from "react";
import PostPCss from "../../css/auth/PostP.module.css";
import SkeletonElement from './SkeletonElement';

function SkeletonPostP() {
  return (
    <div className={PostPCss.postWrapper}>
      <div className="leftSec">
        <div className={PostPCss.postMedia}>
          <SkeletonElement type="thumbnail"/>
        </div>
      </div>
      <div className={PostPCss.rightSec}>
        <div className="sub">
          <div className={PostPCss.postHeading}>
            <div className={PostPCss.postAuthor}>
              <a href="/prasad__bro">
                <SkeletonElement type="avatar"/>
              </a>
              <div>
              <SkeletonElement type="title"/>
              <SkeletonElement type="text"/>
              </div>
              
            </div>
            <div className={PostPCss.postOptions}>
            
            </div>
          </div>
          <div className={PostPCss.comments}>
          
          </div>
        </div>
        <div className="subsec">
          <div className={PostPCss.likeCS}>
            <div className={PostPCss.leftSide}>
              <span>
              <SkeletonElement type="avatar"/>
              </span>
              <span className={PostPCss.commentBtnWrap}>
                <a href="/post/afsafasfas">
                <SkeletonElement type="avatar"/>
                </a>
                
              </span>
              <span className={PostPCss.shareBtnWrap}>
              <SkeletonElement type="avatar"/>
              </span>
            </div>
            <div className={PostPCss.rightSide}>
              <span className={PostPCss.saveBtn}>
              
              </span>
            </div>
          </div>
          <div className={PostPCss.likesCount}>
          </div>
          <div className={PostPCss.postComment}>
            <div className={PostPCss.inputComment}>
              <form action="/" method="post" className={PostPCss.commentForm}>
              <SkeletonElement type="title"/>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default view(SkeletonPostP)