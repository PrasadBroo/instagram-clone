import React from 'react'
import FollowUserCss from '../../css/subcomponents/FollowUser.module.css'

export default function FollowUser() {
    return (
        <div className={FollowUserCss.wrap}>
            <div className={FollowUserCss.pic}>
                <a href="/prasadbro">
                <img src="https://placeimg.com/40/40/any" alt="user-pic" />
                </a>
                
            </div>
            <div className={FollowUserCss.name}>
                <a href="/prasadbro">prasadbro</a>
                <p>Prasad Shinde</p>
            </div>
            <div className={FollowUserCss.btn}>
                <button>Follow</button>
            </div>
        </div>
    )
}
