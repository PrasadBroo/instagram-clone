import { store } from "@risingstack/react-easy-state";

const modalStore = store(
    {
        userNamePageModal:{
            display:false,
        },
        postModal:{
            display:false,
            postid:null,
        },
        followModal:{
            display:false,
            type:'followers',
            followerslist:[],
            followingsList:[],
            isFollowInProgress:false,
            isUnfollowInProgress:false,
            user:null
        },
        unfollowModal:{
            display:false,
            toUnfollow:null
        },
        spinner:{
            show:true
        }
    }
);

export default modalStore;