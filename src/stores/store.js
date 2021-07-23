import { store } from "@risingstack/react-easy-state";

const mystore = store(
    {
        auth:{
            user:false,
            
        }
    }
);

export default mystore;