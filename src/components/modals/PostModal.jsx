import React, { useState } from 'react'
import PostModalCss from "../../css/modals/PostModal.module.css";

export default function PostModal() {

    const [openModal,SetOpenModal] = useState(false);
    const [closeModal,SetCloseModal] = useState(false);

    return (
        openModal ? 
        <div className={PostModalCss.postModal}>
            <div className={PostModalCss.modal}>
                <button>Report</button>
                <button>Go to post</button>
                <button>Cancel</button>
            </div>
        </div>
        :
        null
    )
}
