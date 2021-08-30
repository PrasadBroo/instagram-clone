import { view } from '@risingstack/react-easy-state'
import React from 'react'
import MainBodyCss from '../../css/auth/MainBody.module.css'
import Stories from './Stories'
import Posts from './Posts'
import Profile from './Profile'
import PostModal from '../modals/PostModal'
import SuggestUsers from './SuggestUsers'
import mystore from '../../stores/store'

function MainBody() {
    return (
        <div className={MainBodyCss.mainBody}>
            <div className={MainBodyCss.bodyWrap}>
                {!mystore.currentUser.showSuggUsers &&<> <Stories/>
                <Posts/>
                <Profile/>
                <PostModal/></>}
                {mystore.currentUser.showSuggUsers && <SuggestUsers/>}
            </div>
            
        </div>
    )
}

export default  view(MainBody)