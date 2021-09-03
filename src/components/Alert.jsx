import React from 'react'
import AlertCss from '../css/Alert.module.css'
export default function Alert({message}) {
    return (
        <div className={AlertCss.customAlert}>
            <p>{message}</p>
        </div>
    )
}
