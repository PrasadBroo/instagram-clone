import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link } from "react-router-dom";
import ProfileCss from "../../css/auth/Profile.module.css";
import SkeletonElement from "./SkeletonElement";

function SkeletonSuggUser({ user }) {
  return (
    <div className={ProfileCss.head}>
      <div className={ProfileCss.profileImg + " " + ProfileCss.suggeprofileImg}>
        <SkeletonElement type="avatar" />
      </div>
      <div className={ProfileCss.profileinfo}>
        <Link to={"/"}>
          <SkeletonElement type="title" />
        </Link>
        <div className={ProfileCss.fullName}>
          <SkeletonElement type="text" />
        </div>
      </div>
      <div className={ProfileCss.followBtnWrap}></div>
    </div>
  );
}
export default view(SkeletonSuggUser);
