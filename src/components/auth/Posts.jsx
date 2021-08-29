import React, { useEffect } from 'react'
import Post from './Post'
import PostCss from '../../css/auth/Posts.module.css'
import { view } from '@risingstack/react-easy-state'
import mystore from './../../stores/store';
import { get_suggested_posts } from '../../utils/firebase_api';
import SkeletonPost from '../skeletons/SkeletonPost';

function Posts() {
    useEffect(()=>{
        const fetchDatails = async () => {
            const {data:suggestedPosts,err} = await get_suggested_posts();
            if (err ) {
              return alert(err.message);
            }
            mystore.currentUser.userSuggestedPosts = suggestedPosts;
          };
          fetchDatails();
    },[])
    return (
        <div className={PostCss.posts}>
            {mystore.currentUser.userSuggestedPosts && mystore.currentUser.userSuggestedPosts.map((e,i) => <Post data={e} key={i}/>)}
            {!mystore.currentUser.userSuggestedPosts && [0,1,2].map((e,i) => <SkeletonPost key={i}/>)}
            
        </div>
    )
}
export default view(Posts)