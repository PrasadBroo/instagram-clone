import React from 'react'
import store from '../stores/store'
import { view } from '@risingstack/react-easy-state'
import { Redirect } from 'react-router-dom';
import Feed from '../components/auth/Feed';
 function UserFeed() {
    return (
        <div>
            {store.auth.user ? <Feed/>:<Redirect to='/'/>}
        </div>
    )
}
export default view(UserFeed)