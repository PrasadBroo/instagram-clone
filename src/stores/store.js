import {
    store
} from "@risingstack/react-easy-state";
import defaultProfilePic from "../media/defaultProfilePic.jpg";
const mystore = store({
    auth: {
        user: false,
    },
    currentUser: {
        username: 'loading...',
        profilePic: defaultProfilePic,
        uid: null,
        postDetails:null,
        userSuggetions:null,
        userSuggestedPosts:null,
        followingSnapshots:null,
        suggestedUSer:null,
        showSuggUsers:false,
        feed_posts:null,
        feed_posts_snapshots:null,
        notifications:null,
    },
    showNotFound:false,
    isAnythingLoading:{
        postDetailsLoading:true,
        currentUserLoading:true,
    },
    alert:{
        show:false,
        message:null
    }
});

export default mystore;