import { view } from "@risingstack/react-easy-state";
import React from "react";
import SpinnerCss from "../../css/spinners/Spinner.module.css";
import modalStore from "../../stores/modalStore";

function Spinner() {
  return modalStore.spinner.show ? (
    <div className={SpinnerCss.loaderWrap}>
      <div className={SpinnerCss.loader}></div>
    </div>
  ) : null;
}
export default view(Spinner);
