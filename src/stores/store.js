import { store } from "@risingstack/react-easy-state";

const mystore = store(
    {
        auth:{
            user:false,
            
        },
        currentUser:{

        }
    }
);

export default mystore;