import React from 'react'
import UserPostCss from '../../css/subcomponents/UserPost.module.css'

export default function UserPost() {
    return (
        <div className={UserPostCss.wrap}>
            <a href="/fsdfd">
                <img src="https://placeimg.com/300/300/any" alt="user-post" />
            </a>
        </div>
    )
}
