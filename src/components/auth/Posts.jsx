import React from 'react'
import Post from './Post'
import PostCss from '../../css/auth/Posts.module.css'

export default function Posts() {
    return (
        <div className={PostCss.posts}>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}
