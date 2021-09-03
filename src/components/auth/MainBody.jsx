import { view } from '@risingstack/react-easy-state'
import React, { useEffect } from 'react'
import MainBodyCss from '../../css/auth/MainBody.module.css'
import Stories from './Stories'
import Posts from './Posts'
import Profile from './Profile'
import PostModal from '../modals/PostModal'
import SuggestUsers from './SuggestUsers'
import mystore from '../../stores/store'
import useWindowSize from './../../customHooks/useWindowSize';
import modalStore from '../../stores/modalStore'
import { get_suggested_posts, get_user_suggetions } from '../../utils/firebase_api'
import Alert from '../Alert'

function MainBody() {
    useEffect(() => {
        const fetchDatails = async () => {
          const { data, err } = await get_user_suggetions();
          const {data:suggestedPosts,err:err2} = await get_suggested_posts();
          // setTimeout(async()=>{
          //   const {data:suggestedPostsMore,err:err3} = await load_more_suggested_posts(followingSnapshots.docs[followingSnapshots.docs.length -1]);
          // console.log(suggestedPostsMore)
          // suggestedPostsMore.forEach(e => mystore.currentUser.userSuggestedPosts.push(e))
          // },10000)
          
          if (err || err2) {
            return alert(err.message);
          }
          if(suggestedPosts.length === 0){
            mystore.currentUser.showSuggUsers = true;
          }
          modalStore.followModal.type = "followings";
          mystore.currentUser.userSuggetions = data;
          mystore.currentUser.userSuggestedPosts = suggestedPosts;
        };
        if(!mystore.currentUser.userSuggetions && !mystore.currentUser.userSuggestedPosts)fetchDatails();
        
      }, []);
    const {width} = useWindowSize();
    return (
        <div className={MainBodyCss.mainBody}>
            <div className={MainBodyCss.bodyWrap}>
                {!mystore.currentUser.showSuggUsers &&<> <Stories/>
                <Posts/>
                {width >1000 && <Profile/>}
                <PostModal/></>}
                {mystore.currentUser.showSuggUsers && <SuggestUsers/>}
                {mystore.alert.show && <Alert message={mystore.alert.message}/>}
            </div>
            
        </div>
    )
}

export default  view(MainBody)