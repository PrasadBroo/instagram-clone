import { store } from "@risingstack/react-easy-state";

const modalStore = store(
    {
        userNamePageModal:{
            display:false,
        }
    }
);

export default modalStore;