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
        suggestedUSer:null,
        showSuggUsers:false,
    },
    isAnythingLoading:{
        postDetailsLoading:true,
        currentUserLoading:true,
    }
});

export default mystore;