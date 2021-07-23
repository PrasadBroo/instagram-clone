import React from 'react'
import DefaultLoaderCss from '../css/DefaultLoader.module.css'

export default function DefaultLoader() {
    return (
        <div className={DefaultLoaderCss.loader}>
            <ion-icon name="logo-instagram"></ion-icon>
        </div>
    )
}
