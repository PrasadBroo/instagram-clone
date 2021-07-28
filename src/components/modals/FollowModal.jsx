import React from 'react'
import FollowModalCss from "../../css/modals/FollowModal.module.css";
import FollowUser from '../subcomponents/FollowUser';

export default function FollowModal() {
    return (
        <div className={FollowModalCss.followModal}>
            <div className={FollowModalCss.modal}>
                <div className={FollowModalCss.title}>
                    <p>Followers</p>
                    <button>X</button>
                </div>
                <div className={FollowModalCss.followList}>
                    <FollowUser/>
                    <FollowUser/>
                    <FollowUser/>
                </div>
            </div>
        </div>
    )
}
