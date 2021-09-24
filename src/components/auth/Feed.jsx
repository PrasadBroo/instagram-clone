import { view } from "@risingstack/react-easy-state";
import React from "react";
import Navbar from "./Navbar";
import FeedCss from "../../css/auth/Feed.module.css";
import FeedPost from "../subcomponents/FeedPost";

function Feed() {
  return (
    <div>
      <Navbar />
      <div className={FeedCss.mainWrap}>
        <div className={FeedCss.postsWrap}>
          <div className={FeedCss.left}>
            <FeedPost src="https://images.pexels.com/photos/5069795/pexels-photo-5069795.png?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            <FeedPost src="https://images.pexels.com/photos/8306606/pexels-photo-8306606.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          </div>
          <div className={FeedCss.right}>
            <FeedPost src="https://images.pexels.com/photos/8446149/pexels-photo-8446149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          </div>
        </div>
        <div className={FeedCss.threePosts}>
          <FeedPost src="https://images.pexels.com/photos/7049604/pexels-photo-7049604.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <FeedPost src="https://images.pexels.com/photos/5273091/pexels-photo-5273091.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <FeedPost src="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1024-80.jpg.webp" />
        </div>
      </div>
    </div>
  );
}
export default view(Feed);
