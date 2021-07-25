import { view } from '@risingstack/react-easy-state';
import React from 'react'
import PostModalCss from "../../css/modals/PostModal.module.css";
import { logout } from '../../utils/authHandler';
import modalStore from './../../stores/modalStore';

 function ProfileMainModal() {
    return (
        modalStore.userNamePageModal.display ? 
        <div className={PostModalCss.postModal}>
            <div className={PostModalCss.modal}>
                <button>Change password</button>
                <button onClick={()=> logout()}>Logout</button>
                <button onClick={()=> modalStore.userNamePageModal.display = false}>Cancel</button>
            </div>
        </div>
        :
        null
    )
}
export default view(ProfileMainModal);
// using same modal please use DRY :( next time i hate myself