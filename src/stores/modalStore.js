import { store } from "@risingstack/react-easy-state";

const modalStore = store(
    {
        userNamePageModal:{
            display:false,
        },
        postModal:{
            display:false,
        },
        followModal:{
            display:false,
            type:'followers'
        },
        unfollowModal:{
            display:false,
            toUnfollow:null
        }
    }
);

export default modalStore;