import React from 'react'
import UserPostCss from '../../css/subcomponents/UserPost.module.css'

export default function UserPost({imageUrl,postid}) {
    return (
        <div className={UserPostCss.wrap}>
            <a href={`/post/${postid}`}>
                <img src={imageUrl} alt="user-post" />
            </a>
        </div>
    )
}
