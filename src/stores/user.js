import { store } from "@risingstack/react-easy-state";

const user = store(
    {
        user:{
            userPosts:false,
            userDetails:false,
        }
    }
);

export default user;