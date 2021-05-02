import { view } from '@risingstack/react-easy-state'
import React from 'react'
import MainBodyCss from '../../css/auth/MainBody.module.css'
import Stories from './Stories'
import Posts from './Posts'

function MainBody() {
    return (
        <div className={MainBodyCss.mainBody}>
            <div className={MainBodyCss.bodyWrap}>
                <Stories/>
                <Posts/>
            </div>
            
        </div>
    )
}

export default  view(MainBody)