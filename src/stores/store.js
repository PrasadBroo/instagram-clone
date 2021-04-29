import { store } from "@risingstack/react-easy-state";

const mystore = store(
    {
        auth:{
            user:null,
            
        }
    }
);

export default mystore;