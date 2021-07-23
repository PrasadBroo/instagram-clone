import React, { useState } from 'react'
import PostModalCss from "../../css/modals/PostModal.module.css";

export default function ProfileMainModal() {

    const [openModal,SetOpenModal] = useState(false);
    const [closeModal,SetCloseModal] = useState(false);

    return (
        openModal ? 
        <div className={PostModalCss.postModal}>
            <div className={PostModalCss.modal}>
                <button>Change password</button>
                <button>Logout</button>
                <button>Cancel</button>
            </div>
        </div>
        :
        null
    )
}

// using same modal please use DRY :( next time i hate myself