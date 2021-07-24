import React, { useState } from 'react'
import PostModalCss from "../../css/modals/PostModal.module.css";

export default function PostModal() {
    // eslint-disable-next-line
    const [openModal,SetOpenModal] = useState(false);
    // eslint-disable-next-line
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
