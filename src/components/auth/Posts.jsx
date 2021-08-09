import React from 'react'
import Post from './Post'
import PostCss from '../../css/auth/Posts.module.css'
import { view } from '@risingstack/react-easy-state'

function Posts() {
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
export default view(Posts)