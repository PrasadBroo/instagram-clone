import { view } from '@risingstack/react-easy-state';
import React from 'react'
import FollowModalCss from "../../css/modals/FollowModal.module.css";
import FollowUser from '../subcomponents/FollowUser';
import modalStore from './../../stores/modalStore';

function FollowModal() {
    return (
        modalStore.followModal.display ?
        <div className={FollowModalCss.followModal}>
            <div className={FollowModalCss.modal}>
                <div className={FollowModalCss.title}>
                {modalStore.followModal.type === 'followers' ?  <p>Followers</p> :  <p>Followings</p>}
                   
                    <button onClick={()=> modalStore.followModal.display =false}>X</button>
                </div>
                <div className={FollowModalCss.followList}>
                    <FollowUser/>
                    <FollowUser/>
                    <FollowUser/>
                </div>
            </div>
        </div>
        :
        null
    )
}

export default view(FollowModal);