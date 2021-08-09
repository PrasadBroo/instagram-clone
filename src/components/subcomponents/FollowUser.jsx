import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link } from "react-router-dom";
import FollowUserCss from "../../css/subcomponents/FollowUser.module.css";

function FollowUser({data}) {
  return (
    <div className={FollowUserCss.wrap}>
      <div className={FollowUserCss.pic}>
        <Link to={"/" + data.username}>
          <img src={data.profilePic} alt="user-pic" />
        </Link>
      </div>
      <div className={FollowUserCss.name}>
        <Link to={"/" + data.username}>{data.username}</Link>
        <p>{data.fullName}</p>
      </div>
      <div className={FollowUserCss.btn}>
        <button>Follow</button>
      </div>
    </div>
  );
}
export default view(FollowUser);
