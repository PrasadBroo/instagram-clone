import React from "react";
import ProfileCss from "../../css/auth/Profile.module.css";
import mystore from "../../stores/store";
import { view } from "@risingstack/react-easy-state";
import { Link } from "react-router-dom";
import UnfollowModal from "../modals/UnfollowModal";
import SuggestedUser from "./../subcomponents/SuggestedUser";
import SkeletonSuggUser from "../skeletons/SkeletonSuggUser";
import verifiedBadge from '../../media//verified-badge.png'
function Profile() {
  return (
    <div className={ProfileCss.profileWrapper}>
      <UnfollowModal />
      <div className={ProfileCss.profile}>
        <div className={ProfileCss.head}>
          <div className={ProfileCss.profileImg}>
            <img src={mystore.currentUser.profilePic} alt="img" />
          </div>
          <div className={ProfileCss.profileinfo}>
            <p className={ProfileCss.username}>
              <Link to={"/" + mystore.currentUser.username}>
                {mystore.currentUser.username}
              </Link>
              {(mystore.currentUser.isVerified ?? false) && <img src={verifiedBadge}alt="verifiedBadge" title="verified" className={ProfileCss.verifiedBadge}/>}
            </p>
            <p className={ProfileCss.fullName}>
              {mystore.currentUser.fullName}
            </p>
          </div>
        </div>
        <div className={ProfileCss.suggestions}>
          <p className={ProfileCss.suggepara}>Suggestions For You</p>
          <div className={ProfileCss.accountSuggestions}>
            {mystore.currentUser.userSuggetions &&
              mystore.currentUser.userSuggetions.map((e, i) => (
                <SuggestedUser user={e} key={i} />
              ))}
              {!mystore.currentUser.userSuggetions && [0,1,2,3,4].map(e => <SkeletonSuggUser key={e}/>)}
          </div>
        </div>
        <div className={ProfileCss.bottomLinks}>
          <a href="https://about.instagram.com/">About</a>
          <a href="https://about.instagram.com/">Help</a>
          <a href="https://about.instagram.com/">Press</a>
          <a href="https://about.instagram.com/">API</a>
          <a href="https://about.instagram.com/">Jobs</a>
          <a href="https://about.instagram.com/">Privacy</a>
          <a href="https://about.instagram.com/">Terms</a>
          <a href="https://about.instagram.com/">Locations</a>
          <a href="https://about.instagram.com/">Top Accounts</a>
          <a href="https://about.instagram.com/">Hashtag</a>
          <a href="https://about.instagram.com/">Language</a>
        </div>
        <p className={ProfileCss.creditInfo}>
          ?? Made By <i className="fas fa-heart" aria-hidden="true"></i> Prasad
          Shinde <b>/</b><a href="https://www.prasadbro.com/">prasadbro</a> 
        </p>
      </div>
    </div>
  );
}

export default view(Profile);
