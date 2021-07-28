import { view } from "@risingstack/react-easy-state";
import React from "react";
import PostModalCss from "../../css/modals/PostModal.module.css";
import modalStore from "./../../stores/modalStore";

function PostModal() {
  return modalStore.postModal.display ? (
    <div className={PostModalCss.postModal}>
      <div className={PostModalCss.modal}>
        <button className={PostModalCss.reportbtn}>Report</button>
        <button>Go to post</button>
        <button onClick={() => (modalStore.postModal.display = false)}>
          Cancel
        </button>
      </div>
    </div>
  ) : null;
}

export default view(PostModal);
