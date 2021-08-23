import { view } from '@risingstack/react-easy-state';
import React from 'react'
import { useHistory } from 'react-router-dom';
import PostModalCss from "../../css/modals/PostModal.module.css";
import { logout } from '../../utils/authHandler';
import modalStore from './../../stores/modalStore';

 function ProfileMainModal() {
     const history = useHistory();

    return (
        modalStore.userNamePageModal.display ? 
        <div className={PostModalCss.postModal}>
            <div className={PostModalCss.modal}>
                <button onClick={()=>{history.push('/settings/changePassword');modalStore.userNamePageModal.display = false}}>Change password</button>
                <button onClick={()=> {logout();modalStore.userNamePageModal.display = false}}>Logout</button>
                <button onClick={()=> modalStore.userNamePageModal.display = false}>Cancel</button>
            </div>
        </div>
        :
        null
    )
}
export default view(ProfileMainModal);
// using same modal please use DRY :( next time i hate myself